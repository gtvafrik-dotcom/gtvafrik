import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaBanner from "@/components/CtaBanner";
import Image from "next/image";
import Link from "next/link";

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
            <div className={`w-0 h-0 border-t-[${small ? '6px' : '7px'}] border-t-transparent border-l-[${small ? '11px' : '13px'}] border-l-brand-dark-navy border-b-[${small ? '6px' : '7px'}] border-b-transparent ml-1`}></div>
        </div>
    </div>
);

export default function BlogPage() {
    const categories = ["All", "Headlines", "Breaking News", "GTV Content", "Politics", "International", "Entertainment", "Health", "Sports"];

    return (
        <div className="min-h-screen bg-white font-gudlak overflow-x-hidden selection:bg-brand-yellow selection:text-brand-dark-navy">
            {/* --- TOP BAR (Hidden on Mobile) --- */}
            <div className="hidden md:flex bg-[#0B1530] text-white/60 px-16 py-2.5 justify-between items-center text-[9px] font-prompt font-medium tracking-wider border-b border-white/5">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-brand-yellow rounded-full"></div>
                        <span>Monday, April 27, 2026</span>
                    </div>
                    <span>Abuja, Nigeria</span>
                    <span>32C</span>
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

                {/* Categories - Horizontal Swipe on Mobile */}
                <div className="flex gap-2.5 overflow-x-auto no-scrollbar mb-12 pb-2">
                    {categories.map((cat) => (
                        <button key={cat} className={`px-5 py-2 rounded-full border text-[9px] md:text-[9.5px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${cat === 'All' ? 'bg-brand-yellow text-brand-dark-navy border-brand-yellow' : 'border-white/10 text-white/60'}`}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Hero Feature - Responsive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    <div className="md:col-span-8 aspect-[4/5] md:aspect-auto md:h-[450px] bg-brand-vibrant-blue rounded-xl shadow-2xl relative">
                        <div className="absolute top-4 left-4 bg-brand-yellow text-brand-dark-navy px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest">Headlines</div>
                        {/* Pager Dots */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            <div className="w-4 h-1.5 bg-brand-yellow rounded-full"></div>
                            {[1, 2, 3, 4].map(i => <div key={i} className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>)}
                        </div>
                    </div>
                    <div className="hidden md:flex md:col-span-4 flex-col gap-5">
                        <div className="flex-1 bg-brand-vibrant-blue rounded-xl"></div>
                        <div className="flex-1 bg-brand-vibrant-blue rounded-xl"></div>
                    </div>
                </div>
            </section>

            {/* --- RED TICKER --- */}
            <div className="bg-[#D42027] text-white py-3.5 px-6 md:px-16 flex items-center overflow-hidden">
                <div className="bg-white text-[#D42027] font-black px-2 py-0.5 text-[9px] rounded-sm tracking-tight mr-6 shrink-0 uppercase">BREAKING</div>
                <div className="flex gap-12 whitespace-nowrap text-[11px] font-prompt font-medium tracking-tight overflow-hidden">
                    <span className="truncate">Uganda Airlines flight makes emergency return a....</span>
                </div>
            </div>

            {/* --- BREAKING NEWS --- */}
            <section className="px-6 md:px-16 py-16 md:py-28 bg-[#F8F9FF]">
                <SectionHeader title="Breaking News" />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
                    <div className="md:col-span-4 bg-white border border-gray-100 overflow-hidden rounded-2xl shadow-sm flex flex-col h-full">
                        <div className="aspect-[4/3] bg-brand-vibrant-blue relative p-5">
                            <span className="bg-[#D42027] text-white text-[9px] px-4 py-1.5 rounded-full font-bold uppercase tracking-widest font-prompt shadow-lg">Breaking News</span>
                        </div>
                        <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
                            <h3 className="text-[20px] md:text-[22px] font-bold text-brand-dark-navy mb-5 leading-tight">Rethinking Travel in a Warming World</h3>
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest font-prompt">Climate • 2 days ago</p>
                        </div>
                    </div>

                    <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-10">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex gap-3 group cursor-pointer border-b border-gray-100 pb-8">
                                <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 rounded-xl shrink-0 group-hover:scale-95 transition-transform"></div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-brand-vibrant-blue font-bold text-[8.5px] uppercase tracking-widest mb-2.5 font-prompt">Media</span>
                                    <h4 className="text-[13px] md:text-[14.5px] font-bold text-brand-dark-navy leading-tight">World Autism Day: Specialised school shortage hinders education</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- GTV CONTENT --- */}
            <section className="bg-brand-dark-navy px-6 md:px-16 py-20 md:py-28 text-white">
                <SectionHeader title="GTV CONTENT" light />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                            <div className="aspect-video bg-brand-vibrant-blue relative">
                                <PlayButton />
                            </div>
                            <div className="p-6 md:p-8 text-brand-dark-navy">
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3 font-prompt">Politics · Videos</p>
                                <h3 className="text-[14px] md:text-[15px] font-bold leading-snug mb-5 md:mb-6">Chief Edward David Onoja: Reflecting on Leadership, Tinubu's Vision...</h3>
                                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest font-prompt">2 days ago</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- POLITICS --- */}
            <section className="px-6 md:px-16 py-16 md:py-28 bg-[#F4F6FF]">
                <SectionHeader title="Politics" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow">
                            <div className="h-56 md:h-48 bg-gray-300"></div>
                            <div className="p-6 md:p-8">
                                <p className="text-[9px] font-bold text-brand-dark-navy uppercase tracking-widest mb-3 font-prompt">Politics</p>
                                <h3 className="text-[15px] font-bold text-brand-dark-navy leading-snug mb-5">PDP Convention Shows True Power Is Structure, Not Social Media Noise</h3>
                                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest font-prompt">2 days ago</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- INTERNATIONAL --- */}
            <section className="px-6 md:px-16 py-16 md:py-28 bg-white">
                <SectionHeader title="International" />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
                    <div className="md:col-span-4 bg-white border border-gray-100 overflow-hidden rounded-2xl shadow-sm flex flex-col h-full">
                        <div className="aspect-[4/3] bg-brand-vibrant-blue relative"></div>
                        <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
                            <p className="text-[10px] font-bold text-brand-dark-navy uppercase tracking-widest mb-4 font-prompt">International · Aviation</p>
                            <h3 className="text-[20px] md:text-[22px] font-bold text-brand-dark-navy mb-5 leading-tight">Uganda Airlines Emergency Return. What Aviation Experts Say</h3>
                            <p className="text-gray-500 font-prompt text-[13px] mb-8 leading-relaxed font-light hidden md:block">Specialists weigh in on bird strike risks and airline safety protocols across East Africa's growing aviation sector.</p>
                            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest font-prompt">2 days ago</p>
                        </div>
                    </div>
                    <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-10">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex gap-3 group cursor-pointer border-b border-gray-100 pb-8">
                                <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 rounded-xl shrink-0 group-hover:scale-95 transition-transform"></div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-brand-vibrant-blue font-bold text-[8.5px] uppercase tracking-widest mb-2.5 font-prompt">Science · Global</span>
                                    <h4 className="text-[13px] md:text-[14.5px] font-bold text-brand-dark-navy leading-tight">AI Health Messaging in Kenya and Nigeria: A Surprising Verdict</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- ENTERTAINMENT & HEALTH --- */}
            <div className="px-6 md:px-16 py-10 md:py-28 bg-[#F4F6FF] flex flex-col md:grid md:grid-cols-2 gap-16 md:gap-20">
                <section>
                    <SectionHeader title="Entertainment" />
                    <div className="bg-white rounded-2xl overflow-hidden mb-6 md:mb-10 shadow-sm">
                        <div className="aspect-video bg-brand-vibrant-blue relative">
                            <PlayButton />
                        </div>
                        <div className="p-6 md:p-8">
                            <p className="text-[9px] font-bold text-brand-dark-navy/60 uppercase tracking-widest mb-2 font-prompt">Music · Culture</p>
                            <h3 className="text-[15px] md:text-[16px] font-bold text-brand-dark-navy leading-snug mb-3">Tributes Flow for Late Musician Yullander</h3>
                            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest font-prompt">April 2, 2026</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 md:gap-8">
                        {[1, 2].map(i => (
                            <div key={i} className="flex gap-5 group cursor-pointer">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-300 rounded-xl shrink-0 group-hover:scale-95 transition-transform"></div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-brand-vibrant-blue font-bold text-[8.5px] uppercase tracking-widest mb-1 font-prompt">Science · Global</span>
                                    <h4 className="text-[13px] font-bold text-brand-dark-navy leading-snug">AI Health Messaging in Kenya and Nigeria: A Surprising Verdict</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <section>
                    <SectionHeader title="Health" />
                    <div className="bg-white rounded-2xl overflow-hidden mb-6 md:mb-10 shadow-sm">
                        <div className="aspect-video bg-brand-vibrant-blue relative">
                            <PlayButton />
                        </div>
                        <div className="p-6 md:p-8">
                            <p className="text-[9px] font-bold text-brand-dark-navy/60 uppercase tracking-widest mb-2 font-prompt">Health · SDGs</p>
                            <h3 className="text-[15px] md:text-[16px] font-bold text-brand-dark-navy leading-snug mb-3">World Autism Day: Specialised School Shortage Hinders Education</h3>
                            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest font-prompt">April 2, 2026</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 md:gap-8">
                        {[1, 2].map(i => (
                            <div key={i} className="flex gap-5 group cursor-pointer">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-300 rounded-xl shrink-0 group-hover:scale-95 transition-transform"></div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-brand-vibrant-blue font-bold text-[8.5px] uppercase tracking-widest mb-1 font-prompt">Science · Global</span>
                                    <h4 className="text-[13px] font-bold text-brand-dark-navy leading-snug">AI Health Messaging in Kenya and Nigeria: A Surprising Verdict</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* --- SPORTS --- */}
            <section className="bg-brand-dark-navy px-6 md:px-16 py-20 md:py-28 text-white">
                <SectionHeader title="Sports" light />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Bruno Fernandes Applauds Fans After Crucial Victory", cat: "Football" },
                        { title: "African Athletes Making Waves Across European Leagues This Season", cat: "Pan-African Sports" },
                        { title: "Nigeria's Track Stars Eye Podium Finishes at Upcoming Championship", cat: "Athletics" }
                    ].map((item, i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                            <div className="h-48 bg-brand-vibrant-blue group-hover:opacity-90 transition-opacity"></div>
                            <div className="p-6 md:p-8 text-brand-dark-navy">
                                <p className="text-[9px] font-bold text-brand-dark-navy/60 uppercase tracking-widest mb-3 font-prompt">{item.cat}</p>
                                <h3 className="text-[15px] font-bold leading-tight mb-4">{item.title}</h3>
                                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest font-prompt">2 days ago</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <CtaBanner />
            <Footer />
        </div>
    );
}