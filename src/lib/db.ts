import mysql from 'mysql2/promise';

// Khai báo global scope để giữ kết nối Singleton trên Serverless (Vercel) & Hot-reload Next.js
declare global {
  // eslint-disable-next-line no-var
  var mysqlPool: mysql.Pool | undefined;
}

const createPoolConfig = (): mysql.PoolOptions => {
  const isVercel = Boolean(process.env.VERCEL || process.env.NEXT_PUBLIC_VERCEL_ENV);

  return {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'minecraft',
    waitForConnections: true,
    // Tối ưu connectionLimit cho Vercel Serverless (tránh lỗi ER_CON_COUNT_ERROR: Too many connections)
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || (isVercel ? 3 : 10),
    maxIdle: Number(process.env.DB_MAX_IDLE) || 2, // Tự động đóng bớt connection rảnh rỗi
    idleTimeout: Number(process.env.DB_IDLE_TIMEOUT) || 30000, // 30s giải phóng connection rảnh rỗi
    queueLimit: 0,
    connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT) || 10000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    // Hỗ trợ SSL khi kết nối Database Cloud (PlanetScale, Aiven, AWS RDS, DigitalOcean,...)
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  };
};

/**
 * Singleton MySQL Connection Pool dùng chung toàn ứng dụng.
 * Giúp ngăn tạo lại connection pool trên các Lambda Serverless Functions của Vercel.
 */
export const pool: mysql.Pool =
  globalThis.mysqlPool || (globalThis.mysqlPool = mysql.createPool(createPoolConfig()));

export default pool;

/**
 * Helper thực thi SQL Query đơn lẻ với error handling
 */
export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  try {
    const [results] = await pool.execute(sql, params);
    return results as T;
  } catch (error: any) {
    console.error('[DB Query Error]:', error?.message || error);
    throw error;
  }
}
