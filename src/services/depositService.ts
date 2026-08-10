import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { DepositTransaction } from '@/types/deposit';

export async function getDepositByOrderCode(orderCode: string): Promise<DepositTransaction | null> {
  if (!orderCode) return null;

  const [rows] = await pool.execute<RowDataPacket[]>(
    'SELECT order_code, username, amount, point_received, status, created_at FROM transactions WHERE order_code = ? LIMIT 1',
    [orderCode]
  );

  if (rows.length === 0) return null;

  const tx = rows[0];
  return {
    order_code: tx.order_code,
    username: tx.username,
    amount: tx.amount,
    point_received: tx.point_received,
    status: tx.status,
    created_at: tx.created_at,
  };
}

export async function createDepositRecord(
  orderCode: string,
  username: string,
  amount: number,
  pointReceived: number,
  paymentMethod = 'VIETQR',
  description?: string
): Promise<boolean> {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO transactions (order_code, username, amount, point_received, status, payment_method, description) 
     VALUES (?, ?, ?, ?, 'PENDING', ?, ?)`,
    [
      orderCode,
      username,
      amount,
      pointReceived,
      paymentMethod,
      description || `Nap Point ${orderCode} cho ${username}`,
    ]
  );

  return result.affectedRows > 0;
}

export async function completeDepositTransaction(targetOrderCode: string, orderPrefix = 'TX') {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const strippedCode = targetOrderCode.replace(new RegExp(`^${orderPrefix}`, 'i'), '');
    const [txRows] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM transactions WHERE order_code = ? OR order_code = ? FOR UPDATE',
      [targetOrderCode, strippedCode]
    );

    if (txRows.length === 0) {
      await connection.rollback();
      connection.release();
      return { success: false, reason: 'NOT_FOUND', message: `Không tìm thấy đơn nạp ${targetOrderCode} trong hệ thống.` };
    }

    const transaction = txRows[0];

    if (transaction.status === 'COMPLETED') {
      await connection.rollback();
      connection.release();
      return { success: true, reason: 'ALREADY_COMPLETED', message: `Đơn nạp ${targetOrderCode} đã hoàn tất trước đó.` };
    }

    await connection.execute(
      'UPDATE transactions SET status = "COMPLETED", updated_at = NOW() WHERE order_code = ?',
      [targetOrderCode]
    );

    const pointToAdd = Number(transaction.point_received || transaction.amount || 0);
    await connection.execute(
      'UPDATE users SET point = point + ? WHERE LOWER(username) = LOWER(?)',
      [pointToAdd, transaction.username]
    );

    await connection.commit();
    connection.release();

    return {
      success: true,
      message: `Xác nhận chuyển khoản thành công! Đã cộng +${pointToAdd} Point cho tài khoản ${transaction.username}.`,
      username: transaction.username,
      pointAdded: pointToAdd,
    };
  } catch (error) {
    await connection.rollback();
    connection.release();
    throw error;
  }
}
