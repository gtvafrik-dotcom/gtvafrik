'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TiptapEditor from '@/components/TiptapEditor';
import { ArrowLeft, Send, Save, Image as ImageIcon, Tags, Camera } from 'lucide-react';

export default function NewArticle() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<{fixed: string[], custom: string[]}>({ fixed: [], custom: [] });
  const [newCategory, setNewCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        // Extract just the string names from the database objects
        const fetchedNames = data.categories ? data.categories.map((c: any) => c.name) : [];
        
        setAvailableCategories({
          fixed: ['News', 'Politics', 'Business', 'Sports', 'Entertainment', 'Tech'], // Your default tags
          custom: fetchedNames.filter((name: string) => 
            !['News', 'Politics', 'Business', 'Sports', 'Entertainment', 'Tech'].includes(name)
          )
        });
      })
      .catch(err => console.error(err));
  }, []);

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.secure_url) setThumbnail(data.secure_url);
    } catch (error) {
      console.error('Failed to upload thumbnail', error);
    } finally {
      setIsUploading(false);
    }
  };

  const toggleCategory = (cat: string) => {
    setCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  // UPDATED: Now sends the new category to the database via your POST endpoint
  const handleAddCustomCategory = async () => {
    const catName = newCategory.trim();
    
    if (catName && !categories.includes(catName)) {
      // 1. Instantly select it for the current article
      setCategories(prev => [...prev, catName]);
      
      // 2. Clear the input box
      setNewCategory('');

      // 3. Check if it already exists in the database lists
      const existsGlobally = availableCategories.fixed.includes(catName) || availableCategories.custom.includes(catName);
      
      // 4. If it's truly new, save it to the database
      if (!existsGlobally) {
        try {
          const res = await fetch('/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: catName }),
          });
          
          if (res.ok) {
            // Add it to the purple "Custom" tags list on the screen so it is permanently visible
            setAvailableCategories(prev => ({
              ...prev,
              custom: [...prev.custom, catName]
            }));
          } else {
            console.error("Failed to save new category to database");
          }
        } catch (error) {
          console.error("Error creating category:", error);
        }
      }
    }
  };

  const handleSubmit = async (status: 'published' | 'draft') => {
    if (!title) return alert('Title is required');
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, excerpt, thumbnail, categories, status }),
      });
      if (res.ok) {
        router.push('/admin/articles');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to create article');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <button onClick={() => router.back()} className="text-sm text-gray-400 hover:text-[#2B3674] transition-colors mb-2 flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-2xl font-bold text-[#2B3674]">Create New Story</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 hidden md:block">{wordCount} words</span>
          <button 
            onClick={() => handleSubmit('draft')}
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-white border border-gray-200 text-[#2B3674] rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm disabled:opacity-50 flex items-center justify-center"
          >
            <Save className="w-4 h-4 mr-2" /> Save Draft
          </button>
          <button 
            onClick={() => handleSubmit('published')}
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-[#111C44] text-white rounded-xl text-sm font-bold hover:bg-[#1a2a5e] transition-all shadow-lg shadow-[#111C44]/20 disabled:opacity-50 flex items-center justify-center"
          >
            {isSubmitting ? 'Publishing...' : <><Send className="w-4 h-4 mr-2" /> Publish</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Editor Area */}
        <div className="lg:col-span-8 space-y-6">

          {/* Thumbnail Upload */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {thumbnail ? (
              <div className="relative group">
                <img src={thumbnail} alt="Thumbnail" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <label className="cursor-pointer px-4 py-2 bg-white text-[#2B3674] rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors">
                    Change
                    <input type="file" className="hidden" accept="image/*" onChange={handleThumbnailUpload} />
                  </label>
                  <button 
                    onClick={() => setThumbnail('')}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-bold hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-48 cursor-pointer hover:bg-gray-50 transition-colors border-2 border-dashed border-gray-200 rounded-2xl m-4">
                <ImageIcon className="w-10 h-10 text-gray-300 mb-3" />
                <span className="text-sm font-bold text-[#2B3674]">
                  {isUploading ? 'Uploading...' : 'Click to upload cover image'}
                </span>
                <span className="text-xs text-gray-400 mt-1">JPG, PNG or WebP. Recommended 1200×630px</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleThumbnailUpload} disabled={isUploading} />
              </label>
            )}
          </div>

          {/* Title */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <input
              type="text"
              placeholder="Your story title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-3xl font-bold text-[#2B3674] placeholder-gray-300 border-none focus:ring-0 focus:outline-none p-0 bg-transparent"
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Summary / Excerpt</label>
            <textarea
              placeholder="A compelling summary that will appear in previews and search results..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full text-[#2B3674] text-sm border-none focus:ring-0 focus:outline-none resize-none p-0 bg-transparent placeholder-gray-300 leading-relaxed"
            />
          </div>

          {/* Editor */}
          <div>
            <TiptapEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">

          {/* Status Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-[#2B3674] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Status
            </h3>
            <div className="bg-[#F4F7FE] rounded-xl p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Visibility</span>
                <span className="font-bold text-[#2B3674]">Public</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-3">
                <span className="text-gray-500">Words</span>
                <span className="font-bold text-[#2B3674]">{wordCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-3">
                <span className="text-gray-500">Reading time</span>
                <span className="font-bold text-[#2B3674]">{Math.max(1, Math.ceil(wordCount / 200))} min</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-[#2B3674] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Tags className="w-4 h-4 text-[#2B3674]" /> Categories
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {availableCategories.fixed.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    categories.includes(cat) 
                      ? 'bg-[#111C44] text-white shadow-md shadow-[#111C44]/20' 
                      : 'bg-[#F4F7FE] text-[#2B3674] hover:bg-[#E8EDFB]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Custom categories */}
            {availableCategories.custom.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-400 font-medium mb-2">Custom</p>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.custom.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        categories.includes(cat) 
                          ? 'bg-purple-600 text-white shadow-md' 
                          : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected custom tags */}
            {categories.filter(c => !availableCategories.fixed.includes(c) && !availableCategories.custom.includes(c)).length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-400 font-medium mb-2">New tags</p>
                <div className="flex flex-wrap gap-2">
                  {categories.filter(c => !availableCategories.fixed.includes(c) && !availableCategories.custom.includes(c)).map(cat => (
                    <button key={cat} type="button" onClick={() => toggleCategory(cat)} className="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all">
                      {cat} ×
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex mt-3">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomCategory())}
                className="flex-1 min-w-0 px-3 py-2 rounded-l-xl border border-gray-200 text-sm focus:ring-[#111C44] focus:border-[#111C44] bg-[#F4F7FE] placeholder-gray-400"
                placeholder="Add custom tag..."
              />
              <button
                type="button"
                onClick={handleAddCustomCategory}
                className="px-4 py-2 bg-[#111C44] text-white rounded-r-xl text-sm font-bold hover:bg-[#1a2a5e] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Thumbnail Preview */}
          {thumbnail && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-[#2B3674] uppercase tracking-wider mb-4 flex items-center gap-2"><Camera className="w-4 h-4 text-[#2B3674]" /> Thumbnail Preview</h3>
              <div className="rounded-xl overflow-hidden shadow-sm">
                <img src={thumbnail} alt="Thumbnail" className="w-full aspect-video object-cover" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
