import db from "../config/db.js";
export class AuditedUnitsModel {
  static async getAllAuditedUnits() {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(u.id_user) id_user, u.name, a.cod FROM users u, audited_units a WHERE u.id_user = a.id_unit"
    );
    return rows;
  }
  static async getAuditedUnitById({ id }) {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(id_unit) id_unit, cod FROM audited_units WHERE id_unit = UUID_TO_BIN(?)",
      [id]
    );
    return rows && rows.length != 0 ? rows[0] : [];
  }
}
