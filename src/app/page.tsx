"use client";

import React, { useState, useEffect } from "react";
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
      <Link href="/blog" className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${light ? 'text-brand-yellow' : 'text-brand-vibrant-blue'}`}>
        View all <span className="text-lg leading-none">→</span>
      </Link>
    )}
  </div>
);

const PlayButton = ({ small = false }: { small?: boolean }) => (
  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
    <div className={`${small ? 'w-10 h-10' : 'w-12 h-12'} bg-brand-yellow rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer`}>
      <div className={`w-0 h-0 border-t-[${small ? '6px' : '7px'}] border-t-transparent border-l-[${small ? '11px' : '13px'}] border-l-brand-dark-navy border-b-[${small ? '6px' : '7px'}] border-b-transparent ml-1`}></div>
    </div>
  </div>
);

// --- DATA ARRAYS ---
const fivePillars = [
  { 
    num: "01", 
    title: "Media", 
    desc: "From documentaries to digital content and commercial productions we craft media that resonates and tells African stories with depth.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"></polygon>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
      </svg>
    )
  },
  { 
    num: "02", 
    title: "Advocacy", 
    desc: "Driving policy, social impact, and narrative change for governments, NGOs, and multilateral organisations across the continent.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l18-5v12L3 14v-3z"></path>
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
      </svg>
    )
  },
  { 
    num: "03", 
    title: "Marketing", 
    desc: "Strategic brand campaigns that connect multinationals with African audiences rooted in culture, driven by data.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
      </svg>
    )
  },
  { 
    num: "04", 
    title: "Mobility", 
    desc: "Connecting people, ideas, and opportunities across Africa enabling movement and access where it matters most.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
        <line x1="9" y1="3" x2="9" y2="21"></line>
        <line x1="15" y1="3" x2="15" y2="21"></line>
      </svg>
    )
  },
  { 
    num: "05", 
    title: "Advertising", 
    desc: "Targeted reach across GTVAFRIK's pan-African and diaspora audiences built for brands that want to be seen and remembered.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    )
  }
];

const partnerLogos = [
  "/iea.png",
  "/apc.jpeg",
  "/pdp.jpeg",
  "/ncdc.png",
  "/noa.jpeg",
  "/inec.png"
];

const featuredContent = [
  {
    tag: "Featured · Leadership",
    title: "Onoja (The Man): A Legacy of Service",
    desc: "Former Deputy Governor of Kogi State, Chief Edward David Onoja, shares insights into his tenure, President Bola Ahmed Tinubu’s transformative policies, and his post-office journey. With a career spanning banking, politics, and regional development, Onoja’s perspective bridges grassroots governance and national strategy.",
    image: "/onoja.jpg",
    date: "1 day ago"
  },
  {
    tag: "Environment · Climate",
    title: "Navigating Personal Choice and Systemic Change",
    desc: "Climate scientist Katharine Hayhoe understands the environmental cost of air travel intimately. Yet, living within systems built on fossil fuels, she navigates the tension between personal responsibility and systemic necessity, shifting focus from guilt to thoughtful action.",
    image: "/climate.jpg",
    date: "3 days ago"
  },
  {
    tag: "History · Heritage",
    title: "Slavery: The Descendants of Empires",
    desc: "They tell you your history began in chains. But that is a lie they fed you to keep you small. Long before the first ship, your blood built the world. You are the descendants of empires. The strength is not in your future. It is in your spine. Walk like you know it.",
    image: "/media.jpg",
    date: "1 week ago"
  }
];

// Added hrefs for the Contact pages
const ctaLinks = [
  { 
    label: "ADVERTISE WITH GTVAFRIK", 
    sub: "Reach Africa's decision makers & global diaspora",
    href: "/contact",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-yellow">
        <path d="M3 11l18-5v12L3 14v-3z"></path>
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
      </svg>
    )
  },
  { 
    label: "PARTNER WITH US", 
    sub: "Advocacy, Campaigns & Media Production",
    href: "/contact",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-yellow">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    )
  },
  { 
    label: "BOOK AN APPOINTMENT", 
    sub: "Talk to our team about your goals",
    href: "#", // Cal.com handles this
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-yellow">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    )
  }
];

export default function LandingPage() {
  // Added state for the Featured Content tabs
  const [activeContentTab, setActiveContentTab] = useState("All");
  const contentTabs = ["All", "Latest Shows", "Documentaries", "Podcasts", "Short Films"];

  return (
    <div className="min-h-screen bg-white font-prompt overflow-x-hidden selection:bg-brand-yellow selection:text-brand-dark-navy">
      
      {/* Custom Keyframes for Marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: scroll 30s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      <Navbar activePage="Home" />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[85vh] flex flex-col md:flex-row items-center overflow-hidden bg-brand-dark-navy md:bg-[#F8F9FA]">
        
        {/* Right Side Background Video Container restricted to 50% width */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-[50%] z-0 hidden md:block pointer-events-none">
          <video
            src="/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain object-right opacity-90"
            style={{ 
              maskImage: 'linear-gradient(to right, transparent 0%, black 15%)', 
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%)' 
            }}
          />
        </div>

        {/* Diagonal Navy Left Side - Extended to push safety zone left */}
        <div
          className="absolute inset-0 bg-brand-dark-navy hidden md:block z-0"
          style={{ clipPath: 'polygon(0 0, 60% 0, 48% 100%, 0% 100%)' }}
        ></div>
        <div className="absolute inset-0 bg-brand-dark-navy md:hidden z-0"></div>

        {/* Content - Added md:pr-12 to push text block safely to the left */}
        <div className="container mx-auto px-6 md:px-16 relative z-10 grid grid-cols-1 md:grid-cols-12 items-center py-16 md:py-0 min-h-[85vh]">
          <div className="md:col-span-7 lg:col-span-6 text-white text-center md:text-left md:pr-12">
            <div className="inline-block bg-brand-yellow text-brand-dark-navy px-3 py-1 rounded-sm text-[8.5px] font-bold uppercase tracking-[0.2em] mb-8">
              Accelerating African Narrative
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-tight mb-8">
              We Shape How Africa Is <br />
              <span className="text-brand-yellow">Seen, Heard</span> and Known.
            </h1>

            <p className="font-prompt font-light text-[14px] lg:text-[15px] text-white/70 max-w-lg mx-auto md:mx-0 mb-10 leading-relaxed">
              GTVAFRIK is a Pan-African media and communications company built to shape narratives, amplify voices, and position brands where it matters most, locally rooted, globally relevant.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center md:justify-start">
              <Link href="/contact" className="bg-brand-yellow text-brand-dark-navy px-8 py-2.5 rounded-md font-bold text-[9px] uppercase tracking-widest shadow-lg transition-transform active:scale-95 text-center">
                Work with us
              </Link>
              <Link href="/#pillars" className="border border-white/20 text-white px-8 py-2.5 rounded-md font-bold text-[9px] uppercase tracking-widest hover:bg-white/5 transition-colors text-center">
                Explore our work
              </Link>
            </div>

            <div className="flex gap-8 md:gap-12 justify-center md:justify-start">
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-brand-yellow mb-1 tracking-tight">7+</h4>
                <p className="text-[8px] font-prompt font-medium uppercase tracking-widest text-white/40">Years of Impact</p>
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-brand-yellow mb-1 tracking-tight">100+</h4>
                <p className="text-[8px] font-prompt font-medium uppercase tracking-widest text-white/40">Clients</p>
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-brand-yellow mb-1 tracking-tight">100+</h4>
                <p className="text-[8px] font-prompt font-medium uppercase tracking-widest text-white/40">Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PARTNERS LOGO STRIP (INFINITE MARQUEE) --- */}
      <section className="bg-white py-12 md:py-16 border-b border-gray-50 overflow-hidden">
        <div className="px-6 md:px-16 max-w-[1400px] mx-auto mb-8">
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-dark-navy/30 font-prompt text-center md:text-left">PARTNERS & CLIENTS</p>
        </div>
        
        {/* Marquee Wrapper */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          <div className="animate-marquee gap-12 md:gap-24 px-6 md:px-12 items-center">
            {[...partnerLogos, ...partnerLogos].map((logo, index) => (
              <div key={index} className="relative w-24 md:w-32 h-16 shrink-0 flex items-center justify-center">
                <Image 
                  src={logo} 
                  alt={`Partner logo ${index}`} 
                  fill 
                  className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHAT WE DO (5 PILLARS LAYOUT WITH ICONS) --- */}
      <section id="pillars" className="bg-white py-16 md:py-32 scroll-mt-24">
        <div className="container mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 lg:mb-16 gap-6">
            <div>
              <SectionHeader title="WHAT WE DO" />
              <h2 className="text-[32px] md:text-[40px] font-bold text-brand-dark-navy leading-[1.1]">
                Five Pillars <br className="hidden md:block" /> One <span className="text-brand-yellow">African Mission</span>
              </h2>
            </div>
            <p className="max-w-xs text-[13px] font-prompt text-brand-dark-navy/60 leading-relaxed pb-2 hidden md:block">
              From pan-African advocacy to world-class media production, every service we offer is built to amplify African voices and position brands with purpose.
            </p>
          </div>

          {/* 5 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {fivePillars.map((pillar) => (
              <div 
                key={pillar.num} 
                id={pillar.title.toLowerCase()}
                className="bg-[#F8F9FA] p-6 lg:p-8 flex flex-col justify-between h-[300px] lg:h-[420px] group hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 relative overflow-hidden rounded-sm scroll-mt-32"
              >
                <div>
                  {/* Icon Container */}
                  <div className="w-10 h-10 bg-brand-yellow/30 text-brand-dark-navy rounded-md mb-6 flex items-center justify-center transition-transform group-hover:scale-110">
                    {pillar.icon}
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-brand-dark-navy mb-3 lg:mb-4">{pillar.title}</h3>
                  <p className="text-[12px] lg:text-[13px] font-prompt text-brand-dark-navy/60 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-brand-dark-navy group-hover:translate-x-2 transition-transform mb-2">→</span>
                  <span className="text-6xl lg:text-7xl font-bold text-gray-200/50 font-prompt italic tracking-tighter group-hover:text-brand-yellow/30 transition-colors">
                    {pillar.num}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED CONTENT --- */}
      <section className="py-20 md:py-32 px-6 md:px-16 bg-[#F8F9FA]">
        <SectionHeader title="Featured Content" viewAll />
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar mb-10 pb-2">
          {contentTabs.map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveContentTab(tab)}
              className={`px-5 py-2 rounded-full border text-[9px] font-bold uppercase tracking-widest whitespace-nowrap transition-all ${
                activeContentTab === tab 
                  ? 'bg-brand-yellow text-brand-dark-navy border-brand-yellow' 
                  : 'border-gray-200 text-gray-400 hover:border-brand-dark-navy'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredContent.map((item, i) => (
            <Link href="/blog" key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col cursor-pointer">
              <div className="aspect-video bg-brand-dark-navy relative overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <PlayButton />
                <div className="absolute inset-0 bg-brand-dark-navy/10 group-hover:bg-transparent transition-colors z-0"></div>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <p className="text-[9px] font-prompt font-bold text-brand-dark-navy/40 uppercase tracking-widest mb-3">{item.tag}</p>
                <h3 className="text-[15px] font-bold text-brand-dark-navy leading-snug mb-3">{item.title}</h3>
                <p className="text-[12px] font-prompt text-brand-dark-navy/60 line-clamp-3 mb-6 leading-relaxed flex-grow">{item.desc}</p>
                <p className="text-[8px] font-prompt text-gray-300 uppercase tracking-widest font-medium mt-auto">{item.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- GTV IMPACT --- */}
      <section className="bg-brand-dark-navy py-20 md:py-32 px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 bg-brand-vibrant-blue aspect-video rounded-2xl relative shadow-2xl overflow-hidden group">
            
            <Image 
              src="/impact.jpg" 
              alt="Measuring Our Impact" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            
            <div className="absolute inset-0 bg-brand-dark-navy/40 transition-colors z-0"></div>
            <PlayButton />
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
      <section className="bg-brand-vibrant-blue py-20 md:py-32 px-6 md:px-16 text-white border-t-[3px] border-white pt-16 md:pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 text-center md:text-left">
            <SectionHeader title="Ready to work together?" light centered={false} />
            <h2 className="text-[36px] md:text-[44px] font-bold text-white leading-[1.05] mb-8">
              Let's Shape Africa's <br /> Story Together.
            </h2>
            <p className="font-prompt font-light text-[15px] text-white/70 max-w-md mx-auto md:mx-0 leading-relaxed mb-12">
              Whether you're a multinational, a government agency, or an African brand — GTVAFRIK gives your message the reach, depth, and credibility it deserves.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Functional CTA Block Links */}
            {ctaLinks.map((link, i) => {
              const isCal = link.label === "BOOK AN APPOINTMENT";
              // If it's the calendar popup, render a div. If it's a contact link, render a Next.js Link.
              const Wrapper = isCal ? "div" : Link;
              
              return (
                <Wrapper 
                  key={i} 
                  href={!isCal ? link.href : ""}
                  data-cal-link={isCal ? "gtv-afrik-bsbmax/30min" : undefined}
                  data-cal-config={isCal ? '{"layout":"month_view"}' : undefined}
                  className="bg-white/10 border border-white/5 p-5 md:p-8 flex items-center justify-between group cursor-pointer hover:bg-white/20 transition-all rounded-xl"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-12 md:w-16 h-10 md:h-12 bg-white/5 border border-white/10 rounded-md shrink-0 flex items-center justify-center">
                      {link.icon}
                    </div>
                    <div>
                      <h4 className="text-[10px] md:text-[11px] font-bold text-white uppercase tracking-widest">{link.label}</h4>
                      <p className="text-[9px] md:text-[10px] font-prompt text-white/50 mt-1.5 leading-relaxed">{link.sub}</p>
                    </div>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform opacity-30 shrink-0">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
