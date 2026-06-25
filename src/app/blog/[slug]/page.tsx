import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaBanner from "@/components/CtaBanner";
import Link from "next/link";
import prisma from '../../../../../lib/prisma';
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
    description: article.excerpt || "Read this article on GTVAFRIK",
    openGraph: {
      title: article.title,
      description: article.excerpt || "Read this article on GTVAFRIK",
      url: `https://gtvafrik.com/blog/${article.slug}`,
      siteName: 'GTVAFRIK', // <-- This fixes the WhatsApp Preview text!
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
      description: article.excerpt || "Read this article on GTVAFRIK",
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

  // Build the exact Share Links
  const articleUrl = `https://gtvafrik.com/blog/${article.slug}`;
  const shareText = encodeURIComponent(`${article.title} ☛ ${articleUrl}`);
  
  const whatsappShareUrl = `https://wa.me/?text=${shareText}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;

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
            
            <div className="flex gap-4">
              {/* Facebook Share Link */}
              <a 
                href={facebookShareUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 bg-[#1877F2] text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm"
                title="Share on Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>

              {/* Instagram App Link */}
              <a 
                href="https://instagram.com"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm"
                title="Open Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.822a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" clipRule="evenodd" />
                </svg>
              </a>

              {/* WhatsApp Share Link */}
              <a 
                href={whatsappShareUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm"
                title="Share on WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.004 20.088c-1.503 0-2.93-.4-4.195-1.157l-4.664 1.22 1.24-4.542a9.923 9.923 0 0 1-1.309-4.945C3.076 5.253 7.086 1.25 12.004 1.25c4.919 0 8.93 3.999 8.93 8.914 0 4.916-4.011 8.924-8.93 8.924Zm-4.93-3.666c1.17.694 2.527 1.057 3.93 1.057 4.193 0 7.604-3.41 7.604-7.605 0-4.195-3.411-7.604-7.604-7.604-4.194 0-7.605 3.41-7.605 7.604 0 1.488.423 2.915 1.218 4.11l-1.042 3.82 3.899-1.032Zm5.783-6.276c-.238-.636-.492-.647-.714-.658-.182-.009-.392-.01-.602-.01-.21 0-.553.078-.842.392-.289.314-1.103 1.07-1.103 2.613 0 1.543 1.128 3.033 1.285 3.242.158.21 2.213 3.364 5.357 4.717 1.956.84 2.668.784 3.16.657.575-.15 1.838-.75 2.096-1.478.258-.727.258-1.353.18-1.478-.078-.126-.288-.204-.602-.361-.314-.157-1.839-.908-2.124-1.012-.284-.105-.492-.157-.698.157-.206.314-.813 1.012-.996 1.222-.183.21-.366.236-.68.079-.314-.157-1.314-.483-2.502-1.543-.924-.824-1.548-1.843-1.728-2.157-.18-.314-.02-.483.137-.64.14-.14.314-.365.47-.548.157-.183.21-.314.314-.523.105-.21.053-.393-.026-.549-.079-.158-.714-1.72-1.002-2.355Z" clipRule="evenodd" />
                </svg>
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