import pool from '../databaseConfig.js';
import KeyVO from '../vo/KeyVO.js';

class KeyDAO {
  async addKey(game_key, game_name, key_owner) {
    const result = await pool.query(
      'INSERT INTO "KEY" (game_key, game_name, key_owner) VALUES ($1, $2, $3) RETURNING *',
      [game_key, game_name, key_owner]
    );
    return result.rows[0];
  }

  async getKeyByGameKey(gameKey) {
    const result = await pool.query('SELECT * FROM "KEY" WHERE game_key = $1', [gameKey]);
    if (result.rows.length > 0) {
      const key = result.rows[0];
      return new KeyVO(key.game_key, key.game_name, key.key_owner);
    }
    return null;
  }

  async updateKey(keyVO) {
    const { gameKey, gameName, keyOwner } = keyVO;
    const result = await pool.query(
      'UPDATE "KEY" SET game_name = $1, key_owner = $2 WHERE game_key = $3 RETURNING *',
      [gameName, keyOwner, gameKey]
    );
    return new KeyVO(result.rows[0].game_key, result.rows[0].game_name, result.rows[0].key_owner);
  }

  async deleteKey(gameKey) {
    await pool.query('DELETE FROM "KEY" WHERE game_key = $1', [gameKey]);
  }

  async getKeysByOwner(keyOwner) {
    const result = await pool.query('SELECT * FROM "KEY" WHERE key_owner = $1', [keyOwner]);
    return result.rows;
  }

  async deleteKeyByGameNameAndOwner(gameName, keyOwner) {
    await pool.query('DELETE FROM "KEY" WHERE game_name = $1 AND key_owner = $2', [gameName, keyOwner]);
  }
  
}

export default KeyDAO;