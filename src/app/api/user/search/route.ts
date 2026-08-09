import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryStr = searchParams.get('q')?.trim() || searchParams.get('query')?.trim();

    if (!queryStr || queryStr.length < 1) {
      return NextResponse.json({ success: true, users: [] });
    }

    try {
      const searchPattern = `${queryStr}%`;
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT username FROM users WHERE username LIKE ? ORDER BY username ASC LIMIT 5',
        [searchPattern]
      );

      const usernames = rows.map((row) => row.username);
      return NextResponse.json({ success: true, users: usernames });
    } catch (dbErr: any) {
      console.warn('[DB User Search Warning]:', dbErr?.message);
      return NextResponse.json({ success: true, users: [] });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, users: [] }, { status: 500 });
  }
}
