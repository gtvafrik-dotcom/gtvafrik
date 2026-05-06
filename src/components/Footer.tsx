import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const footerLinks = {
        SERVICES: ["Advocacy", "Media", "Marketing", "Mobility", "Advertising"],
        CONTENT: ["Advocacy", "Media", "Marketing", "Mobility", "Advertising"],
        COMPANY: ["Advocacy", "Media", "Marketing", "Mobility", "Advertising"],
        CONTACT: ["Advocacy", "Media", "Marketing", "Mobility", "Advertising"],
    };

    return (
        <footer className="bg-brand-dark-navy text-white px-6 md:px-16 pt-16 md:pt-24 pb-12">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 mb-16 md:mb-20">
                <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <Image src="/logo.png" alt="GTV AFRIK" width={100} height={32} className="mb-6 opacity-90 md:w-[110px]" />
                    <p className="text-[11px] md:text-[12px] italic text-white/60 font-prompt font-light tracking-wide mb-8">
                        Accelerating African Narrative
                    </p>
                    <div className="flex gap-2.5">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-7 h-7 md:w-8 md:h-8 bg-white/10 rounded-md hover:bg-white/20 transition-all cursor-pointer border border-white/5 flex items-center justify-center">
                                <div className="w-3 h-3 bg-white/30 rounded-[1px]"></div>
                            </div>
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