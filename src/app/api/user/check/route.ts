import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username')?.trim();

    if (!username) {
      return NextResponse.json(
        { exists: false, message: 'Vui lòng nhập tên nhân vật Minecraft!' },
        { status: 400 }
      );
    }

    try {
      // Query database kiểm tra username
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT id, username, realname, point FROM users WHERE LOWER(username) = LOWER(?) LIMIT 1',
        [username]
      );

      if (rows.length > 0) {
        const user = rows[0];
        return NextResponse.json({
          exists: true,
          user: {
            id: user.id,
            username: user.username,
            realname: user.realname,
            point: user.point || 0,
          },
        });
      } else {
        return NextResponse.json({
          exists: false,
          message: `Không tìm thấy nhân vật "${username}". Vui lòng đăng nhập vào server Minecraft ít nhất 1 lần để hệ thống tạo tài khoản!`,
        });
      }
    } catch (dbError: any) {
      console.error('[DB Check Error]:', dbError?.message);
      return NextResponse.json(
        {
          exists: false,
          message: 'Không thể kết nối cơ sở dữ liệu để xác minh tài khoản. Vui lòng thử lại sau!',
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { exists: false, message: error?.message || 'Có lỗi xảy ra' },
      { status: 500 }
    );
  }
}
