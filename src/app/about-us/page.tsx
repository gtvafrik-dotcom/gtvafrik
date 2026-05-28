import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
                            To amplify African voices, shape powerful narratives, and deliver integrated media and communications solutions that position brands, institutions, and individuals for lasting impact.
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

            {/* --- WHY GTVAFRIK SECTION --- */}
            <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-16 bg-white">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                    <div className="col-span-1 lg:col-span-5">
                        <div className="w-full aspect-[4/5] bg-brand-vibrant-blue relative shadow-xl rounded-lg overflow-hidden">
                            <div className="absolute inset-0 bg-brand-dark-navy/10"></div>
                            <div className="absolute top-4 left-4 bg-brand-yellow text-brand-dark-navy px-3 py-1 rounded-sm text-[9px] font-bold uppercase tracking-widest">
                                Why Us
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-7">
                        <SectionHeader title="WHY GTVAFRIK" />
                        <h2 className="text-2xl md:text-3xl lg:text-[34px] font-bold text-brand-dark-navy leading-[1.1] mb-8 md:mb-10">
                            We Don't Just Communicate. <br className="hidden md:block"/>
                            <span className="text-brand-vibrant-blue">We Position.</span>
                        </h2>
                        <div className="space-y-6 font-prompt text-[13px] md:text-[14px] text-brand-dark-navy/70 leading-relaxed">
                            <div>
                                <strong className="text-brand-dark-navy font-bold text-[15px]">Deep African Cultural Intelligence</strong><br/>
                                <span className="font-light">We understand the nuances of African markets, audiences, and narratives that outsiders miss. This isn't surface-level - it's embedded in everything we create.</span>
                            </div>
                            <div>
                                <strong className="text-brand-dark-navy font-bold text-[15px]">Strategy Meets Storytelling</strong><br/>
                                <span className="font-light">We bridge the gap between creative content and business results. Every story we tell has a purpose. Every campaign has a strategy.</span>
                            </div>
                            <div>
                                <strong className="text-brand-dark-navy font-bold text-[15px]">Institutional Trust, Creative Edge</strong><br/>
                                <span className="font-light">We've worked with INEC, the PDP, and the International Energy Agency - giving us the rare ability to navigate both high-stakes institutional communication and culturally resonant creative work.</span>
                            </div>
                            <div>
                                <strong className="text-brand-dark-navy font-bold text-[15px]">Built for the Digital Generation</strong><br/>
                                <span className="font-light">Our primary lens is young, digitally active Africans. We know where they are, what they care about, and how to reach them authentically.</span>
                            </div>
                            <div>
                                <strong className="text-brand-dark-navy font-bold text-[15px]">Global Reach, Local Roots</strong><br/>
                                <span className="font-light">We speak the language of global institutions, UN, UNESCO, development agencies, while remaining deeply connected to African realities on the ground.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MISSION VISION VALUES --- */}
            <section className="bg-brand-dark-navy py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-16">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex flex-col items-center text-center mb-16">
                        <SectionHeader title="WHAT DRIVES US" light />
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                            Mission, Vision & <span className="text-brand-yellow">Values</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-white/5 border border-white/5 p-8 md:p-10 rounded-2xl hover:bg-white/10 transition-colors">
                            <h3 className="text-xl md:text-2xl font-bold text-brand-yellow mb-4 uppercase tracking-widest text-[12px]">Our Mission</h3>
                            <p className="font-prompt font-light text-[14px] md:text-[16px] text-white/80 leading-relaxed">
                                To amplify African voices, shape powerful narratives, and deliver integrated media and communications solutions that position brands, institutions, and individuals for lasting impact, on the continent and across the globe.
                            </p>
                        </div>
                        <div className="bg-white/5 border border-white/5 p-8 md:p-10 rounded-2xl hover:bg-white/10 transition-colors">
                            <h3 className="text-xl md:text-2xl font-bold text-brand-yellow mb-4 uppercase tracking-widest text-[12px]">Our Vision</h3>
                            <p className="font-prompt font-light text-[14px] md:text-[16px] text-white/80 leading-relaxed">
                                A world where Africa's story is told on Africa's terms with boldness, brilliance, and undeniable influence.
                            </p>
                        </div>
                    </div>

                    <h3 className="text-center text-xl font-bold text-white mb-10">Our Core Values</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {[
                            { title: "Authenticity", desc: "We tell real stories. We don't chase trends we set them by staying true to the cultures, communities, and contexts we serve." },
                            { title: "Excellence", desc: "We hold every piece of content, every campaign, and every strategy to the highest standard. Good enough is never good enough for us." },
                            { title: "Impact", desc: "We measure success not just in views or clicks, but in the real-world change our work creates for brands, communities, and conversations." },
                            { title: "Innovation", desc: "Africa is dynamic. So are we. We constantly evolve our approach, combining technology, creativity, and strategy to stay ahead of the curve." },
                            { title: "Integrity", desc: "We mean what we say and deliver what we promise. Our clients and partners trust us because we've earned it." }
                        ].map((val, i) => (
                            <div key={i} className="bg-brand-vibrant-blue/20 border border-brand-vibrant-blue/30 p-6 md:p-8 rounded-xl hover:bg-brand-vibrant-blue/40 transition-colors">
                                <div className="w-8 h-8 bg-brand-yellow text-brand-dark-navy flex items-center justify-center rounded-full font-bold mb-5">{i + 1}</div>
                                <h4 className="font-bold text-white mb-3 text-lg">{val.title}</h4>
                                <p className="font-prompt font-light text-[12px] md:text-[13px] text-white/60 leading-relaxed">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CLOSING CTA BANNER --- */}
            <section className="bg-brand-yellow py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-16 text-center">
                <div className="max-w-[800px] mx-auto">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark-navy mb-6 leading-tight">
                        GTVAFRIK isn't just a media company. We're a movement building the infrastructure for how Africa communicates with itself and the world.
                    </h2>
                    <p className="font-prompt text-[14px] md:text-[16px] text-brand-dark-navy/80 mb-8 font-medium">
                        Ready to be part of it? Let's Work Together
                    </p>
                    <button className="bg-brand-dark-navy text-white px-8 py-3.5 rounded-md font-bold text-[10px] uppercase tracking-widest shadow-lg hover:bg-opacity-90 transition-all">
                        Contact Us
                    </button>
                </div>
            </section>

            {/* --- PARTNERS STRIP --- */}
            <section className="bg-white py-8 md:py-14 border-b border-gray-50">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 max-w-[1200px] mx-auto">
                    <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-dark-navy/20 font-prompt text-center md:text-left">Partners & Clients</p>
                </div>
            </section>

            <Footer />
        </div>
    );
}