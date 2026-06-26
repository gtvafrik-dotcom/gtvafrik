'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PenTool, Newspaper, Eye, Trash2, Search } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  categories?: { category: { name: string } }[];
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const router = useRouter();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles');
      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles);
      } else {
        setError('Failed to fetch articles');
      }
    } catch (err) {
      setError('An error occurred while fetching articles');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this article? This action cannot be undone.')) return;
    try {
      const response = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setArticles(articles.filter(article => article.id !== id));
      } else {
        setError('Failed to delete article');
      }
    } catch (err) {
      setError('An error occurred while deleting the article');
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setArticles(articles.map(article => 
          article.id === id ? { ...article, status: newStatus } : article
        ));
      }
    } catch (err) {
      setError('An error occurred while updating the article');
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (article.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || article.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  const statusColors: Record<string, string> = {
    published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    draft: 'bg-amber-50 text-amber-700 border-amber-200',
    archived: 'bg-gray-100 text-gray-600 border-gray-200',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#111C44] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray-400 font-medium">Loading articles...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-400 font-medium">{articles.length} total article{articles.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111C44] text-white rounded-xl text-sm font-bold hover:bg-[#1a2a5e] transition-all shadow-lg shadow-[#111C44]/20"
        >
          <PenTool className="w-4 h-4" />
          Write New Story
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-[#F4F7FE] border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#111C44]/20 placeholder-gray-400"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'published', 'draft', 'archived'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                filterStatus === status
                  ? 'bg-[#111C44] text-white shadow-md'
                  : 'bg-[#F4F7FE] text-gray-500 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-16 px-6 flex flex-col items-center">
          <Newspaper className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-bold text-[#2B3674] mb-2">No stories found</h3>
          <p className="text-gray-400 mb-6 text-sm max-w-md mx-auto">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters to find what you\'re looking for.' 
              : 'Your newsroom is empty. Start creating content that moves the world.'}
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <Link href="/admin/articles/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111C44] text-white rounded-xl text-sm font-bold hover:bg-[#1a2a5e] transition-all shadow-lg shadow-[#111C44]/20">
              <PenTool className="w-4 h-4 mr-1" /> Write your first story
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col md:flex-row md:items-center gap-5 hover:shadow-md transition-all group">
              {/* Thumbnail */}
              <div className="w-full md:w-36 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                {article.thumbnail ? (
                  <img src={article.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#111C44] to-[#2B3674] flex items-center justify-center">
                    <Newspaper className="w-8 h-8 text-white opacity-40" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 mb-2">
                  <h3 className="font-bold text-[#2B3674] text-base leading-snug line-clamp-1 flex-1 group-hover:text-brand-vibrant-blue transition-colors">
                    {article.title}
                  </h3>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0 ${statusColors[article.status] || statusColors.draft}`}>
                    {article.status}
                  </span>
                </div>
                {article.excerpt && (
                  <p className="text-sm text-gray-400 line-clamp-1 mb-3">{article.excerpt}</p>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>{formatDate(article.createdAt)}</span>
                  {article.categories && article.categories.length > 0 && (
                    <div className="flex gap-1.5">
                      {article.categories.slice(0, 2).map((c: any, i: number) => (
                        <span key={i} className="bg-[#F4F7FE] text-[#2B3674] px-2 py-0.5 rounded-md font-medium">{c.category.name}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {/* ADDED EDIT BUTTON HERE */}
                <Link
                  href={`/admin/articles/${article.id}/edit`}
                  className="p-2.5 rounded-xl text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-center"
                  title="Edit"
                >
                  <PenTool className="w-4 h-4" />
                </Link>
                <Link
                  href={`/blog/${article.slug}`}
                  target="_blank"
                  className="p-2.5 rounded-xl text-gray-400 hover:bg-[#F4F7FE] hover:text-[#2B3674] transition-all flex items-center justify-center"
                  title="View"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <select
                  value={article.status}
                  onChange={(e) => handleStatusChange(article.id, e.target.value)}
                  className="text-xs bg-[#F4F7FE] border-none rounded-xl px-3 py-2 text-[#2B3674] font-bold cursor-pointer focus:ring-0"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="p-2.5 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}