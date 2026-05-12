'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, FileText, PenTool, Tags, Settings, Menu, Search, Bell } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // On login/signup pages, just render children directly (no sidebar/auth check)
  const isAuthPage = pathname === '/admin/login' || pathname === '/admin/signup';

  useEffect(() => {
    if (isAuthPage) return;
    checkAuth();
  }, [isAuthPage]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      router.push('/admin/login');
    }
  };

  if (isAuthPage) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'My Articles', href: '/admin/articles', icon: FileText },
    { name: 'Write New Post', href: '/admin/articles/new', icon: PenTool },
    { name: 'Categories', href: '/admin/categories', icon: Tags },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  if (!user) {
    return <div className="min-h-screen bg-[#F4F7FE] flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F4F7FE] font-prompt">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}

      {/* Sidebar - Using brand-dark-navy inspired dark theme */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#111C44] text-white transform transition-transform duration-300 ease-in-out rounded-r-3xl my-4 ml-4 shadow-xl
        lg:translate-x-0 lg:fixed lg:h-[calc(100vh-32px)]
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-[120%]'}
      `}>
        <div className="flex flex-col h-full py-8">
          {/* Logo */}
          <div className="flex items-center justify-center px-8 mb-10 border-b border-white/10 pb-6">
            <h1 className="text-white text-2xl font-bold tracking-widest uppercase flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-yellow text-brand-dark-navy rounded flex items-center justify-center font-bold">G</div>
              GTV AFRIK
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.name === 'My Articles' && pathname.includes('/admin/articles') && pathname !== '/admin/articles/new');
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-4 py-3.5 text-[15px] font-medium rounded-xl transition-all
                    ${isActive
                      ? 'bg-brand-yellow text-[#111C44] shadow-lg shadow-brand-yellow/20 font-bold'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <Icon className={`mr-4 w-5 h-5 ${isActive ? 'text-[#111C44]' : 'text-brand-yellow'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User info and logout */}
          <div className="p-6 mt-auto">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="text-white text-sm mb-4">
                <p className="font-bold text-base">{user.name}</p>
                <p className="text-white/60 text-xs truncate">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-sm text-[#111C44] font-bold bg-white rounded-xl hover:bg-brand-yellow transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-[280px] p-4 lg:pr-8 min-h-screen flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4 mb-6">
          <div className="flex flex-col">
            <div className="text-sm text-gray-500 font-medium hidden md:block">Pages / {navigation.find(n => pathname.includes(n.href))?.name || 'Dashboard'}</div>
            <h1 className="text-3xl font-bold text-[#2B3674]">{navigation.find(n => pathname.includes(n.href))?.name || 'Dashboard'}</h1>
          </div>
          
          <div className="flex items-center bg-white rounded-full shadow-sm p-2 px-4 gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1 text-gray-600 hover:text-gray-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="w-48 lg:w-64 pl-10 pr-4 py-2 bg-[#F4F7FE] border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-vibrant-blue"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            <div className="w-10 h-10 bg-brand-vibrant-blue text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md cursor-pointer">
              {user.name?.charAt(0) || 'A'}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
