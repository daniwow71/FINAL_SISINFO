import pool from '../databaseConfig.js';
import JuegoVO from '../vo/JuegoVO.js';

class JuegoDAO {
  async getGameByName(gameName) {
    const result = await pool.query('SELECT * FROM "JUEGO" WHERE game_name = $1', [gameName]);
    return result.rows[0];
  }

  async getAllJuegos() {
    const result = await pool.query('SELECT * FROM "JUEGO"');
    return result.rows;
  }

  async addJuego(juegoVO) {
    const { gameName, gameGenre, gameRate, gamePoster, gameDescription } = juegoVO;
    const result = await pool.query(
      'INSERT INTO "JUEGO" (game_name, game_genre, game_rate, game_poster, game_description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [gameName, gameGenre, gameRate, gamePoster, gameDescription]
    );
    return new JuegoVO(result.rows[0].game_name, result.rows[0].game_genre, result.rows[0].game_rate, result.rows[0].game_poster, result.rows[0].game_description);
  }

  async updateJuego(juegoVO) {
    const { gameName, gameGenre, gameRate, gamePoster, gameDescription } = juegoVO;
    const result = await pool.query(
      'UPDATE "JUEGO" SET game_genre = $1, game_rate = $2, game_poster = $3, game_description = $4 WHERE game_name = $5 RETURNING *',
      [gameGenre, gameRate, gamePoster, gameDescription, gameName]
    );
    return new JuegoVO(result.rows[0].game_name, result.rows[0].game_genre, result.rows[0].game_rate, result.rows[0].game_poster, result.rows[0].game_description);
  }

  async deleteJuego(gameName) {
    await pool.query('DELETE FROM "JUEGO" WHERE game_name = $1', [gameName]);
  }
}

export default JuegoDAO;