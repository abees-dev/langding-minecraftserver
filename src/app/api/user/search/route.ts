import { NextRequest, NextResponse } from 'next/server';
import { searchUsernames } from '@/services/userService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryStr = searchParams.get('q')?.trim() || searchParams.get('query')?.trim();

    if (!queryStr || queryStr.length < 1) {
      return NextResponse.json({ success: true, users: [] });
    }

    try {
      const usernames = await searchUsernames(queryStr, 5);
      return NextResponse.json({ success: true, users: usernames });
    } catch (dbErr: any) {
      console.warn('[DB User Search Warning]:', dbErr?.message);
      return NextResponse.json({ success: true, users: [] });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, users: [] }, { status: 500 });
  }
}
