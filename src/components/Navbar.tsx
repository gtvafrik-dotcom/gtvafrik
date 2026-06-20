"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCalApi } from "@calcom/embed-react";

export default function Navbar({ activePage }: { activePage?: string }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", {
                theme: "dark",
                styles: { branding: { brandColor: "#ffcc00" } },
                hideEventTypeDetails: false,
                layout: "month_view"
            });
        })();
    }, []);

    // Added the dropdown array and updated the main href to anchor to the homepage pillars
    const navItems = [
        { name: "Home", href: "/" },
        { 
            name: "What we do", 
            href: "/#pillars", 
            hasDropdown: true,
            dropdown: [
                { name: "Media", href: "/#media" },
                { name: "Advocacy", href: "/#advocacy" },
                { name: "Marketing", href: "/#marketing" },
                { name: "Mobility", href: "/#mobility" },
                { name: "Advertising", href: "/#advertising" }
            ]
        },
        { name: "About", href: "/about-us" },
        { name: "Blog", href: "/blog", isYellow: false },
        { name: "Contact us", href: "/contact" }
    ];

    return (
        <>
            <nav className="flex justify-between items-center px-6 md:px-16 py-5 md:py-6 bg-brand-dark-navy sticky top-0 z-50 border-b border-white/5">
                <Link href="/">
                    {/* Fixed GTVAFRIK spelling */}
                    <Image src="/logo.png" alt="GTVAFRIK" width={85} height={28} className="object-contain md:w-[90px]" />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex gap-10 items-center">
                    {navItems.map((item) => (
                        <div key={item.name} className={item.hasDropdown ? "relative group py-2" : ""}>
                            <Link
                                href={item.href}
                                className={`text-[12px] font-medium transition-colors font-prompt flex items-center gap-1.5 ${item.isYellow ? "text-brand-yellow" :
                                    activePage === item.name ? "text-brand-yellow" : "text-white hover:text-brand-yellow"
                                    }`}
                            >
                                {item.name}
                                {item.hasDropdown && (
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 opacity-60 group-hover:rotate-180 transition-transform duration-300">
                                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </Link>

                            {/* Dropdown Menu for Desktop */}
                            {item.hasDropdown && item.dropdown && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white text-brand-dark-navy shadow-xl rounded-md opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 overflow-hidden flex flex-col z-50 border border-gray-100">
                                    {item.dropdown.map(subItem => (
                                        <Link 
                                            key={subItem.name} 
                                            href={subItem.href} 
                                            className="px-5 py-3 text-[12px] font-prompt font-medium hover:bg-gray-50 hover:text-brand-vibrant-blue transition-colors border-b border-gray-50 last:border-0"
                                        >
                                            {subItem.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Desktop Button */}
                <button
                    data-cal-link="gtv-afrik-bsbmax/30min"
                    data-cal-config='{"layout":"month_view"}'
                    className="hidden md:block bg-brand-yellow text-brand-dark-navy px-6 py-2.5 rounded-lg font-bold text-[11px] hover:brightness-110 transition-all font-prompt"
                >
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
            <div className={`fixed inset-0 bg-brand-dark-navy z-[100] flex flex-col p-8 transition-all duration-500 overflow-y-auto ${isOpen ? 'translate-y-0 opacity-100 visible pointer-events-auto' : '-translate-y-full opacity-0 invisible pointer-events-none'
                }`}>
                <div className="flex justify-between items-center mb-12 shrink-0">
                    {/* Fixed GTVAFRIK spelling */}
                    <Image src="/logo.png" alt="GTVAFRIK" width={90} height={30} />
                    <button onClick={() => setIsOpen(false)} className="text-white text-3xl font-light">✕</button>
                </div>

                <div className="flex flex-col gap-8 mb-8">
                    {navItems.map((item) => (
                        <div key={item.name} className="flex flex-col gap-4">
                            <Link
                                onClick={() => !item.hasDropdown && setIsOpen(false)}
                                href={item.href}
                                className={`text-[24px] font-bold font-prompt flex items-center justify-between ${item.isYellow ? "text-brand-yellow" :
                                    activePage === item.name ? "text-brand-yellow" : "text-white"
                                    }`}
                            >
                                {item.name}
                            </Link>

                            {/* Dropdown Menu for Mobile */}
                            {item.hasDropdown && item.dropdown && (
                                <div className="flex flex-col gap-4 pl-4 border-l-2 border-white/10 mt-2">
                                    {item.dropdown.map(subItem => (
                                        <Link 
                                            key={subItem.name} 
                                            href={subItem.href} 
                                            onClick={() => setIsOpen(false)} 
                                            className="text-[18px] font-prompt text-white/70 hover:text-brand-yellow transition-colors"
                                        >
                                            {subItem.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    data-cal-link="gtv-afrik-bsbmax/30min"
                    data-cal-config='{"layout":"month_view"}'
                    className="mt-auto shrink-0 bg-brand-yellow text-brand-dark-navy w-full py-4 rounded-lg font-bold text-[14px] hover:brightness-110 transition-all font-prompt"
                >
                    Book an Appointment
                </button>
            </div>
        </>
    );
}
