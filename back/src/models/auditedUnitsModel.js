import db from "../config/db.js";
export class AuditedUnitsModel {
  static async getAllAuditedUnits() {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(u.id_user) id_user, u.name, a.cod FROM users u, audited_units a WHERE u.id_user = a.id_unit"
    );
    return rows;
  }
}
