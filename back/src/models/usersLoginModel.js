import db from "../config/db.js"
export class UsersLoginModel {
  static async login({ credentials }) {
    const { username, password } = credentials;
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(id_user) id_user, type, name, last_name FROM users" +
        " WHERE username LIKE ? AND password LIKE ?",
      [username, password]
    );
    return rows && rows.length != 0 ? rows[0] : [];
  }

}