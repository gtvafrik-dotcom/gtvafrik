'use client';

import { useState, useEffect } from 'react';
import { User, Globe, Share2, Bell, Save, CheckCircle, AlertCircle, Eye, EyeOff, ChevronRight } from 'lucide-react';

type Tab = 'profile' | 'site' | 'social' | 'notifications';

interface Toast { type: 'success' | 'error'; message: string; }

function Toast({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-bold transition-all
      ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
      {toast.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      {toast.message}
    </div>
  );
}

function SectionCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
      {title && <h3 className="text-base font-bold text-[#2B3674] mb-5">{title}</h3>}
      {children}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-bold text-[#2B3674] block">{label}</label>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      {children}
    </div>
  );
}

const inputClass = "w-full px-4 py-3 bg-[#F4F7FE] rounded-xl text-sm text-[#2B3674] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 border-none";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [toast, setToast] = useState<Toast | null>(null);

  // Profile
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [savingProfile, setSavingProfile] = useState(false);

  // Site
  const [site, setSite] = useState({ name: '', tagline: '', description: '', logo: '' });
  const [savingSite, setSavingSite] = useState(false);

  // Social
  const [social, setSocial] = useState({ twitter: '', facebook: '', instagram: '', youtube: '', tiktok: '' });
  const [savingSocial, setSavingSocial] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState({ emailOnNewArticle: false, emailOnComment: false, emailAddress: '' });
  const [savingNotif, setSavingNotif] = useState(false);

  useEffect(() => {
    fetchUser();
    fetchSettings();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setProfile({ name: data.user.name || '', email: data.user.email || '' });
      }
    } catch {}
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        const s = data.settings;
        setSite(s.site || {});
        setSocial(s.social || {});
        setNotifications(s.notifications || {});
      }
    } catch {}
  };

  const showToast = (type: 'success' | 'error', message: string) => setToast({ type, message });

  const saveProfile = async () => {
    if (passwords.new && passwords.new !== passwords.confirm) {
      showToast('error', 'New passwords do not match');
      return;
    }
    setSavingProfile(true);
    try {
      const body: any = { name: profile.name, email: profile.email };
      if (passwords.new) { body.currentPassword = passwords.current; body.newPassword = passwords.new; }
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { showToast('error', data.error); return; }
      setPasswords({ current: '', new: '', confirm: '' });
      showToast('success', 'Profile updated');
    } catch {
      showToast('error', 'Something went wrong');
    } finally {
      setSavingProfile(false);
    }
  };

  const saveSettings = async (section: 'site' | 'social' | 'notifications', setter: (v: boolean) => void) => {
    setter(true);
    try {
      const body: any = {};
      if (section === 'site') body.site = site;
      if (section === 'social') body.social = social;
      if (section === 'notifications') body.notifications = notifications;
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) { showToast('error', 'Failed to save'); return; }
      showToast('success', 'Settings saved');
    } catch {
      showToast('error', 'Something went wrong');
    } finally {
      setter(false);
    }
  };

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'site', label: 'Site Settings', icon: Globe },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-6 text-[#2B3674]">
      {toast && <Toast toast={toast} onDismiss={() => setToast(null)} />}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Sidebar tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[20px] p-3 shadow-sm border border-gray-100">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all text-left mb-1 last:mb-0
                    ${active ? 'bg-[#111C44] text-white shadow-lg' : 'text-[#2B3674]/70 hover:bg-[#F4F7FE] hover:text-[#2B3674]'}`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-brand-yellow' : 'text-[#2B3674]/50'}`} />
                  {tab.label}
                  {active && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-4">

          {/* Profile */}
          {activeTab === 'profile' && (
            <>
              <SectionCard title="Personal Information">
                <div className="space-y-4">
                  <Field label="Full name">
                    <input
                      value={profile.name}
                      onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Email address">
                    <input
                      type="email"
                      value={profile.email}
                      onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </Field>
                </div>
              </SectionCard>

              <SectionCard title="Change Password">
                <div className="space-y-4">
                  {(['current', 'new', 'confirm'] as const).map(key => (
                    <Field key={key} label={key === 'current' ? 'Current password' : key === 'new' ? 'New password' : 'Confirm new password'}>
                      <div className="relative">
                        <input
                          type={showPasswords[key] ? 'text' : 'password'}
                          value={passwords[key]}
                          onChange={e => setPasswords(p => ({ ...p, [key]: e.target.value }))}
                          placeholder="••••••••"
                          className={`${inputClass} pr-12`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(p => ({ ...p, [key]: !p[key] }))}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2B3674]"
                        >
                          {showPasswords[key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </Field>
                  ))}
                  <p className="text-xs text-gray-400">Leave password fields empty if you don't want to change it.</p>
                </div>
              </SectionCard>

              <div className="flex justify-end">
                <button
                  onClick={saveProfile}
                  disabled={savingProfile}
                  className="flex items-center gap-2 px-6 py-3 bg-[#111C44] text-white text-sm font-bold rounded-xl hover:bg-opacity-90 transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {savingProfile ? 'Saving...' : 'Save profile'}
                </button>
              </div>
            </>
          )}

          {/* Site */}
          {activeTab === 'site' && (
            <>
              <SectionCard title="Site Identity">
                <div className="space-y-4">
                  <Field label="Site name">
                    <input value={site.name} onChange={e => setSite(s => ({ ...s, name: e.target.value }))} placeholder="GTV Afrik" className={inputClass} />
                  </Field>
                  <Field label="Tagline" hint="Appears under the site name in search results">
                    <input value={site.tagline} onChange={e => setSite(s => ({ ...s, tagline: e.target.value }))} placeholder="Shaping the African Narrative" className={inputClass} />
                  </Field>
                  <Field label="Site description" hint="Used for SEO meta description (160 characters max)">
                    <textarea
                      value={site.description}
                      onChange={e => setSite(s => ({ ...s, description: e.target.value }))}
                      placeholder="A short description of GTV Afrik..."
                      rows={3}
                      maxLength={160}
                      className={`${inputClass} resize-none`}
                    />
                    <p className="text-xs text-gray-400 text-right">{site.description?.length || 0}/160</p>
                  </Field>
                  <Field label="Logo URL" hint="Direct link to your logo image">
                    <input value={site.logo} onChange={e => setSite(s => ({ ...s, logo: e.target.value }))} placeholder="https://..." className={inputClass} />
                  </Field>
                </div>
              </SectionCard>

              <div className="flex justify-end">
                <button
                  onClick={() => saveSettings('site', setSavingSite)}
                  disabled={savingSite}
                  className="flex items-center gap-2 px-6 py-3 bg-[#111C44] text-white text-sm font-bold rounded-xl hover:bg-opacity-90 transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {savingSite ? 'Saving...' : 'Save site settings'}
                </button>
              </div>
            </>
          )}

          {/* Social */}
          {activeTab === 'social' && (
            <>
              <SectionCard title="Social Media Links">
                <div className="space-y-4">
                  {([
                    { key: 'twitter', label: 'X / Twitter', placeholder: 'https://x.com/gtvafrik' },
                    { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/gtvafrik' },
                    { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/gtvafrik' },
                    { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@gtvafrik' },
                    { key: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@gtvafrik' },
                  ] as const).map(({ key, label, placeholder }) => (
                    <Field key={key} label={label}>
                      <input
                        value={(social as any)[key]}
                        onChange={e => setSocial(s => ({ ...s, [key]: e.target.value }))}
                        placeholder={placeholder}
                        className={inputClass}
                      />
                    </Field>
                  ))}
                </div>
              </SectionCard>

              <div className="flex justify-end">
                <button
                  onClick={() => saveSettings('social', setSavingSocial)}
                  disabled={savingSocial}
                  className="flex items-center gap-2 px-6 py-3 bg-[#111C44] text-white text-sm font-bold rounded-xl hover:bg-opacity-90 transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {savingSocial ? 'Saving...' : 'Save social links'}
                </button>
              </div>
            </>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <>
              <SectionCard title="Email Notifications">
                <div className="space-y-5">
                  <Field label="Notification email address" hint="Where notification emails will be sent">
                    <input
                      type="email"
                      value={notifications.emailAddress}
                      onChange={e => setNotifications(n => ({ ...n, emailAddress: e.target.value }))}
                      placeholder="admin@gtvafrik.com"
                      className={inputClass}
                    />
                  </Field>

                  <div className="space-y-3 pt-2">
                    {([
                      { key: 'emailOnNewArticle', label: 'New article published', desc: 'Get notified when a new article goes live' },
                      { key: 'emailOnComment', label: 'New comment', desc: 'Get notified when a reader leaves a comment' },
                    ] as const).map(({ key, label, desc }) => (
                      <label key={key} className="flex items-center justify-between p-4 bg-[#F4F7FE] rounded-xl cursor-pointer hover:bg-[#EEF2FB] transition-colors">
                        <div>
                          <p className="text-sm font-bold text-[#2B3674]">{label}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                        </div>
                        <div className="relative shrink-0 ml-4">
                          <input
                            type="checkbox"
                            checked={(notifications as any)[key]}
                            onChange={e => setNotifications(n => ({ ...n, [key]: e.target.checked }))}
                            className="sr-only"
                          />
                          <div
                            onClick={() => setNotifications(n => ({ ...n, [key]: !n[key] }))}
                            className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${(notifications as any)[key] ? 'bg-[#111C44]' : 'bg-gray-200'}`}
                          >
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${(notifications as any)[key] ? 'translate-x-5' : 'translate-x-0'}`} />
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </SectionCard>

              <div className="flex justify-end">
                <button
                  onClick={() => saveSettings('notifications', setSavingNotif)}
                  disabled={savingNotif}
                  className="flex items-center gap-2 px-6 py-3 bg-[#111C44] text-white text-sm font-bold rounded-xl hover:bg-opacity-90 transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {savingNotif ? 'Saving...' : 'Save notification settings'}
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}