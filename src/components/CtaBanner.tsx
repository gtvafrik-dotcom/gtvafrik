"use client";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import Link from "next/link";

export default function CtaBanner() {
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
    return (
        <section className="bg-brand-vibrant-blue text-white px-6 md:px-16 py-16 md:py-20 flex flex-col lg:flex-row items-center justify-between font-prompt gap-12 lg:gap-8">
            <div className="flex flex-col gap-3 max-w-[340px] text-center lg:text-left">
                <h2 className="text-[24px] md:text-[26px] font-bold uppercase tracking-tight leading-tight">Advertise with GTV AFRIK</h2>
                <p className="text-[9.5px] font-bold text-white/50 uppercase tracking-[0.25em] leading-relaxed">Reach Africa's decision makers & global diaspora</p>
            </div>

            <div className="hidden lg:block h-16 w-[1px] bg-white/10 mx-4"></div>

            <div className="flex flex-col gap-3 flex-1 max-w-[340px] text-center lg:text-left">
                <h2 className="text-[24px] md:text-[26px] font-bold uppercase tracking-tight leading-tight">Partner with us</h2>
                <p className="text-[9.5px] font-bold text-white/50 uppercase tracking-[0.25em] leading-relaxed">Advocacy, Campaigns & Media Production</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center w-full lg:w-auto">
                <button className="w-full sm:w-auto border border-white/20 text-white px-8 py-3.5 rounded-md font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all whitespace-nowrap">
                    Contact us
                </button>
                <button
                    data-cal-link="gtv-afrik-bsbmax/30min"
                    data-cal-config='{"layout":"month_view"}'
                    className="w-full sm:w-auto bg-brand-yellow text-brand-dark-navy px-8 py-3.5 rounded-md font-bold text-[10px] uppercase tracking-widest shadow-xl hover:brightness-110 whitespace-nowrap transition-all active:scale-95"
                >
                    Book an Appointment
                </button>
            </div>
        </section>
    );
}