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
    <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className={`${small ? 'w-10 h-10' : 'w-12 h-12'} bg-brand-yellow rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer`}>
            <div className={`w-0 h-0 border-t-[7px] border-t-transparent border-l-[13px] border-l-brand-dark-navy border-b-[7px] border-b-transparent ml-1`}></div>
        </div>
    </div>
);

// Formats publishedAt; returns null if date is missing
const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return null;
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
    }).format(new Date(date));
};

// Shown when a category section has no published articles
const EmptyState = ({ message, light = false }: { message: string; light?: boolean }) => (
    <p className={`font-prompt text-sm py-8 ${light ? 'text-white/30' : 'text-gray-400'}`}>{message}</p>
);

export default async function BlogPage() {
    // 1. Fetch DB Categories
    const dbCategories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    const dynamicCats = ["All", ...dbCategories.map((c: any) => c.name)];
    const categories = dynamicCats.length > 1 ? dynamicCats : ["All", "Headlines", "Breaking News", "GTV Content", "Politics", "International", "Entertainment", "Health", "Sports"];

    // 2. Fetch Latest Articles
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
        <div className="min-h-screen bg-white font-gudlak overflow-x-hidden selection:bg-brand-yellow selection:text-brand-dark-navy">

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

                {/* UNIFORM GRID FOR HEADLINES - Image Backgrounds + Read More */}
                {headlines.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {headlines.map((article: any, i: number) => (
                            <Link href={`/blog/${article.slug}`} key={i} className="relative rounded-2xl overflow-hidden shadow-lg group block aspect-[4/5] md:aspect-auto md:h-[420px]">
                                {article.thumbnail && <img src={article.thumbnail} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={article.title} />}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1530]/90 via-[#0B1530]/20 to-transparent z-0 transition-opacity group-hover:opacity-90"></div>
                                
                                <div className="absolute top-4 left-4 bg-brand-yellow text-brand-dark-navy px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest z-10">
                                    Headline
                                </div>

                                <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col justify-end">
                                    <h3 className="text-[18px] md:text-[22px] font-bold text-white leading-snug mb-4 line-clamp-3">{article.title}</h3>
                                    <div className="flex items-center justify-between border-t border-white/20 pt-4">
                                        <p className="text-[8px] font-prompt text-white/60 uppercase tracking-widest font-medium">{formatDate(article.publishedAt) ?? 'Recent'}</p>
                                        <p className="text-[10px] text-brand-yellow font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read More <span>→</span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
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

            {/* --- BREAKING NEWS (UNIFORM GRID) --- */}
            <section className="px-6 md:px-16 py-16 md:py-28 bg-[#F8F9FF]">
                <SectionHeader title="Breaking News" />
                {breaking.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {breaking.map((article: any, i: number) => (
                            <Link href={`/blog/${article.slug}`} key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                                <div className="aspect-[4/3] bg-brand-vibrant-blue relative overflow-hidden shrink-0">
                                    {article.thumbnail && <img src={article.thumbnail} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={article.title} />}
                                    <span className="absolute top-4 left-4 z-10 bg-[#D42027] text-white text-[9px] px-3 py-1 rounded-sm font-bold uppercase tracking-widest font-prompt shadow-lg">Breaking</span>
                                </div>
                                <div className="p-6 md:p-8 flex flex-col flex-grow">
                                    {article.categories?.[0]?.category.name && (
                                        <p className="text-[9px] font-bold text-brand-vibrant-blue uppercase tracking-widest mb-3 font-prompt">{article.categories[0].category.name}</p>
                                    )}
                                    <h3 className="text-[16px] md:text-[18px] font-bold text-brand-dark-navy leading-snug mb-4 line-clamp-3">{article.title}</h3>
                                    
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <p className="text-[8px] font-prompt text-gray-400 uppercase tracking-widest font-medium">{formatDate(article.publishedAt) ?? 'Recent'}</p>
                                        <p className="text-[9px] text-brand-vibrant-blue font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read More <span>→</span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {gtv.map((article: any, i: number) => (
                            <Link href={`/blog/${article.slug}`} key={i} className="bg-white rounded-2xl overflow-hidden shadow-2xl group cursor-pointer block flex flex-col h-full">
                                <div className="aspect-video bg-brand-vibrant-blue relative overflow-hidden shrink-0">
                                    {article.thumbnail && <img src={article.thumbnail} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={article.title} />}
                                    <PlayButton />
                                </div>
                                <div className="p-6 md:p-8 text-brand-dark-navy flex flex-col flex-grow">
                                    {article.categories?.[0]?.category.name && (
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3 font-prompt">{article.categories[0].category.name} · Videos</p>
                                    )}
                                    <h3 className="text-[14px] md:text-[15px] font-bold leading-snug mb-4 line-clamp-2">{article.title}</h3>
                                    
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest font-prompt">{formatDate(article.publishedAt) ?? 'Recent'}</p>
                                        <p className="text-[9px] text-brand-vibrant-blue font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Watch <span>→</span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {politics.map((article: any, i: number) => (
                            <Link href={`/blog/${article.slug}`} key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow flex flex-col h-full group">
                                <div className="aspect-[4/3] bg-gray-300 relative overflow-hidden shrink-0">
                                    {article.thumbnail && <img src={article.thumbnail} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={article.title} />}
                                </div>
                                <div className="p-6 md:p-8 flex flex-col flex-grow">
                                    <p className="text-[9px] font-bold text-brand-dark-navy uppercase tracking-widest mb-3 font-prompt">Politics</p>
                                    <h3 className="text-[15px] md:text-[17px] font-bold text-brand-dark-navy leading-snug mb-4 line-clamp-3">{article.title}</h3>
                                    
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest font-prompt">{formatDate(article.publishedAt) ?? 'Recent'}</p>
                                        <p className="text-[9px] text-brand-vibrant-blue font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read More <span>→</span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No politics articles published yet." />
                )}
            </section>

            {/* --- INTERNATIONAL (UNIFORM GRID) --- */}
            <section className="px-6 md:px-16 py-16 md:py-28 bg-white">
                <SectionHeader title="International" />
                {international.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {international.map((article: any, i: number) => (
                            <Link href={`/blog/${article.slug}`} key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                                <div className="aspect-[4/3] bg-brand-vibrant-blue relative overflow-hidden shrink-0">
                                    {article.thumbnail && <img src={article.thumbnail} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={article.title} />}
                                </div>
                                <div className="p-6 md:p-8 flex flex-col flex-grow">
                                    <p className="text-[9px] font-bold text-brand-vibrant-blue uppercase tracking-widest mb-3 font-prompt">Global</p>
                                    <h3 className="text-[16px] md:text-[18px] font-bold text-brand-dark-navy leading-snug mb-3 line-clamp-3">{article.title}</h3>
                                    {article.excerpt && <p className="text-[12px] font-prompt text-gray-500 line-clamp-2 mb-4">{article.excerpt}</p>}
                                    
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <p className="text-[8px] font-prompt text-gray-400 uppercase tracking-widest font-medium">{formatDate(article.publishedAt) ?? 'Recent'}</p>
                                        <p className="text-[9px] text-brand-vibrant-blue font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read More <span>→</span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No international articles published yet." />
                )}
            </section>

            {/* --- ENTERTAINMENT & HEALTH --- */}
            <div className="px-6 md:px-16 py-10 md:py-28 bg-[#F4F6FF] flex flex-col md:grid md:grid-cols-2 gap-16 md:gap-20">
                <section>
                    <SectionHeader title="Entertainment" />
                    {entertainment.length > 0 ? (
                        <>
                            <Link href={`/blog/${entertainment[0].slug}`} className="bg-white rounded-2xl overflow-hidden mb-6 md:mb-10 shadow-sm block group flex flex-col">
                                <div className="aspect-video bg-brand-vibrant-blue relative overflow-hidden shrink-0">
                                    {entertainment[0].thumbnail && <img src={entertainment[0].thumbnail} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={entertainment[0].title} />}
                                    <PlayButton />
                                </div>
                                <div className="p-6 md:p-8 flex flex-col flex-grow">
                                    {entertainment[0].categories?.[0]?.category.name && (
                                        <p className="text-[9px] font-bold text-brand-dark-navy/60 uppercase tracking-widest mb-2 font-prompt">{entertainment[0].categories[0].category.name}</p>
                                    )}
                                    <h3 className="text-[15px] md:text-[16px] font-bold text-brand-dark-navy leading-snug mb-4">{entertainment[0].title}</h3>
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest font-prompt">{formatDate(entertainment[0].publishedAt) ?? 'Recent'}</p>
                                        <p className="text-[9px] text-brand-vibrant-blue font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read More <span>→</span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </>
                    ) : (
                        <EmptyState message="No entertainment articles published yet." />
                    )}
                </section>

                <section>
                    <SectionHeader title="Health" />
                    {health.length > 0 ? (
                        <>
                            <Link href={`/blog/${health[0].slug}`} className="bg-white rounded-2xl overflow-hidden mb-6 md:mb-10 shadow-sm block group flex flex-col">
                                <div className="aspect-video bg-brand-vibrant-blue relative overflow-hidden shrink-0">
                                    {health[0].thumbnail && <img src={health[0].thumbnail} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={health[0].title} />}
                                    <PlayButton />
                                </div>
                                <div className="p-6 md:p-8 flex flex-col flex-grow">
                                    <p className="text-[9px] font-bold text-brand-dark-navy/60 uppercase tracking-widest mb-2 font-prompt">Health</p>
                                    <h3 className="text-[15px] md:text-[16px] font-bold text-brand-dark-navy leading-snug mb-4">{health[0].title}</h3>
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest font-prompt">{formatDate(health[0].publishedAt) ?? 'Recent'}</p>
                                        <p className="text-[9px] text-brand-vibrant-blue font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read More <span>→</span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </>
                    ) : (
                        <EmptyState message="No health articles published yet." />
                    )}
                </section>
            </div>

            {/* --- SPORTS --- */}
            <section className="bg-brand-dark-navy px-6 md:px-16 py-20 md:py-28 text-white">
                <SectionHeader title="Sports" light />
                {sports.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {sports.map((article: any, i: number) => (
                            <Link href={`/blog/${article.slug}`} key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg group cursor-pointer block flex flex-col h-full">
                                <div className="aspect-[4/3] bg-brand-vibrant-blue group-hover:opacity-90 transition-opacity relative overflow-hidden shrink-0">
                                    {article.thumbnail && <img src={article.thumbnail} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={article.title} />}
                                </div>
                                <div className="p-6 md:p-8 text-brand-dark-navy flex flex-col flex-grow">
                                    {article.categories?.[0]?.category.name && (
                                        <p className="text-[9px] font-bold text-brand-dark-navy/60 uppercase tracking-widest mb-3 font-prompt">{article.categories[0].category.name}</p>
                                    )}
                                    <h3 className="text-[15px] font-bold leading-tight mb-4 line-clamp-3">{article.title}</h3>
                                    
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest font-prompt">{formatDate(article.publishedAt) ?? 'Recent'}</p>
                                        <p className="text-[9px] text-brand-vibrant-blue font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read More <span>→</span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No sports articles published yet." light />
                )}
            </section>

            <CtaBanner />
            <Footer />
        </div>
    );
}