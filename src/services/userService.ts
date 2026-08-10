import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { Player } from '@/types/user';

export async function findUserByUsername(username: string): Promise<Player | null> {
  const trimmed = username.trim();
  if (!trimmed) return null;

  const [rows] = await pool.execute<RowDataPacket[]>(
    'SELECT id, username, realname, point FROM users WHERE LOWER(username) = LOWER(?) LIMIT 1',
    [trimmed]
  );

  if (rows.length === 0) return null;

  const user = rows[0];
  return {
    id: user.id,
    username: user.username,
    realname: user.realname,
    point: user.point || 0,
  };
}

export async function searchUsernames(query: string, limit = 5): Promise<string[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const searchPattern = `${trimmed}%`;
  const [rows] = await pool.execute<RowDataPacket[]>(
    'SELECT username FROM users WHERE username LIKE ? ORDER BY username ASC LIMIT ?',
    [searchPattern, limit]
  );

  return rows.map((row) => row.username);
}
