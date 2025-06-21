import { NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function POST(request) {
  try {
    const { refresh } = await request.json();

    // Forward the refresh token request to the backend API
    const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
      refresh,
    });

    // Return the new access token
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to refresh token' },
      { status: error.response?.status || 401 }
    );
  }
}