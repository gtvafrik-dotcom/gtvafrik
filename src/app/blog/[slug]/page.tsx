import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaBanner from "@/components/CtaBanner";
import Link from "next/link";
import prisma from "../../../../lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

// --- ADDED: Dynamic Metadata for WhatsApp/Social Sharing ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) {
    return { title: 'Article Not Found' };
  }

  // Fallback image just in case an article is published without a thumbnail
  const fallbackImage = 'https://gtvafrik.com/impact.jpg'; 

  return {
    title: article.title,
    description: article.excerpt || "Read this article on GTV Afrik",
    openGraph: {
      title: article.title,
      description: article.excerpt || "Read this article on GTV Afrik",
      url: `https://gtvafrik.com/blog/${article.slug}`,
      siteName: 'GTV Afrik',
      images: [
        {
          url: article.thumbnail || fallbackImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: 'article',
      publishedTime: article.publishedAt ? article.publishedAt.toISOString() : article.createdAt.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || "Read this article on GTV Afrik",
      images: [article.thumbnail || fallbackImage],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { author: true, categories: { include: { category: true } } }
  });

  if (!article) {
    notFound();
  }

  const formatDate = (dateString: Date | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Build the exact WhatsApp share text format
  const shareText = encodeURIComponent(`${article.title} ☛ https://gtvafrik.com/blog/${article.slug}`);
  const whatsappShareUrl = `https://wa.me/?text=${shareText}`;

  return (
    <div className="min-h-screen bg-white font-gudlak overflow-x-hidden selection:bg-brand-yellow selection:text-brand-dark-navy">
      <Navbar activePage="Blog" />

      {/* --- ARTICLE HEADER --- */}
      <section className="px-6 md:px-16 pt-10 pb-8 md:pb-12">
        <div className="text-[9px] uppercase tracking-[0.25em] text-gray-500 mb-6 font-prompt font-bold">
          <Link href="/blog" className="hover:text-brand-vibrant-blue transition-colors">
            Blog
          </Link>
          <span className="mx-2">›</span>
          <span className="text-brand-yellow">{article.categories[0]?.category.name || 'Article'}</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-dark-navy mb-6 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between text-gray-500 text-sm mb-8">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              {article.author?.name && (
                <span className="font-medium">By {article.author.name}</span>
              )}
              <span>•</span>
              <span>{formatDate(article.publishedAt || article.createdAt)}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-brand-yellow text-brand-dark-navy text-xs font-bold uppercase rounded-full">
                {article.status}
              </span>
            </div>
          </div>

          {article.thumbnail && (
            <div className="w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-md">
              <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}

          {article.excerpt && (
            <div className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-8 border-l-4 border-brand-yellow pl-6">
              {/* If you switch Excerpt to rich text in the admin, this will need dangerouslySetInnerHTML eventually */}
              {article.excerpt}
            </div>
          )}
        </div>
      </section>

      {/* --- ARTICLE CONTENT --- */}
      <section className="px-6 md:px-16 pb-16">
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed space-y-6 [&>img]:rounded-xl [&>img]:shadow-md [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-brand-dark-navy [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-brand-dark-navy [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-brand-dark-navy [&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6 [&>a]:text-brand-vibrant-blue [&>a]:underline"
            dangerouslySetInnerHTML={{ __html: article.content || '' }}
          />
        </div>
      </section>

      {/* --- ARTICLE FOOTER --- */}
      <section className="px-6 md:px-16 py-12 bg-[#F8F9FF]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-brand-dark-navy mb-2">Share this article</h3>
              <p className="text-gray-600 text-sm">Help spread the word about this story</p>
            </div>
            <div className="flex gap-3">
              <button className="w-10 h-10 bg-brand-vibrant-blue text-white rounded-full flex items-center justify-center hover:bg-brand-dark-navy transition-colors">
                <span className="text-sm">📧</span>
              </button>
              <button className="w-10 h-10 bg-brand-vibrant-blue text-white rounded-full flex items-center justify-center hover:bg-brand-dark-navy transition-colors">
                <span className="text-sm">🔗</span>
              </button>
              {/* WhatsApp Share Link */}
              <a 
                href={whatsappShareUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:bg-brand-dark-navy transition-colors"
                title="Share on WhatsApp"
              >
                <span className="text-sm">📱</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </div>
  );
}
