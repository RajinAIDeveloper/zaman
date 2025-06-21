// app/api/auth/refresh/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Forward the authentication request to the backend API
    const response = await axios.post(`${API_URL}/auth/login/`, {
      username,
      password,
    });

    // Return the response data to be stored in localStorage
    return NextResponse.json(response.data);
  } catch (error) {
    // Handle API errors
    const errorMessage = error.response?.data?.detail || 'Authentication failed';
    return NextResponse.json(
      { error: errorMessage },
      { status: error.response?.status || 401 }
    );
  }
}

