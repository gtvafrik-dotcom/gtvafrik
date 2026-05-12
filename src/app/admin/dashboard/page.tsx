import prisma from "../../../../lib/prisma";
import Link from 'next/link';
import { FileText, Globe, Clock, Newspaper, PenTool, LayoutList } from 'lucide-react';

export default async function Dashboard() {
  // Fetch data
  const totalArticles = await prisma.article.count();
  const publishedArticles = await prisma.article.count({ where: { status: 'published' } });
  const draftArticles = await prisma.article.count({ where: { status: 'draft' } });
  const totalCategories = await prisma.category.count();
  
  const recentArticles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { author: true, categories: { include: { category: true } } }
  });

  return (
    <div className="space-y-6 text-[#2B3674]">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Welcome Banner */}
        <div className="lg:col-span-2 bg-brand-yellow rounded-[20px] p-8 flex flex-col justify-between relative overflow-hidden min-h-[200px] shadow-sm">
          <div className="relative z-10 max-w-[65%]">
            <h1 className="text-3xl font-bold text-[#111C44] mb-4 font-gudlak tracking-wider">Hello Admin!</h1>
            <p className="text-[#111C44]/80 text-sm mb-6 leading-relaxed">
              Welcome back to your central hub for creating, managing, and distributing stories that shape the African narrative.
            </p>
            <Link 
              href="/admin/articles/new"
              className="inline-flex items-center px-6 py-2.5 bg-[#111C44] text-white text-sm font-bold rounded-xl shadow-lg hover:bg-opacity-90 transition-all"
            >
              <PenTool className="w-4 h-4 mr-2" /> Write new post
            </Link>
          </div>
          {/* Decorative shapes */}
          <div className="absolute right-0 bottom-0 top-0 w-[35%] flex items-center justify-center">
            <div className="absolute inset-0 bg-[#111C44] mix-blend-overlay opacity-5 rounded-full blur-3xl -right-10 -bottom-10 w-64 h-64"></div>
            <Newspaper className="w-24 h-24 text-[#111C44] opacity-30" />
          </div>
        </div>

        {/* Stats Column */}
        <div className="space-y-4 flex flex-col justify-between h-full">
          <div className="bg-[#E2F5F8] rounded-[20px] p-5 flex items-center justify-between shadow-sm">
            <div className="w-12 h-12 bg-[#111C44] rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <h3 className="text-2xl font-bold text-[#111C44]">{totalArticles}</h3>
              <p className="text-sm font-medium text-[#111C44]/60">Total articles</p>
            </div>
          </div>
          
          <div className="bg-[#E4E4FB] rounded-[20px] p-5 flex items-center justify-between shadow-sm">
            <div className="w-12 h-12 bg-[#111C44] rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <h3 className="text-2xl font-bold text-[#111C44]">{publishedArticles}</h3>
              <p className="text-sm font-medium text-[#111C44]/60">Published</p>
            </div>
          </div>

          <div className="bg-[#FFF3CD] rounded-[20px] p-5 flex items-center justify-between shadow-sm">
            <div className="w-12 h-12 bg-[#111C44] rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <h3 className="text-2xl font-bold text-[#111C44]">{draftArticles < 10 ? `0${draftArticles}` : draftArticles}</h3>
              <p className="text-sm font-medium text-[#111C44]/60">Drafts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Articles List */}
        <div className="lg:col-span-2 bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#2B3674]">Recent articles</h2>
            <Link href="/admin/articles" className="text-sm text-brand-vibrant-blue font-bold hover:underline">
              View all →
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentArticles.length > 0 ? recentArticles.map((article, idx) => (
              <Link href={`/admin/articles/${article.id}/edit`} key={article.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-gray-400 font-medium w-6">0{idx + 1}</span>
                  <div className="w-12 h-12 rounded-xl bg-gray-200 overflow-hidden shrink-0">
                    {article.thumbnail ? (
                      <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-brand-vibrant-blue"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#2B3674] text-sm md:text-base line-clamp-1 group-hover:text-brand-vibrant-blue transition-colors">{article.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-xs text-gray-400">{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      {article.categories.length > 0 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{article.categories[0].category.name}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-3 ml-4">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    article.status === 'published' 
                      ? 'bg-green-100 text-green-700' 
                      : article.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {article.status}
                  </span>
                </div>
              </Link>
            )) : (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">📰</div>
                <p className="text-gray-500 text-sm mb-4">No articles yet. Start sharing your stories!</p>
                <Link href="/admin/articles/new" className="inline-block px-5 py-2 bg-brand-vibrant-blue text-white text-sm font-bold rounded-xl hover:bg-brand-dark-navy transition-colors">
                  Write your first post
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats & Categories */}
        <div className="space-y-6">
          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-[#2B3674] mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/admin/articles/new" className="flex items-center gap-3 p-3 bg-[#F4F7FE] rounded-xl hover:bg-[#E8EDFB] transition-colors group">
                <PenTool className="w-5 h-5 text-[#2B3674]" />
                <span className="text-sm font-bold text-[#2B3674] group-hover:text-brand-vibrant-blue">Write New Post</span>
              </Link>
              <Link href="/admin/articles" className="flex items-center gap-3 p-3 bg-[#F4F7FE] rounded-xl hover:bg-[#E8EDFB] transition-colors group">
                <LayoutList className="w-5 h-5 text-[#2B3674]" />
                <span className="text-sm font-bold text-[#2B3674] group-hover:text-brand-vibrant-blue">Manage Articles</span>
              </Link>
            </div>
          </div>

          <div className="bg-[#FFF8E7] rounded-[20px] p-6 shadow-sm border border-brand-yellow/30">
            <h2 className="text-lg font-bold text-[#2B3674] mb-4">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {["Breaking News", "Entertainment", "GTV Content", "Headlines", "Health", "International", "Politics", "Sports"].map(cat => (
                <span key={cat} className="text-xs bg-white/80 text-[#2B3674] px-3 py-1.5 rounded-full font-medium border border-brand-yellow/20">
                  {cat}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">{totalCategories} total categories</p>
          </div>
        </div>
      </div>
    </div>
  );
}
