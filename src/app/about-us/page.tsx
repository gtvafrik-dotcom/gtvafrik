import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaBanner from "@/components/CtaBanner";
import Image from "next/image";

const SectionHeader = ({ title, light = false }: { title: string; light?: boolean }) => (
    <div className="flex items-center gap-2 mb-6">
        <div className="w-[2.5px] h-3.5 bg-brand-yellow"></div>
        <h2 className={`font-bold uppercase tracking-[0.2em] text-[9.5px] ${light ? 'text-white' : 'text-brand-dark-navy'}`}>{title}</h2>
    </div>
);

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white font-gudlak overflow-x-hidden selection:bg-brand-yellow selection:text-brand-dark-navy">
            <Navbar activePage="About Us" />

            {/* --- HERO SECTION --- */}
            <section className="bg-brand-dark-navy text-white px-4 sm:px-6 md:px-8 lg:px-16 pt-12 pb-16 md:pt-16 md:pb-20 lg:pt-12 lg:pb-24">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-16">
                    <div className="col-span-1 lg:col-span-6">
                        <div className="text-[10px] font-prompt font-medium tracking-widest mb-8 md:mb-10 flex gap-2">
                            <span className="text-white/30">Home</span>
                            <span className="text-white/20">›</span>
                            <span className="text-brand-yellow">About</span>
                        </div>

                        <SectionHeader title="WHO WE ARE" light />

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-6 md:mb-8">
                            Africa's Story, <br />
                            Told With <span className="text-brand-yellow">Purpose.</span>
                        </h1>

                        <p className="font-prompt font-light text-[12px] md:text-[14px] text-white/60 max-w-md mb-8 md:mb-12 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-brand-yellow text-brand-dark-navy px-6 py-2.5 rounded-sm font-bold text-[9px] uppercase tracking-widest transition-all hover:brightness-110">
                                Work with us
                            </button>
                            <button className="border border-white/20 text-white px-6 py-2.5 rounded-sm font-bold text-[9px] uppercase tracking-widest hover:bg-white/5 transition-all">
                                Explore our work
                            </button>
                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-6">
    <div className="w-full aspect-video relative shadow-2xl rounded-lg overflow-hidden bg-brand-dark-navy/50">
        <video 
            src="/promo.mp4" 
            controls 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover"
        >
            Your browser does not support the video tag.
        </video>
    </div>
</div>
                </div>
            </section>

            {/* --- STATS STRIP --- */}
            <section className="bg-brand-vibrant-blue py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16">
                <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center text-brand-yellow gap-8 sm:gap-0">
                    <div className="text-center">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 tracking-tighter">50k+</h3>
                    </div>
                    <div className="text-center">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 tracking-tighter">50k+</h3>
                    </div>
                    <div className="text-center">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 tracking-tighter">50k+</h3>
                    </div>
                </div>
            </section>

            {/* --- OUR STORY SECTION --- */}
            <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-16 bg-white">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                    <div className="col-span-1 lg:col-span-6">
                        <div className="w-full aspect-video bg-brand-vibrant-blue relative shadow-xl rounded-lg">
                            <div className="absolute top-4 left-4 bg-brand-yellow text-brand-dark-navy px-3 py-1 rounded-sm text-[9px] font-bold uppercase tracking-widest">
                                EST 20XX
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-6">
                        <SectionHeader title="OUR STORY" />
                        <h2 className="text-2xl md:text-3xl lg:text-[34px] font-bold text-brand-dark-navy leading-[1.1] mb-6 md:mb-8">
                            From a Vision to a <span className="text-brand-vibrant-blue">Pan-African Voice.</span>
                        </h2>
                        <div className="space-y-4 md:space-y-6 font-prompt font-light text-[12px] md:text-[14px] text-brand-dark-navy/60 leading-relaxed">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MISSION VISION VALUES --- */}
            <section className="bg-brand-dark-navy py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-16 text-center">
                <SectionHeader title="WHAT DRIVES US" light />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
                    Mission, Vision & <span className="text-brand-yellow">Values</span>
                </h2>
                <p className="font-prompt font-light text-[12px] md:text-[14px] text-white/50 max-w-xl mx-auto mb-12 md:mb-16 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
                    <div className="aspect-[4/5] bg-white/5 border border-white/5 rounded-2xl"></div>
                    <div className="aspect-[4/5] bg-white/5 border border-white/5 rounded-2xl"></div>
                    <div className="aspect-[4/5] bg-white/5 border border-white/5 rounded-2xl"></div>
                </div>
            </section>

            {/* --- MAMMA FRAMEWORK --- */}
            <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-16 bg-[#F8F9FF]">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between items-start mb-12 lg:mb-16 gap-8 lg:gap-0">
                        <div className="max-w-md">
                            <SectionHeader title="OUR FRAMEWORK" />
                            <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold text-brand-dark-navy leading-none">
                                The <span className="text-brand-vibrant-blue uppercase">MAMMA</span> <br /> Framework
                            </h2>
                        </div>
                        <p className="font-prompt font-light text-[12px] md:text-[14px] text-brand-dark-navy/60 max-w-sm leading-relaxed pt-0 lg:pt-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="aspect-square bg-white rounded-2xl shadow-sm"></div>
                        <div className="aspect-square bg-white rounded-2xl shadow-sm"></div>
                        <div className="aspect-square bg-white rounded-2xl shadow-sm"></div>
                    </div>
                </div>
            </section>

            {/* --- PARTNERS STRIP --- */}
            <section className="bg-white py-8 md:py-14 border-b border-gray-50">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 max-w-[1200px] mx-auto">
                    <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-dark-navy/20 font-prompt">Partners & Clients</p>
                </div>
            </section>

            <CtaBanner />
            <Footer />
        </div>
    );
}