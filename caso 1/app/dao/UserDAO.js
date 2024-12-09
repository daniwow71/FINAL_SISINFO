import pool from '../databaseConfig.js';
import UserVO from '../vo/UserVO.js';

class UserDAO {
  async addUser(user) {
    const result = await pool.query(
      'INSERT INTO "USER" (user_name, user_mail, user_password, birth_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [user.user_name, user.user_mail, user.user_password, user.birth_date]
    );
    return result.rows[0];
  }

  async getUserByEmailOrUsername(email, username) {
    const result = await pool.query('SELECT * FROM "USER" WHERE user_mail = $1 OR user_name = $2', [email, username]);
    return result.rows[0];
  }

  async getUserByEmailAndPassword(email, password) {
    const result = await pool.query('SELECT * FROM "USER" WHERE user_mail = $1 AND user_password = $2', [email, password]);
    return result.rows[0];
  }

  async getUserByUsername(username) {
    const result = await pool.query('SELECT * FROM "USER" WHERE user_name = $1', [username]);
    return result.rows[0];
  }

  async updateUser(user) {
    const result = await pool.query(
      'UPDATE "USER" SET user_name = $1, user_mail = $2 WHERE user_name = $3 RETURNING *',
      [user.user_name, user.user_mail, user.user_name]
    );
    return result.rows[0];
  }

  async deleteUser(userName) {
    const result = await pool.query(
      'DELETE FROM "USER" WHERE user_name = $1 RETURNING *',
      [userName]
    );
    return result.rowCount > 0;
  }
}

export default UserDAO;