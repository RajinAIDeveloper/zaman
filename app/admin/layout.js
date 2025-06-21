// app/admin/layout.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import { useAuth } from '@/components/AuthProvider'; // Import our custom auth hook

export default function AdminLayout({ children }) {
  const { user, loading: authLoading } = useAuth(); // Use our custom auth hook
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Redirect to login if not authenticated
    if (!authLoading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, authLoading, router, pathname]);

  // Don't render anything while checking authentication
  if (!isMounted || (authLoading && pathname !== '/admin/login')) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Don't apply layout to login page
  if (pathname === '/admin/login') {
    return children;
  }

  // Render admin layout when authenticated
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg font-semibold text-gray-900">
              Portfolio Admin
            </h1>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}