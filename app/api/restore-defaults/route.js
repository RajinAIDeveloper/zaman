// app/api/restore-defaults/route.js
import { NextResponse } from 'next/server';
import api from '@/lib/api';

export async function POST(request) {
  try {
    const { sections } = await request.json();
    const results = {};
    
    for (const section of sections) {
      try {
        // Try different HTTP methods (GET or POST)
        try {
          await api.post(`/content/${section}/restore_defaults/`);
          results[section] = 'success';
        } catch (methodError) {
          if (methodError.response?.status === 405) {
            await api.get(`/content/${section}/restore_defaults/`);
            results[section] = 'success';
          } else {
            throw methodError;
          }
        }
      } catch (error) {
        results[section] = `error: ${error.message}`;
      }
    }
    
    return NextResponse.json({ success: true, results });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Failed to restore defaults' },
      { status: 500 }
    );
  }
}