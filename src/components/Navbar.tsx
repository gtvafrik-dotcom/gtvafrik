"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ activePage }: { activePage?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const navItems = [
        { name: "Home", href: "/" },
        { name: "What we do", href: "/services", hasDropdown: true },
        { name: "About", href: "/about-us" },
        { name: "Blog", href: "/blog", isYellow: false },
        { name: "Contact us", href: "/contact" }
    ];

    return (
        <>
            <nav className="flex justify-between items-center px-6 md:px-16 py-5 md:py-6 bg-brand-dark-navy sticky top-0 z-50 border-b border-white/5">
                <Link href="/">
                    <Image src="/logo.png" alt="GTV AFRIK" width={85} height={28} className="object-contain md:w-[90px]" />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex gap-10 items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`text-[12px] font-medium transition-colors font-prompt flex items-center gap-1.5 ${item.isYellow ? "text-brand-yellow" :
                                    activePage === item.name ? "text-brand-yellow" : "text-white hover:text-brand-yellow"
                                }`}
                        >
                            {item.name}
                            {item.hasDropdown && (
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 opacity-60">
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </Link>
                    ))}
                </div>

                {/* Desktop Button */}
                <button className="hidden md:block bg-brand-yellow text-brand-dark-navy px-6 py-2.5 rounded-lg font-bold text-[11px] hover:brightness-110 transition-all font-prompt">
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
            <div className={`fixed inset-0 bg-brand-dark-navy z-[100] flex flex-col p-8 transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100 visible pointer-events-auto' : '-translate-y-full opacity-0 invisible pointer-events-none'
                }`}>
                <div className="flex justify-between items-center mb-16">
                    <Image src="/logo.png" alt="GTV AFRIK" width={90} height={30} />
                    <button onClick={() => setIsOpen(false)} className="text-white text-3xl font-light">✕</button>
                </div>

                <div className="flex flex-col gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            onClick={() => setIsOpen(false)}
                            href={item.href}
                            className={`text-[24px] font-bold font-prompt ${item.isYellow ? "text-brand-yellow" :
                                    activePage === item.name ? "text-brand-yellow" : "text-white"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <button className="mt-auto bg-brand-yellow text-brand-dark-navy w-full py-4 rounded-lg font-bold text-[14px] hover:brightness-110 transition-all font-prompt">
                    Book an Appointment
                </button>
            </div>
        </>
    );
}
