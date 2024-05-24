// src/models/auditActivityModel.js
import db from "../config/db.js";
import { uuidResult } from "../utils/generateUUID.js";
export class AuditorsModel {
  static async getAllAuditors() {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(u.id_user) id_user, u.name, u.last_name, u.username FROM users u, auditors a WHERE a.ci = id_user"
    );
    return rows;
  }

  static async getAuditorById({ id }) {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(ci) id_user, profession, public_years_xp, private_years_xp, incorporation_date, anual_remuneration FROM auditors WHERE ci = UUID_TO_BIN(?)",
      [id]
    );
    if (rows.length === 0) return [];
    return rows[0];
  }

  static async createAuditor({ auditor }) {
    const {
      name,
      lastName,
      profession,
      publicYearsXP,
      privateYearsXP,
      incorporationDate,
      anualRemuneration,
    } = auditor;
    const userInfo = name[0] + lastName;

    const [{ uuid }] = await uuidResult.generate();

    const [result1] = await db.query(
      "INSERT INTO users (id_user, type, name, last_name, username, password) VALUES (UUID_TO_BIN(?),?,?,?,?,?);",
      [
        uuid,
        "user",
        name,
        lastName,
        userInfo.toLowerCase(), // first username
        userInfo.toLowerCase(), // first password
      ]
    );

    const [result2] = await db.query(
      "INSERT INTO auditors (ci, profession, public_years_xp, private_years_xp, incorporation_date, anual_remuneration) VALUES (UUID_TO_BIN(?),?,?,?,?,?)",
      [
        uuid,
        profession,
        publicYearsXP,
        privateYearsXP,
        incorporationDate,
        anualRemuneration,
      ]
    );
    return [result1, result2];
  }

  static async updateAuditor({ id, modifiedAuditor }) {
    const {
      name,
      lastName,
      profession,
      publicYearsXP,
      privateYearsXP,
      incorporationDate,
      anualRemuneration,
    } = modifiedAuditor;
    const newUsername = name[0] + lastName;
    await db.query(
      "UPDATE users SET name = ?, last_name = ?, username = ? " +
        "WHERE id_user = UUID_TO_BIN(?)",
      [name, lastName, newUsername.toLowerCase(), id]
    );
    await db.query(
      "UPDATE auditors SET profession = ?, public_years_xp = ?, private_years_xp = ?, incorporation_date = ?, anual_remuneration = ? WHERE ci = UUID_TO_BIN(?);",
      [
        profession,
        publicYearsXP,
        privateYearsXP,
        incorporationDate,
        anualRemuneration,
        id,
      ]
    );
  }

  static async deleteAuditor({ id }) {
    await db.query("DELETE FROM users WHERE id_user = UUID_TO_BIN(?)", [id]);
  }
}
