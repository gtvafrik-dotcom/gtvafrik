'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaBanner from "@/components/CtaBanner";
import Image from "next/image";
import { useState } from "react";

const YellowIcon = ({ type }: { type: 'mail' | 'phone' | 'pin' }) => (
    <div className="w-8 h-8 rounded-lg border border-brand-yellow flex items-center justify-center bg-brand-yellow/5">
        {type === 'mail' && (
            <svg width="14" height="11" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L10 8L19 1M1 15H19V1H1V15Z" stroke="#FFC700" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )}
        {type === 'phone' && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#FFC700" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )}
        {type === 'pin' && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#FFC700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="3" stroke="#FFC700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )}
    </div>
);

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setSubmitStatus('success');
            setFormData({
                firstName: '', lastName: '', email: '', phone: '',
                organization: '', subject: '', message: ''
            });
        } catch (error: any) {
            setSubmitStatus('error');
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="min-h-screen bg-brand-dark-navy font-gudlak selection:bg-brand-yellow selection:text-brand-dark-navy">
            <Navbar activePage="Contact" />

            {/* --- HERO SECTION --- */}
            <section className="px-4 sm:px-6 md:px-8 lg:px-16 pt-16 pb-12 md:pt-20 md:pb-16">
                <div className="max-w-[1200px] mx-auto">
                    {/* Breadcrumb */}
                    <div className="text-[10px] font-prompt font-medium tracking-widest mb-8 md:mb-10 flex gap-2">
                        <span className="text-white/40">Home</span>
                        <span className="text-brand-yellow">Contact</span>
                    </div>

                    {/* Main Content - Mobile Stacked */}
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 lg:gap-12">
                        <div className="max-w-xl lg:max-w-2xl">
                            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
                                Get in <span className="text-brand-yellow">Touch</span>
                            </h1>
                            <p className="text-[13px] text-white/70 font-prompt font-light leading-relaxed max-w-sm">
                                Whether you're looking to advertise, partner, pitch a story, or simply ask a question, we're here. Reach out and let's start a conversation.
                            </p>
                        </div>

                        {/* Contact Info - Mobile Stacked */}
                        <div className="flex flex-col gap-6 lg:gap-8">
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <YellowIcon type="mail" />
                                <span className="text-[13px] font-bold text-white font-prompt tracking-wide group-hover:text-brand-yellow transition-colors">info@gtvafrik.com</span>
                            </div>
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <YellowIcon type="mail" />
                                <span className="text-[13px] font-bold text-white font-prompt tracking-wide group-hover:text-brand-yellow transition-colors">info@gtvafrik.com</span>
                            </div>
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <YellowIcon type="phone" />
                                <span className="text-[13px] font-bold text-white font-prompt tracking-wide group-hover:text-brand-yellow transition-colors">+234 818 805 9300</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- THICK YELLOW SEPARATOR --- */}
            <div className="w-full h-[4px] bg-brand-yellow"></div>

            {/* --- FORM & SIDEBAR --- */}
            <section className="bg-white">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-16 md:py-28 max-w-[1300px] mx-auto">
                    {/* Mobile: Form First, Desktop: Side by Side */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        {/* Message Form */}
                        <div className="lg:col-span-7">
                            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark-navy mb-3">Send us a message</h2>
                            <p className="text-[12px] text-gray-500 font-prompt mb-8 md:mb-14 tracking-wide">Fill in the form below and our team will get back to you within 24 hours.</p>

                            {submitStatus === 'success' && (
                                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg font-prompt text-sm">
                                    Thank you for your message! We will get back to you soon.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-prompt text-sm">
                                    {errorMessage || 'Failed to send message. Please try again.'}
                                </div>
                            )}

                            <form className="space-y-6 md:space-y-10" onSubmit={handleSubmit}>
                                {/* First Row - Mobile Stacked, Desktop Side by Side */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark-navy mb-3 block font-prompt">First Name</label>
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Enter your First name" className="w-full bg-gray-50 border border-gray-100 rounded-sm px-4 py-4 text-[12px] text-brand-dark-navy placeholder:text-gray-300 focus:outline-none focus:border-brand-yellow font-prompt transition-all" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark-navy mb-3 block font-prompt">Last Name</label>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Enter your Last name" className="w-full bg-gray-50 border border-gray-100 rounded-sm px-4 py-4 text-[12px] text-brand-dark-navy placeholder:text-gray-300 focus:outline-none focus:border-brand-yellow font-prompt transition-all" />
                                    </div>
                                </div>

                                {/* Second Row - Mobile Stacked, Desktop Side by Side */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark-navy mb-3 block font-prompt">Email Address</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" className="w-full bg-gray-50 border border-gray-100 rounded-sm px-4 py-4 text-[12px] text-brand-dark-navy placeholder:text-gray-300 focus:outline-none focus:border-brand-yellow font-prompt transition-all" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark-navy mb-3 block font-prompt">Phone Number</label>
                                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+234 xxx xxx xxx" className="w-full bg-gray-50 border border-gray-100 rounded-sm px-4 py-4 text-[12px] text-brand-dark-navy placeholder:text-gray-300 focus:outline-none focus:border-brand-yellow font-prompt transition-all" />
                                    </div>
                                </div>

                                {/* Third Row - Mobile Stacked, Desktop Side by Side */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark-navy mb-3 block font-prompt">Organization (Optional)</label>
                                        <input type="text" name="organization" value={formData.organization} onChange={handleChange} placeholder="your organization" className="w-full bg-gray-50 border border-gray-100 rounded-sm px-4 py-4 text-[12px] text-brand-dark-navy placeholder:text-gray-300 focus:outline-none focus:border-brand-yellow font-prompt transition-all" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark-navy mb-3 block font-prompt">Subject</label>
                                        <div className="relative">
                                            <select name="subject" value={formData.subject} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-100 rounded-sm px-4 py-4 text-[12px] text-gray-400 focus:outline-none font-prompt appearance-none">
                                                <option value="">Select a subject</option>
                                                <option value="General Inquiry">General Inquiry</option>
                                                <option value="Advertisement">Advertisement</option>
                                                <option value="Partnership">Partnership</option>
                                                <option value="Pitch a Story">Pitch a Story</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Message Field - Full Width */}
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark-navy mb-3 block font-prompt">Your Message</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="Write your message here..." className="w-full bg-gray-50 border border-gray-100 rounded-sm px-4 py-5 text-[12px] text-brand-dark-navy placeholder:text-gray-300 focus:outline-none focus:border-brand-yellow font-prompt resize-none transition-all"></textarea>
                                </div>

                                {/* Submit Button */}
                                <button type="submit" disabled={isSubmitting} className="bg-brand-yellow text-brand-dark-navy px-10 py-3 rounded-md font-bold text-[10px] uppercase tracking-widest shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50">
                                    {isSubmitting ? 'SENDING...' : 'SUBMIT'}
                                </button>
                            </form>
                        </div>

                        {/* Right: Sidebar Cards */}
                        <div className="lg:col-span-5 space-y-8">
                            {/* Offices */}
                            <div className="bg-brand-dark-navy rounded-[1.5rem] p-6 md:p-10 shadow-2xl">
                                <div className="flex items-center gap-2 mb-8 md:mb-10">
                                    <div className="w-[3px] h-4 bg-brand-yellow"></div>
                                    <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] font-prompt">Our Offices</h4>
                                </div>

                                <div className="space-y-6 md:space-y-10">
                                    {[
                                        { region: "West Africa", addr: "Suite 38 (3rd Floor) Birgi Plaza.\nPlot 743 Justice John T. Tsoho Street.\nWuye District. Abuja, Nigeria." },
                                        { region: "South Africa", addr: "9 pelican street sandton.\nJohannesburg, South Africa." },
                                        { region: "North Africa", addr: "Road 198, degla maadi.\nbuilding 6. Cairo, Egypt" }
                                    ].map((office, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="shrink-0 mt-1">
                                                <YellowIcon type="pin" />
                                            </div>
                                            <div>
                                                <h5 className="text-[13px] font-bold text-brand-yellow uppercase tracking-widest mb-3">{office.region}</h5>
                                                <p className="text-[13px] text-white/90 font-prompt font-light leading-relaxed whitespace-pre-line">{office.addr}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Direct Contact */}
                            <div className="bg-brand-dark-navy rounded-[1.5rem] p-6 md:p-10 shadow-2xl">
                                <div className="flex items-center gap-2 mb-8 md:mb-10">
                                    <div className="w-[3px] h-4 bg-brand-yellow"></div>
                                    <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] font-prompt">Direct Contact</h4>
                                </div>

                                <div className="space-y-4 md:space-y-6">
                                    {[1, 2, 3].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 text-white font-prompt text-[13px] font-medium group cursor-pointer">
                                            <YellowIcon type={i === 2 ? 'phone' : 'mail'} />
                                            <span className="group-hover:text-brand-yellow transition-colors">
                                                {i === 2 ? '+234 818 805 9300' : 'info@gtvafrik.com'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CtaBanner />
            <Footer />
        </div>
    );
}