import pool from '../databaseConfig.js';
import ValoracionVO from '../vo/ValoracionVO.js';

class ValoracionDAO {
  async addValoracion(valoracion) {
    const result = await pool.query(
      'INSERT INTO "VALORACION" (user_name, game_name, valoracion, fecha, positiva) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [valoracion.user_name, valoracion.game_name, valoracion.valoracion, valoracion.fecha, valoracion.positiva]
    );
    const row = result.rows[0];
    return new ValoracionVO(row.ID, row.user_name, row.game_name, row.valoracion, row.fecha, row.positiva);
  }

  async getValoracionesByGameName(game_name) {
    const result = await pool.query(
      'SELECT v.valoracion, v.fecha, u.user_name, v.positiva FROM "VALORACION" v JOIN "USER" u ON v.user_name = u.user_name WHERE v.game_name = $1',
      [game_name]
    );
    return result.rows.map(row => new ValoracionVO(row.ID, row.user_name, row.game_name, row.valoracion, row.fecha, row.positiva));
  }

  async getValoracionesByUserName(user_name) {
    const result = await pool.query(
      'SELECT v.valoracion, v.fecha, j.game_name, v.positiva FROM "VALORACION" v JOIN "JUEGO" j ON v.game_name = j.game_name WHERE v.user_name = $1',
      [user_name]
    );
    return result.rows.map(row => new ValoracionVO(row.ID, row.user_name, row.game_name, row.valoracion, row.fecha, row.positiva));
  }
}

export default ValoracionDAO;