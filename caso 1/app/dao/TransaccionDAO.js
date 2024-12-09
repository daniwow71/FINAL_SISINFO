import pool from '../databaseConfig.js';
import TransaccionVO from '../vo/TransaccionVO.js';

class TransaccionDAO {
  async addTransaccion(transaccion) {
    const result = await pool.query(
      'INSERT INTO "TRANSACCION" (user_name, game_name, "FECHA") VALUES ($1, $2, $3) RETURNING *',
      [transaccion.user_name, transaccion.game_name, transaccion.FECHA]
    );
    const row = result.rows[0];
    return new TransaccionVO(row.ID, row.user_name, row.game_name, row.FECHA);
  }

  async deleteTransaccion(transactionId) {
    await pool.query('DELETE FROM "TRANSACCION" WHERE "ID" = $1', [transactionId]);
  }

  async getTransaccionesByUserName(user_name) {
    const result = await pool.query(
      'SELECT * FROM "TRANSACCION" WHERE user_name = $1',
      [user_name]
    );
    return result.rows.map(row => new TransaccionVO(row.ID, row.user_name, row.game_name, row.FECHA));
  }
}

export default TransaccionDAO;