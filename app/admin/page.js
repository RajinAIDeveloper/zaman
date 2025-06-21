"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/api'; // Adjust this import based on your file structure

export default function AdminPage() {
  const router = useRouter();
  
  useEffect(() => {
    const checkAuth = async () => {
      if (!auth.isAuthenticated()) {
        router.push('/admin/login');
      } else {
        router.push('/admin/dashboard');
      }
    };
    
    checkAuth();
  }, [router]);

  // Return a loading state while checking authentication
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-dark-800">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-700 dark:text-gray-300">Redirecting...</p>
      </div>
    </div>
  );
}