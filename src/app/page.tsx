import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

const SectionHeader = ({ title, light = false, viewAll = false, centered = false }: { title: string; light?: boolean; viewAll?: boolean; centered?: boolean }) => (
  <div className={`flex items-center justify-between mb-8 ${centered ? 'justify-center' : ''}`}>
    <div className="flex items-center gap-2">
      {!centered && <div className="w-[2px] h-3.5 bg-brand-yellow"></div>}
      <h2 className={`font-bold uppercase tracking-[0.15em] text-[9.5px] ${light ? 'text-white' : 'text-brand-dark-navy'}`}>{title}</h2>
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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-prompt overflow-x-hidden selection:bg-brand-yellow selection:text-brand-dark-navy">
      <Navbar activePage="Home" />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[85vh] flex flex-col md:flex-row items-center overflow-hidden bg-brand-dark-navy md:bg-transparent">
        <div
          className="absolute inset-0 bg-brand-dark-navy hidden md:block"
          style={{ clipPath: 'polygon(0 0, 58% 0, 48% 100%, 0% 100%)' }}
        ></div>
        <div className="absolute inset-0 bg-brand-dark-navy md:hidden"></div>

        <div className="container mx-auto px-6 md:px-16 relative z-10 grid grid-cols-1 md:grid-cols-12 items-center py-16 md:py-0">
          <div className="md:col-span-6 text-white text-center md:text-left">
            <div className="inline-block bg-brand-yellow text-brand-dark-navy px-3 py-1 rounded-sm text-[8.5px] font-bold uppercase tracking-[0.2em] mb-8">
              Accelerating African Narrative
            </div>

            <h1 className="text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-8">
              We Shape How Africa Is <br />
              <span className="text-brand-yellow">Seen, Heard</span> and Known.
            </h1>

            <p className="font-prompt font-light text-[14px] text-white/70 max-w-md mx-auto md:mx-0 mb-10 leading-relaxed">
              GTVAFRIK is a Pan-African media and communications company built to shape narratives, amplify voices, and We position brands where it matters most, deeply locally rooted, yet globally positioned.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center md:justify-start">
              <button className="bg-brand-yellow text-brand-dark-navy px-8 py-2.5 rounded-md font-bold text-[9px] uppercase tracking-widest shadow-lg transition-transform active:scale-95">
                Work with us
              </button>
              <button className="border border-white/20 text-white px-8 py-2.5 rounded-md font-bold text-[9px] uppercase tracking-widest hover:bg-white/5 transition-colors">
                Explore our work
              </button>
            </div>

            <div className="flex gap-8 md:gap-12 justify-center md:justify-start">
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-brand-yellow mb-1 tracking-tight">X+</h4>
                <p className="text-[8px] font-prompt font-medium uppercase tracking-widest text-white/40">Years of Impact</p>
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-brand-yellow mb-1 tracking-tight">XX+</h4>
                <p className="text-[8px] font-prompt font-medium uppercase tracking-widest text-white/40">Clients</p>
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-brand-yellow mb-1 tracking-tight">XX+</h4>
                <p className="text-[8px] font-prompt font-medium uppercase tracking-widest text-white/40">Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PARTNERS LOGO STRIP --- */}
      <section className="bg-white py-12 md:py-16 border-b border-gray-50 text-center md:text-left">
        <div className="px-6 md:px-16">
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-dark-navy/30 font-prompt">PARTNERS & CLIENTS</p>
        </div>
      </section>

      {/* --- WHAT WE DO --- */}
      <section className="bg-brand-light-blue py-16 md:py-32">
        <div className="container mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 order-2 md:order-1">
            <SectionHeader title="What we do" />
            <div className="bg-brand-yellow text-brand-dark-navy px-3 py-1 rounded-md inline-block text-[8px] font-bold uppercase tracking-widest mb-6">
              Media
            </div>
            <h2 className="text-[28px] md:text-[32px] font-bold text-brand-dark-navy leading-[1.1] mb-8">
              Where African Stories Meet <br className="hidden md:block" /> World-Class Production.
            </h2>
            <p className="font-prompt font-light text-[14px] text-brand-dark-navy/60 leading-relaxed mb-10 max-w-md">
              From documentaries to digital content and commercial productions, we craft media that doesn't just inform, it resonates. We tell African stories with the depth, nuance, and artistry they deserve.
            </p>
            <div className="flex gap-4">
              <button className="bg-brand-yellow text-brand-dark-navy px-8 py-2.5 rounded-md font-bold text-[9px] uppercase tracking-widest shadow-md hover:brightness-110 transition-all">
                See more
              </button>
              <button className="border border-brand-dark-navy/10 text-brand-dark-navy px-8 py-2.5 rounded-md font-bold text-[9px] uppercase tracking-widest hover:bg-brand-dark-navy hover:text-white transition-all">
                Contact us
              </button>
            </div>
          </div>
          {/* Media area: Visible ONLY on mobile */}
          <div className="w-full h-64 bg-brand-vibrant-blue relative rounded-2xl overflow-hidden md:hidden order-1">
            <div className="absolute top-4 left-4 bg-brand-yellow text-brand-dark-navy px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest">Media</div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              <div className="w-4 h-1.5 bg-brand-yellow rounded-full"></div>
              {[1, 2, 3, 4].map(i => <div key={i} className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>)}
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURED CONTENT --- */}
      <section className="py-20 md:py-32 px-6 md:px-16 bg-white">
        <SectionHeader title="Featured Content" viewAll />
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar mb-10 pb-2">
          {["All", "Latest Shows", "Documentaries", "Podcasts", "Short Films"].map((tab) => (
            <button key={tab} className={`px-5 py-2 rounded-full border text-[9px] font-bold uppercase tracking-widest whitespace-nowrap transition-all ${tab === 'All' ? 'bg-brand-yellow text-brand-dark-navy border-brand-yellow' : 'border-gray-100 text-gray-400 hover:border-brand-dark-navy'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { tag: "Featured · Documentary", title: "Rethinking Travel in a Warming World — Africa's Climate Response" },
            { tag: "Podcast", title: "Chief Edward David Onoja: Reflecting on Leadership, Tinubu's Vision, and Nigeria's Future" },
            { tag: "Short Film", title: "They Didn't Steal Slaves — They Stole Kings" }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <div className="aspect-video bg-brand-vibrant-blue relative">
                <PlayButton />
              </div>
              <div className="p-8">
                <p className="text-[9px] font-prompt font-bold text-brand-dark-navy/40 uppercase tracking-widest mb-3">{item.tag}</p>
                <h3 className="text-[15px] font-bold text-brand-dark-navy leading-snug mb-4">{item.title}</h3>
                <p className="text-[8px] font-prompt text-gray-300 uppercase tracking-widest font-medium">2 days ago</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- GTV IMPACT --- */}
      <section className="bg-brand-dark-navy py-20 md:py-32 px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 bg-brand-vibrant-blue aspect-video rounded-2xl relative shadow-2xl overflow-hidden group">
            <PlayButton />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="lg:col-span-6">
            <SectionHeader title="GTV Impact" light />
            <h2 className="text-[28px] md:text-[36px] font-bold text-white leading-tight mb-12">
              Measuring Our <span className="text-brand-yellow">Impact</span> Across <br className="hidden md:block" /> the Continent.
            </h2>
            <div className="grid grid-cols-3 gap-2.5 md:gap-4">
              {[
                { val: "50k+", sub: "Youths reached" },
                { val: "120+", sub: "Project Delivered" },
                { val: "18+", sub: "Countries Reached" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-4 md:p-6 rounded-xl hover:bg-white/10 transition-colors flex flex-col justify-center items-center text-center">
                  <h3 className="text-lg md:text-2xl font-bold text-brand-yellow mb-1 md:mb-2">{stat.val}</h3>
                  <p className="text-[7px] md:text-[9px] font-prompt font-medium uppercase tracking-widest text-white/30 leading-tight">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="bg-brand-vibrant-blue py-20 md:py-32 px-6 md:px-16  text-white border-t-[3px] border-white pt-16 md:pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 text-center md:text-left">
            <SectionHeader title="Ready to work together?" light centered={false} />
            <h2 className="text-[36px] md:text-[44px] font-bold text-white leading-[1.05] mb-8">
              Let's Shape Africa's <br /> Story Together.
            </h2>
            <p className="font-prompt font-light text-[15px] text-white/70 max-w-md mx-auto md:mx-0 leading-relaxed mb-12">
              Whether you're a multinational, a government agency, or an African brand — GTV Afrik gives your message the reach, depth, and credibility it deserves.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4">
            {[
              { label: "ADVERTISE WITH GTV AFRIK", sub: "Reach Africa's decision makers & global diaspora" },
              { label: "PARTNER WITH US", sub: "Advocacy, Campaigns & Media Production" },
              { label: "BOOK AN APPOINTMENT", sub: "Talk to our team about your goals" }
            ].map((link, i) => (
              <div 
                key={i} 
                data-cal-link={link.label === "BOOK AN APPOINTMENT" ? "gtv-afrik/30min" : undefined}
                data-cal-config={link.label === "BOOK AN APPOINTMENT" ? '{"layout":"month_view"}' : undefined}
                className="bg-white/10 border border-white/5 p-5 md:p-8 flex items-center justify-between group cursor-pointer hover:bg-white/20 transition-all rounded-xl"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-12 md:w-16 h-10 md:h-12 bg-gray-300/20 rounded-md shrink-0"></div>
                  <div>
                    <h4 className="text-[10px] md:text-[11px] font-bold text-white uppercase tracking-widest">{link.label}</h4>
                    <p className="text-[9px] md:text-[10px] font-prompt text-white/50 mt-1.5 leading-relaxed">{link.sub}</p>
                  </div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform opacity-30 shrink-0">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}