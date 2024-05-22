import db from "../config/db.js"

export class ActivityTypesModel {
  static async getAllActivityTypes() {
    const [rows] = await db.query("SELECT * FROM activity_types");
    return rows;
  }
  static async getActivityTypeById({ id }) {
    const [rows] = await db.query(
      "SELECT * FROM activity_types WHERE id_activity_type = ?",
      [id]
    );
    if (rows.length === 0) return [];
    return rows[0];
  }
}