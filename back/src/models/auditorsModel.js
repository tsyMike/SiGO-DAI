import db from "../config/db.js";
import { uuidResult } from "../utils/generateUUID.js";
export class AuditorsModel {
  static async getAllAuditors() {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(id_user) id_user, is_active, name, last_name, username " +
        " FROM users, auditors " +
        " WHERE id_user = ci"
    );
    return rows;
  }

  static async getAuditorById({ id }) {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(ci) id_user, profession, public_years_xp, private_years_xp, incorporation_date, anual_remuneration" +
        " FROM auditors" +
        " WHERE ci = UUID_TO_BIN(?)",
      [id]
    );
    if (rows.length === 0) return [];
    return rows[0];
  }
  static async getNoActiveAuditorsParam() {
    const [rows] = await db.query(
      "SELECT last_name" +
        " FROM users, auditors" +
        " WHERE auditors.ci = users.id_user AND last_name IS NOT NULL "
    );
    return rows.map((e) => e.last_name);
  }
  static async createAuditor({ auditor }) {
    const { lastName } = auditor;
    const [{ uuid }] = await uuidResult.generate();

    const [result1] = await db.query(
      "INSERT INTO users (id_user, type, last_name, is_active) " +
        "VALUES (UUID_TO_BIN(?),'user',?,?);",
      [uuid, lastName, 0]
    );

    const [result2] = await db.query(
      "INSERT INTO auditors (ci) VALUES (UUID_TO_BIN(?))",
      [uuid]
    );
    return [result1, result2];
  }
  static async assignAuditor({ id, newAuditor }) {
    const {
      name,
      lastName,
      profession,
      publicYearsXP,
      privateYearsXP,
      incorporationDate,
      anualRemuneration,
    } = newAuditor;
    const [charge, number] = lastName.split(" ")
    const newUsername = (name.split(" ")[0] + charge[0] + number).toLowerCase();
    await db.query(
      "UPDATE users" +
        " SET username = ?, password = ?, name = ?, last_name = ?, type = 'user', is_active = 1" +
        " WHERE id_user = UUID_TO_BIN(?)",
      [newUsername, newUsername, name, lastName, id]
    );
    await db.query(
      "UPDATE auditors" +
        " SET profession = ?, public_years_xp = ?, private_years_xp = ?, incorporation_date = ?, anual_remuneration = ?" +
        " WHERE ci = UUID_TO_BIN(?)",
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
    await db.query(
      "UPDATE users" +
        " SET is_active = 0, username = NULL, password = NULL, name = NULL" +
        " WHERE id_user = UUID_TO_BIN(?)",
      [id]
    );
    await db.query(
      "UPDATE auditors" +
        " SET profession = NULL, public_years_xp = NULL, private_years_xp = NULL, incorporation_date = NULL, anual_remuneration = NULL" +
        " WHERE ci = UUID_TO_BIN(?)",
      [id]
    );
  }
}
