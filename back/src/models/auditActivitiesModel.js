// src/models/auditActivityModel.js
import db from "../config/db.js";
export class AuditActivitiesModel {
  static async getAllActivities() {
    const [rows] = await db.query("SELECT * FROM audit_activities");
    return rows;
  }

  static async getActivityById(id) {
    const [rows] = await db.query(
      "SELECT * FROM audit_activities WHERE id_activity = UUID_TO_BIN(?)",
      [id]
    );
    if (rows.length === 0) return [];
    return rows[0];
  }

  static async createActivity(activity) {
    const result = await db.query(
      "INSERT INTO audit_activities SET ?",
      activity
    );
    return result.insertId;
  }

  static async updateActivity(id, activity) {
    await db.query("UPDATE audit_activities SET ? WHERE id_activity = ?", [
      activity,
      id,
    ]);
  }

  static async deleteActivity(id) {
    await db.query("DELETE FROM audit_activities WHERE id_activity = ?", [id]);
  }
}
