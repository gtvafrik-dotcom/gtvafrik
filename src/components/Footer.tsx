import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    // Cleaned up footer sections to match the actual GTV Afrik site structure
    const footerLinks = {
        SERVICES: ["Media", "Advocacy", "Marketing", "Mobility", "Advertising"],
        CONTENT: ["Blog", "Latest Shows", "Documentaries", "Podcasts", "Short Films"],
        COMPANY: ["About Us", "Our Impact", "Partners & Clients", "Careers"],
        CONTACT: ["Advertise with us", "Partner with us", "Book an Appointment", "Contact Support"],
    };

    // Mapped social links with exact URLs and proper SVG icons
    const socialLinks = [
        {
            name: "TikTok",
            url: "https://www.tiktok.com/@gtvafrik?_r=1&_t=ZS-972d6J2vZdV",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.22-1.13 4.33-2.9 5.6-1.73 1.25-4.05 1.58-6.05 1.05-2.02-.53-3.69-2.01-4.48-3.95-.79-1.91-.6-4.14.47-5.88 1.05-1.74 2.91-2.92 4.96-3.13v4.06c-1.28.14-2.48 1.03-2.93 2.24-.46 1.25-.19 2.71.68 3.69.87.97 2.3 1.34 3.52 1 .98-.28 1.83-1.07 2.1-2.07.13-.48.16-1 .15-1.5-.02-5.74-.01-11.49-.01-17.23z" />
                </svg>
            )
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/gtv_afrik?igsh=MTRmeTR0N2Zwb2ZscQ%3D%3D&utm_source=qr",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
            )
        },
        {
            name: "X",
            url: "https://x.com/gtvafrik?s=11",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
            )
        },
        {
            name: "Facebook",
            url: "https://www.facebook.com/share/18vyXcgHny/?mibextid=wwXIfr",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                </svg>
            )
        },
        {
            name: "YouTube",
            url: "https://youtube.com/@gtvafrik?si=TqYJXgSRdZdx9h2M",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.015 3.015 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.498 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            )
        }
    ];

    return (
        <footer className="bg-brand-dark-navy text-white border-t-[3px] border-white px-6 md:px-16 pt-16 md:pt-24 pb-12">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 mb-16 md:mb-20">
                <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <Image src="/logo.png" alt="GTV AFRIK" width={100} height={32} className="mb-6 opacity-90 md:w-[110px]" />
                    <p className="text-[11px] md:text-[12px] italic text-white/60 font-prompt font-light tracking-wide mb-8">
                        Accelerating African Narrative
                    </p>
                    <div className="flex gap-2.5">
                        {socialLinks.map((social) => (
                            <a 
                                key={social.name} 
                                href={social.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label={social.name}
                                className="w-8 h-8 md:w-9 md:h-9 bg-white/10 rounded-md hover:bg-brand-yellow hover:text-brand-dark-navy transition-all cursor-pointer border border-white/5 flex items-center justify-center text-white/70"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-12 text-center sm:text-left">
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] mb-6 md:mb-8 text-white/90">{title}</h4>
                            <ul className="flex flex-col gap-4 md:gap-5">
                                {links.map((link) => (
                                    <li key={link}>
                                        <Link href="#" className="text-[10px] md:text-[11px] font-prompt font-medium text-white/40 hover:text-brand-yellow transition-colors duration-300">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-8 md:pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 text-[9px] md:text-[10px] font-prompt font-medium text-white/20 tracking-[0.2em] md:tracking-widest">
                <p className="order-2 md:order-1 text-center">2026 GTVAFRIK. ALL RIGHTS RESERVED</p>
                <div className="flex flex-wrap justify-center gap-6 md:gap-8 order-1 md:order-2">
                    <Link href="#" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
                    <Link href="#" className="hover:text-white transition-colors">TERMS OF USE</Link>
                    <Link href="#" className="hover:text-white transition-colors">COOKIE POLICY</Link>
                </div>
            </div>
        </footer>
    );
}