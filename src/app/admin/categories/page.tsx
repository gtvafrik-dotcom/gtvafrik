'use client';

import { useState, useEffect, useRef } from 'react';
import { Tags, Plus, Pencil, Trash2, Check, X, FileText, Search, AlertCircle } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  _count: { articles: number };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Create state
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');

  // Edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editError, setEditError] = useState('');
  const [saving, setSaving] = useState(false);

  // Delete state
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const newInputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchCategories(); }, []);
  useEffect(() => { if (editingId && editInputRef.current) editInputRef.current.focus(); }, [editingId]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    setCreateError('');
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setCreateError(data.error); return; }
      setCategories(prev => [data.category, ...prev]);
      setNewName('');
      newInputRef.current?.focus();
    } catch {
      setCreateError('Something went wrong. Try again.');
    } finally {
      setCreating(false);
    }
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditError('');
    setDeleteConfirmId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditError('');
  };

  const handleSaveEdit = async (id: number) => {
    if (!editName.trim()) return;
    setSaving(true);
    setEditError('');
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setEditError(data.error); setSaving(false); return; }
      setCategories(prev => prev.map(c => c.id === id ? data.category : c));
      setEditingId(null);
    } catch {
      setEditError('Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      setCategories(prev => prev.filter(c => c.id !== id));
      setDeleteConfirmId(null);
    } catch {
      // silent
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalArticles = categories.reduce((sum, c) => sum + c._count.articles, 0);

  return (
    <div className="space-y-6 text-[#2B3674]">

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#E2F5F8] rounded-[20px] p-5 flex items-center justify-between shadow-sm">
          <div className="w-11 h-11 bg-[#111C44] rounded-full flex items-center justify-center">
            <Tags className="w-5 h-5 text-white" />
          </div>
          <div className="text-right">
            <h3 className="text-2xl font-bold text-[#111C44]">{categories.length}</h3>
            <p className="text-xs font-medium text-[#111C44]/60">Total categories</p>
          </div>
        </div>
        <div className="bg-[#E4E4FB] rounded-[20px] p-5 flex items-center justify-between shadow-sm">
          <div className="w-11 h-11 bg-[#111C44] rounded-full flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div className="text-right">
            <h3 className="text-2xl font-bold text-[#111C44]">{totalArticles}</h3>
            <p className="text-xs font-medium text-[#111C44]/60">Tagged articles</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Create new category */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 h-fit">
          <h2 className="text-lg font-bold text-[#2B3674] mb-1">New category</h2>
          <p className="text-xs text-gray-400 mb-5">A slug is auto-generated from the name.</p>

          <div className="space-y-3">
            <input
              ref={newInputRef}
              type="text"
              value={newName}
              onChange={e => { setNewName(e.target.value); setCreateError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleCreate()}
              placeholder="e.g. Tech & Innovation"
              className="w-full px-4 py-3 bg-[#F4F7FE] rounded-xl text-sm text-[#2B3674] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 border-none"
            />
            {newName && (
              <p className="text-xs text-gray-400 px-1">
                Slug: <span className="font-mono text-[#2B3674]">{newName.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')}</span>
              </p>
            )}
            {createError && (
              <div className="flex items-center gap-2 text-red-500 text-xs bg-red-50 p-3 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" /> {createError}
              </div>
            )}
            <button
              onClick={handleCreate}
              disabled={!newName.trim() || creating}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#111C44] text-white text-sm font-bold rounded-xl hover:bg-opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              {creating ? 'Adding...' : 'Add category'}
            </button>
          </div>
        </div>

        {/* Categories list */}
        <div className="lg:col-span-2 bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-[#2B3674]">All categories</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="pl-9 pr-4 py-2 bg-[#F4F7FE] rounded-full text-sm text-[#2B3674] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 w-44"
              />
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <Tags className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">
                {search ? `No categories matching "${search}"` : 'No categories yet. Add one to get started.'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map(cat => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group"
                >
                  {editingId === cat.id ? (
                    /* Edit mode */
                    <div className="flex-1 flex items-center gap-3 mr-3">
                      <div className="flex-1">
                        <input
                          ref={editInputRef}
                          value={editName}
                          onChange={e => { setEditName(e.target.value); setEditError(''); }}
                          onKeyDown={e => { if (e.key === 'Enter') handleSaveEdit(cat.id); if (e.key === 'Escape') cancelEdit(); }}
                          className="w-full px-3 py-2 bg-[#F4F7FE] rounded-lg text-sm text-[#2B3674] focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        {editError && <p className="text-red-500 text-xs mt-1 px-1">{editError}</p>}
                      </div>
                      <button
                        onClick={() => handleSaveEdit(cat.id)}
                        disabled={saving}
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                        title="Save"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200 transition-colors"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-9 h-9 bg-[#F4F7FE] rounded-xl flex items-center justify-center shrink-0">
                          <Tags className="w-4 h-4 text-[#2B3674]" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-[#2B3674] truncate">{cat.name}</p>
                          <p className="text-xs text-gray-400 font-mono">{cat.slug}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 ml-3">
                        <span className="text-xs bg-[#E4E4FB] text-[#2B3674] px-2.5 py-1 rounded-full font-medium shrink-0">
                          {cat._count.articles} {cat._count.articles === 1 ? 'article' : 'articles'}
                        </span>

                        {deleteConfirmId === cat.id ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-red-500 font-medium hidden sm:block">Delete?</span>
                            <button
                              onClick={() => handleDelete(cat.id)}
                              disabled={deletingId === cat.id}
                              className="p-1.5 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-colors"
                              title="Confirm delete"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="p-1.5 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200 transition-colors"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => startEdit(cat)}
                              className="p-1.5 text-gray-400 hover:text-[#2B3674] hover:bg-gray-100 rounded-lg transition-colors"
                              title="Rename"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(cat.id)}
                              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}