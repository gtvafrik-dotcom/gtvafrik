import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaBanner from "@/components/CtaBanner";
import Link from "next/link";
import prisma from "../../../lib/prisma";

export const dynamic = 'force-dynamic';

const SectionHeader = ({ title, light = false, viewAll = true }: { title: string; light?: boolean; viewAll?: boolean }) => (
    <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
            <div className="w-[3px] h-4 bg-brand-yellow"></div>
            <h2 className={`font-bold uppercase tracking-[0.15em] text-[10px] md:text-[11px] ${light ? 'text-white' : 'text-brand-dark-navy'}`}>{title}</h2>
        </div>
        {viewAll && (
            <Link href="#" className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${light ? 'text-brand-yellow' : 'text-brand-vibrant-blue'}`}>
                View all <span className="text-lg leading-none">→</span>
            </Link>
        )}
    </div>
);

const PlayButton = ({ small = false }: { small?: boolean }) => (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className={`${small ? 'w-10 h-10' : 'w-12 h-12'} bg-brand-yellow rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer`}>
            <div className={`w-0 h-0 border-t-[7px] border-t-transparent border-l-[13px] border-l-brand-dark-navy border-b-[7px] border-b-transparent ml-1`}></div>
        </div>
    </div>
);

const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return null;
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
    }).format(new Date(date));
};

const EmptyState = ({ message, light = false }: { message: string; light?: boolean }) => (
    <p className={`font-prompt text-sm py-8 ${light ? 'text-white/30' : 'text-gray-400'}`}>{message}</p>
);

// Reusable Uniform Card Component
const ArticleCard = ({ article, defaultTag, isBreaking = false, isVideo = false }: { article: any, defaultTag: string, isBreaking?: boolean, isVideo?: boolean }) => {
    const tag = article.categories?.[0]?.category.name || defaultTag;
    return (
        <Link href={`/blog/${article.slug}`} className="relative rounded-2xl overflow-hidden shadow-lg group block aspect-[4/5] md:aspect-auto md:h-[420px] w-full">
            {article.thumbnail ? (
                <img src={article.thumbnail} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={article.title} />
            ) : (
                <div className="absolute inset-0 w-full h-full bg-brand-vibrant-blue group-hover:scale-105 transition-transform duration-700"></div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1530]/95 via-[#0B1530]/30 to-transparent z-0 transition-opacity group-hover:opacity-90"></div>
            
            <div className={`absolute top-4 left-4 ${isBreaking ? 'bg-[#D42027] text-white' : 'bg-brand-yellow text-brand-dark-navy'} px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest z-10`}>
                {isBreaking ? 'Breaking' : tag}
            </div>

            {isVideo && <PlayButton small />}

            <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col justify-end">
                <h3 className="text-[18px] md:text-[20px] font-bold text-white leading-snug mb-4 line-clamp-3">{article.title}</h3>
                <div className="flex items-center justify-between border-t border-white/20 pt-4">
                    <p className="text-[8px] font-prompt text-white/60 uppercase tracking-widest font-medium">{formatDate(article.publishedAt) ?? 'Recent'}</p>
                    <p className="text-[10px] text-brand-yellow font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                        {isVideo ? 'Watch' : 'Read More'} <span>→</span>
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default async function BlogPage() {
    const dbCategories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    const dynamicCats = ["All", ...dbCategories.map((c: any) => c.name)];
    
    // Define standard categories to prevent duplicates
    const STANDARD_CATS = ["Headlines", "Breaking News", "GTV Content", "Politics", "International", "Entertainment", "Health", "Sports"];
    
    // Extract purely custom categories created in the admin panel
    const customCategories = dynamicCats.filter(cat => cat !== "All" && !STANDARD_CATS.includes(cat));
    
    const categories = dynamicCats.length > 1 ? dynamicCats : ["All", ...STANDARD_CATS];

    const latestArticles = await prisma.article.findMany({
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' },
        take: 40,
        include: { categories: { include: { category: true } } }
    });

    const getArticles = (cat: string, limit: number) => {
        return latestArticles
            .filter((a: any) => a.categories.some((c: any) => c.category.name.toLowerCase() === cat.toLowerCase()))
            .slice(0, limit);
    };

    const headlines    = getArticles("Headlines", 3);
    const breaking     = getArticles("Breaking News", 6);
    const gtv          = getArticles("GTV Content", 3);
    const politics     = getArticles("Politics", 3);
    const international = getArticles("International", 6);
    const entertainment = getArticles("Entertainment", 3);
    const health       = getArticles("Health", 3);
    const sports       = getArticles("Sports", 3);

    return (
        // Replaced font-gudlak with font-sans
        <div className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-brand-yellow selection:text-brand-dark-navy">

            {/* --- TOP BAR --- */}
            <div className="hidden md:flex bg-[#0B1530] text-white/60 px-16 py-2.5 justify-between items-center text-[9px] font-prompt font-medium tracking-wider border-b border-white/5">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-brand-yellow rounded-full"></div>
                        <span>{new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <span>Abuja, Nigeria</span>
                    <span className="ml-4 opacity-30 italic font-light tracking-normal">Accelerating African Narrative</span>
                </div>
                <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-6 h-6 bg-white/5 rounded flex items-center justify-center border border-white/5">
                            <div className="w-3 h-3 bg-white/40 rounded-sm"></div>
                        </div>
                    ))}
                </div>
            </div>

            <Navbar activePage="Blog" />

            {/* --- MEDIA HERO (HEADLINES) --- */}
            <section className="bg-brand-dark-navy text-white px-6 md:px-16 pt-10 pb-16 md:pb-24">
                <div className="text-[9px] uppercase tracking-[0.25em] text-white/20 mb-6 font-prompt font-bold">
                    Home <span className="mx-2">›</span> <span className="text-brand-yellow">Blog</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Blog</h1>
                <p className="text-white/70 text-[14px] md:text-[15px] max-w-xl mb-10 font-prompt font-light leading-relaxed">
                    Stories that shape narratives. Content that moves people across Africa and beyond.
                </p>

                <div className="flex gap-2.5 overflow-x-auto no-scrollbar mb-12 pb-2">
                    {categories.map((cat) => (
                        <button key={cat} className={`px-5 py-2 rounded-full border text-[9px] md:text-[9.5px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${cat === 'All' ? 'bg-brand-yellow text-brand-dark-navy border-brand-yellow' : 'border-white/10 text-white/60'}`}>
                            {cat}
                        </button>
                    ))}
                </div>

                {headlines.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {headlines.map((article: any, i: number) => (
                            <ArticleCard key={i} article={article} defaultTag="Headline" />
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No headlines published yet." light />
                )}
            </section>

            {/* --- RED TICKER --- */}
            {latestArticles.length > 0 && (
                <div className="bg-[#D42027] text-white py-3.5 px-6 md:px-16 flex items-center overflow-hidden">
                    <div className="bg-white text-[#D42027] font-black px-2 py-0.5 text-[9px] rounded-sm tracking-tight mr-6 shrink-0 uppercase">BREAKING</div>
                    <div className="flex gap-12 whitespace-nowrap text-[11px] font-prompt font-medium tracking-tight overflow-hidden">
                        <span className="truncate">{latestArticles[0].title}</span>
                    </div>
                </div>
            )}

            {/* --- BREAKING NEWS --- */}
            <section className="px-6 md:px-16 py-16 md:py-28 bg-[#F8F9FF]">
                <SectionHeader title="Breaking News" />
                {breaking.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {breaking.map((article: any, i: number) => (
                            <ArticleCard key={i} article={article} defaultTag="Breaking" isBreaking />
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No breaking news published yet." />
                )}
            </section>

            {/* --- GTV CONTENT --- */}
            <section className="bg-brand-dark-navy px-6 md:px-16 py-20 md:py-28 text-white">
                <SectionHeader title="GTV CONTENT" light />
                {gtv.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {gtv.map((article: any, i: number) => (
                            <ArticleCard key={i} article={article} defaultTag="GTV Content" isVideo />
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No GTV content published yet." light />
                )}
            </section>

            {/* --- POLITICS --- */}
            <section className="px-6 md:px-16 py-16 md:py-28 bg-[#F4F6FF]">
                <SectionHeader title="Politics" />
                {politics.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {politics.map((article: any, i: number) => (
                            <ArticleCard key={i} article={article} defaultTag="Politics" />
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No politics articles published yet." />
                )}
            </section>

            {/* --- INTERNATIONAL --- */}
            <section className="px-6 md:px-16 py-16 md:py-28 bg-white">
                <SectionHeader title="International" />
                {international.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {international.map((article: any, i: number) => (
                            <ArticleCard key={i} article={article} defaultTag="Global" />
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No international articles published yet." />
                )}
            </section>

            {/* --- ENTERTAINMENT --- */}
            <section className="px-6 md:px-16 py-16 md:py-20 bg-[#F4F6FF]">
                <SectionHeader title="Entertainment" />
                {entertainment.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {entertainment.map((article: any, i: number) => (
                            <ArticleCard key={i} article={article} defaultTag="Entertainment" />
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No entertainment articles published yet." />
                )}
            </section>

            {/* --- HEALTH --- */}
            <section className="px-6 md:px-16 py-16 md:py-20 bg-white">
                <SectionHeader title="Health" />
                {health.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {health.map((article: any, i: number) => (
                            <ArticleCard key={i} article={article} defaultTag="Health" />
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No health articles published yet." />
                )}
            </section>

            {/* --- SPORTS --- */}
            <section className="bg-brand-dark-navy px-6 md:px-16 py-20 md:py-28 text-white">
                <SectionHeader title="Sports" light />
                {sports.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {sports.map((article: any, i: number) => (
                            <ArticleCard key={i} article={article} defaultTag="Sports" />
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No sports articles published yet." light />
                )}
            </section>

            {/* --- DYNAMIC CUSTOM CATEGORIES --- */}
            {/* Automatically generates sections for new categories created in the admin panel */}
            {customCategories.map(cat => {
                const catArticles = getArticles(cat, 6);
                if (catArticles.length === 0) return null;

                return (
                    <section key={cat} className="px-6 md:px-16 py-16 md:py-20 bg-[#F8F9FA] border-t border-gray-200">
                        <SectionHeader title={cat} />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {catArticles.map((article: any, i: number) => (
                                <ArticleCard key={i} article={article} defaultTag={cat} />
                            ))}
                        </div>
                    </section>
                );
            })}

            <CtaBanner />
            <Footer />
        </div>
    );
}
