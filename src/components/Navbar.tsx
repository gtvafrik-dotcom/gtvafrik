"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ activePage }: { activePage?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    "Home", "MAMMA Framework", "About Us", "Content", "Services", "Media Hub", "Careers", "Blog", "Contact"
  ];

  return (
    <>
      <nav className="flex justify-between items-center px-6 md:px-16 py-5 md:py-6 bg-brand-dark-navy sticky top-0 z-50">
        <Link href="/">
          <Image src="/logo.png" alt="GTV AFRIK" width={85} height={28} className="object-contain md:w-[90px]" />
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-5 items-center">
          {navItems.map((item) => (
            <Link 
              key={item} 
              href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
              className={`text-[9px] font-bold uppercase tracking-[0.15em] transition-colors ${
                activePage === item ? "text-brand-yellow" : "text-white/60 hover:text-white"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Desktop Button */}
        <button className="hidden md:block bg-brand-yellow text-brand-dark-navy px-5 py-2 rounded-sm font-bold text-[8.5px] uppercase tracking-widest hover:brightness-110 transition-all">
          Book an Appointment
        </button>

        {/* Mobile Hamburger */}
        <button onClick={() => setIsOpen(true)} className="lg:hidden flex flex-col gap-1.5 z-50">
          <div className="w-6 h-[2px] bg-white"></div>
          <div className="w-6 h-[2px] bg-white"></div>
          <div className="w-6 h-[2px] bg-white"></div>
        </button>
      </nav>

      {/* Fullscreen Mobile Menu */}
      <div className={`fixed inset-0 bg-brand-dark-navy z-[100] flex flex-col p-8 transition-all duration-500 ${
        isOpen ? 'translate-y-0 opacity-100 visible pointer-events-auto' : '-translate-y-full opacity-0 invisible pointer-events-none'
      }`}>
        <div className="flex justify-between items-center mb-16">
          <Image src="/logo.png" alt="GTV AFRIK" width={90} height={30} />
          <button onClick={() => setIsOpen(false)} className="text-white text-3xl font-light">✕</button>
        </div>
        
        <div className="flex flex-col gap-8">
          {navItems.map((item) => (
            <Link 
              key={item} 
              onClick={() => setIsOpen(false)}
              href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
              className={`text-[22px] font-bold uppercase tracking-widest ${
                activePage === item ? "text-brand-yellow" : "text-white"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>

        <button className="mt-auto bg-brand-yellow text-brand-dark-navy w-full py-4 rounded-sm font-bold text-[12px] uppercase tracking-[0.2em] hover:brightness-110 transition-all">
          Book an Appointment
        </button>
      </div>

    </>
  );
}