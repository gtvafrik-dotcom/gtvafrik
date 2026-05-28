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
    <div className="absolute inset-0 flex items-center justify-center">
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
    const dbCategories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    // Categories come from DB only — no hardcoded fallback list
    const categories = ["All", ...dbCategories.map((c) => c.name)];

    const latestArticles = await prisma.article.findMany({
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' },
        take: 40,
        include: { categories: { include: { category: true } } }
    });

    // Fixed: no longer falls back to unrelated articles when a category is empty
    const getArticles = (cat: string, limit: number) => {
        return latestArticles
            .filter((a) => a.categories.some((c) => c.category.name.toLowerCase() === cat.toLowerCase()))
            .slice(0, limit);
    };

    const headlines    = getArticles("Headlines", 3);
    const breaking     = getArticles("Breaking News", 7);
    const gtv          = getArticles("GTV Content", 3);
    const politics     = getArticles("Politics", 3);
    const international = getArticles("International", 7);
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
                        {/* Dynamic date instead of hardcoded */}
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

            {/* --- MEDIA HERO --- */}
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
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                        <Link href={`/blog/${headlines[0].slug}`} className="md:col-span-8 aspect-[4/5] md:aspect-auto md:h-[450px] bg-brand-vibrant-blue rounded-xl shadow-2xl relative block overflow-hidden group">
                            {headlines[0].thumbnail && <img src={headlines[0].thumbnail} alt={headlines[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />}
                            <div className="absolute top-4 left-4 bg-brand-yellow text-brand-dark-navy px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest z-10">Headlines</div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1530]/90 via-transparent to-transparent z-0"></div>
                            <div className="absolute bottom-12 left-8 right-8 z-10">
                                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">{headlines[0].title}</h2>
                            </div>
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                <div className="w-4 h-1.5 bg-brand-yellow rounded-full"></div>
                                {[1, 2, 3, 4].map(i => <div key={i} className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>)}
                            </div>
                        </Link>
                        <div className="hidden md:flex md:col-span-4 flex-col gap-5">
                            {headlines.slice(1, 3).map((article, idx) => (
                                <Link href={`/blog/${article.slug}`} key={idx} className="flex-1 bg-brand-vibrant-blue rounded-xl relative overflow-hidden group">
                                    {article.thumbnail && <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1530]/90 to-transparent z-0"></div>
                                    <div className="absolute bottom-6 left-6 right-6 z-10">
                                        <h3 className="text-lg font-bold text-white">{article.title}</h3>
                                    </div>
                                </Link>
                            ))}
                            {/* Neutral placeholders for missing headline slots — no fake content */}
                            {Array.from({ length: Math.max(0, 2 - headlines.slice(1, 3).length) }).map((_, i) => (
                                <div key={`ph-${i}`} className="flex-1 bg-white/5 rounded-xl" />
                            ))}
                        </div>
                    </div>
                ) : (
                    <EmptyState message="No headlines published yet." light />
                )}
            </section>

            {/* --- RED TICKER — only shown when there are articles --- */}
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
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
                        <Link href={`/blog/${breaking[0].slug}`} className="md:col-span-4 bg-white border border-gray-100 overflow-hidden rounded-2xl shadow-sm flex flex-col h-full group">
                            <div className="aspect-[4/3] bg-brand-vibrant-blue relative p-5 overflow-hidden">
                                {breaking[0].thumbnail && <img src={breaking[0].thumbnail} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" alt={breaking[0].title} />}
                                <span className="relative z-10 bg-[#D42027] text-white text-[9px] px-4 py-1.5 rounded-full font-bold uppercase tracking-widest font-prompt shadow-lg">Breaking News</span>
                            </div>
                            <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
                                <h3 className="text-[20px] md:text-[22px] font-bold text-brand-dark-navy mb-5 leading-tight">{breaking[0].title}</h3>
                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest font-prompt">
                                    {breaking[0].categories?.[0]?.category.name ?? 'News'} • {formatDate(breaking[0].publishedAt) ?? 'Recent'}
                                </p>
                            </div>
                        </Link>
                        {breaking.length > 1 && (
                            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-10">
                                {breaking.slice(1, 7).map((article, i) => (
                                    <Link href={`/blog/${article.slug}`} key={i} className="flex gap-3 group cursor-pointer border-b border-gray-100 pb-8">
                                        <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 rounded-xl shrink-0 group-hover:scale-95 transition-transform overflow-hidden relative">
                                            {article.thumbnail && <img src={article.thumbnail} className="absolute inset-0 w-full h-full object-cover" alt={article.title} />}
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            {article.categories?.[0]?.category.name && (
                                                <span className="text-brand-vibrant-blue font-bold text-[8.5px] uppercase tracking-widest mb-2.5 font-prompt">{article.categories[0].category.name}</span>
                                            )}
                                            <h4 className="text-[13px] md:text-[14.5px] font-bold text-brand-dark-navy leading-tight">{article.title}</h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
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
                        {gtv.map((article, i) => (
                            <Link href={`/blog/${article.slug}`} key={i} className="bg-white rounded-2xl overflow-hidden shadow-2xl group cursor-pointer block">
                                <div className="aspect-video bg-brand-vibrant-blue relative overflow-hidden">
                                    {article.thumbnail && <img src={article.thumbnail} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" alt={article.title} />}
                                    <PlayButton />
                                </div>
                                <div className="p-6 md:p-8 text-brand-dark-navy">
                                    {article.categories?.[0]?.category.name && (
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3 font-prompt">{article.categories[0].category.name} · Videos</p>
                                    )}
                                    <h3 className="text-[14px] md:text-[15px] font-bold leading-snug mb-5 md:mb-6 line-clamp-2">{article.title}</h3>
                                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest font-prompt">{formatDate(article.publishedAt) ?? 'Recent'}</p>
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
                        {politics.map((article, i) => (
                            <Link href={`/blog/${article.slug}`} key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow block">
                                <div className="h-56 md:h-48 bg-gray-300 relative overflow-hidden">
                                    {article.thumbnail && <img src={article.thumbnail} className="absolute inset-0 w-full h-full object-cover" alt={article.title} />}
                                </div>
                                <div className="p-6 md:p-8">
                                    <p className="text-[9px] font-bold text-brand-dark-navy uppercase tracking-widest mb-3 font-prompt">Politics</p>
                                    <h3 className="text-[15px] font-bold text-brand-dark-navy leading-snug mb-5 line-clamp-2">{article.title}</h3>
                                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest font-prompt">{formatDate(article.publishedAt) ?? 'Recent'}</p>
                                </div>
                            </Link>
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
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
                        <Link href={`/blog/${international[0].slug}`} className="md:col-span-4 bg-white border border-gray-100 overflow-hidden rounded-2xl shadow-sm flex flex-col h-full group">
                            <div className="aspect-[4/3] bg-brand-vibrant-blue relative overflow-hidden">
                                {international[0].thumbnail && <img src={international[0].thumbnail} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" alt={international[0].title} />}
                            </div>
                            <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
                                <p className="text-[10px] font-bold text-brand-dark-navy uppercase tracking-widest mb-4 font-prompt">International</p>
                                <h3 className="text-[20px] md:text-[22px] font-bold text-brand-dark-navy mb-5 leading-tight">{international[0].title}</h3>
                                {/* excerpt is nullable in schema — only render when present */}
                                {international[0].excerpt && (
                                    <p className="text-gray-500 font-prompt text-[13px] mb-8 leading-relaxed font-light hidden md:block line-clamp-3">{international[0].excerpt}</p>
                                )}
                                <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest font-prompt">{formatDate(international[0].publishedAt) ?? 'Recent'}</p>
                            </div>
                        </Link>
                        {international.length > 1 && (
                            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-10">
                                {international.slice(1, 7).map((article, i) => (
                                    <Link href={`/blog/${article.slug}`} key={i} className="flex gap-3 group cursor-pointer border-b border-gray-100 pb-8">
                                        <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 rounded-xl shrink-0 group-hover:scale-95 transition-transform relative overflow-hidden">
                                            {article.thumbnail && <img src={article.thumbnail} className="absolute inset-0 w-full h-full object-cover" alt={article.title} />}
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <span className="text-brand-vibrant-blue font-bold text-[8.5px] uppercase tracking-widest mb-2.5 font-prompt">Global</span>
                                            <h4 className="text-[13px] md:text-[14.5px] font-bold text-brand-dark-navy leading-tight">{article.title}</h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
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
                            <Link href={`/blog/${entertainment[0].slug}`} className="bg-white rounded-2xl overflow-hidden mb-6 md:mb-10 shadow-sm block group">
                                <div className="aspect-video bg-brand-vibrant-blue relative overflow-hidden">
                                    {entertainment[0].thumbnail && <img src={entertainment[0].thumbnail} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" alt={entertainment[0].title} />}
                                    <PlayButton />
                                </div>
                                <div className="p-6 md:p-8">
                                    {entertainment[0].categories?.[0]?.category.name && (
                                        <p className="text-[9px] font-bold text-brand-dark-navy/60 uppercase tracking-widest mb-2 font-prompt">{entertainment[0].categories[0].category.name}</p>
                                    )}
                                    <h3 className="text-[15px] md:text-[16px] font-bold text-brand-dark-navy leading-snug mb-3">{entertainment[0].title}</h3>
                                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest font-prompt">{formatDate(entertainment[0].publishedAt) ?? 'Recent'}</p>
                                </div>
                            </Link>
                            {entertainment.length > 1 && (
                                <div className="flex flex-col gap-6 md:gap-8">
                                    {entertainment.slice(1, 3).map((article, i) => (
                                        <Link href={`/blog/${article.slug}`} key={i} className="flex gap-5 group cursor-pointer">
                                            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-300 rounded-xl shrink-0 group-hover:scale-95 transition-transform overflow-hidden relative">
                                                {article.thumbnail && <img src={article.thumbnail} className="absolute inset-0 w-full h-full object-cover" alt={article.title} />}
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                {article.categories?.[0]?.category.name && (
                                                    <span className="text-brand-vibrant-blue font-bold text-[8.5px] uppercase tracking-widest mb-1 font-prompt">{article.categories[0].category.name}</span>
                                                )}
                                                <h4 className="text-[13px] font-bold text-brand-dark-navy leading-snug">{article.title}</h4>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <EmptyState message="No entertainment articles published yet." />
                    )}
                </section>

                <section>
                    <SectionHeader title="Health" />
                    {health.length > 0 ? (
                        <>
                            <Link href={`/blog/${health[0].slug}`} className="bg-white rounded-2xl overflow-hidden mb-6 md:mb-10 shadow-sm block group">
                                <div className="aspect-video bg-brand-vibrant-blue relative overflow-hidden">
                                    {health[0].thumbnail && <img src={health[0].thumbnail} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" alt={health[0].title} />}
                                    <PlayButton />
                                </div>
                                <div className="p-6 md:p-8">
                                    <p className="text-[9px] font-bold text-brand-dark-navy/60 uppercase tracking-widest mb-2 font-prompt">Health</p>
                                    <h3 className="text-[15px] md:text-[16px] font-bold text-brand-dark-navy leading-snug mb-3">{health[0].title}</h3>
                                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest font-prompt">{formatDate(health[0].publishedAt) ?? 'Recent'}</p>
                                </div>
                            </Link>
                            {health.length > 1 && (
                                <div className="flex flex-col gap-6 md:gap-8">
                                    {health.slice(1, 3).map((article, i) => (
                                        <Link href={`/blog/${article.slug}`} key={i} className="flex gap-5 group cursor-pointer">
                                            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-300 rounded-xl shrink-0 group-hover:scale-95 transition-transform relative overflow-hidden">
                                                {article.thumbnail && <img src={article.thumbnail} className="absolute inset-0 w-full h-full object-cover" alt={article.title} />}
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <span className="text-brand-vibrant-blue font-bold text-[8.5px] uppercase tracking-widest mb-1 font-prompt">Health</span>
                                                <h4 className="text-[13px] font-bold text-brand-dark-navy leading-snug">{article.title}</h4>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
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
                        {sports.map((article, i) => (
                            <Link href={`/blog/${article.slug}`} key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg group cursor-pointer block">
                                <div className="h-48 bg-brand-vibrant-blue group-hover:opacity-90 transition-opacity relative overflow-hidden">
                                    {article.thumbnail && <img src={article.thumbnail} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" alt={article.title} />}
                                </div>
                                <div className="p-6 md:p-8 text-brand-dark-navy">
                                    {article.categories?.[0]?.category.name && (
                                        <p className="text-[9px] font-bold text-brand-dark-navy/60 uppercase tracking-widest mb-3 font-prompt">{article.categories[0].category.name}</p>
                                    )}
                                    <h3 className="text-[15px] font-bold leading-tight mb-4 line-clamp-2">{article.title}</h3>
                                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest font-prompt">{formatDate(article.publishedAt) ?? 'Recent'}</p>
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
