// src/models/auditActivityModel.js
import db from "../config/db.js";
import { uuidResult } from "../utils/generateUUID.js";
export class AuditActivitiesModel {
  static async getAllActivities() {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(aa.id_activity) id_activity, aa.objective, aa.risk_description, aa.activity_name, aa.estimated_time, aa.scope, aa.starting_date, aa.ending_date, at.name as activity_type, aa.finished, aa.programmed, aa.report_reference, BIN_TO_UUID(aa.unit_reference) unit_reference FROM audit_activities aa JOIN activity_types at ON aa.activity_type = at.id_activity_type;"
    );
    return rows;
  }

  static async getActivityById({ id }) {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(aa.id_activity) aa.id_activity, aa.objective, aa.risk_description, aa.activity_name, aa.estimated_time, aa.scope, aa.starting_date, aa.ending_date, at.name, aa.finished, aa.programmed, aa.report_reference, aa.unit_reference FROM audit_activities aa JOIN activity_types at ON aa.activity_type = at.id_activity_type WHERE aa.id_activity = ?;",
      [id]
    );
    if (rows.length === 0) return [];
    return rows[0];
  }

  static async createActivity({ activity }) {
    const {
      objective,
      riskDescription,
      activityName,
      estimatedTime,
      scope,
      startingDate,
      endingDate,
      activityType,
      programmed,
      unitReference
    } = activity;

    const [{ uuid }] = await uuidResult.generate();

    const result = await db.query(
      "INSERT INTO audit_activities (id_activity, objective, risk_description, activity_name, estimated_time, scope, starting_date, ending_date, activity_type, finished, programmed, unit_reference)" +
        " VALUES(UUID_TO_BIN(?),?,?,?,?,?,?,?,?,?,?,UUID_TO_BIN(?))",
      [
        uuid,
        objective,
        riskDescription,
        activityName,
        estimatedTime,
        scope,
        startingDate,
        endingDate,
        activityType,
        0,
        programmed,
        unitReference,
      ]
    );
    return result.insertId;
  }

  static async updateActivity({ id, modifiedActivity }) {
    const {
      objective,
      riskDescription,
      activityName,
      estimatedTime,
      scope,
      startingDate,
      endingDate,
      activityType,
      finished,
      programmed,
      unitReference,
    } = modifiedActivity;

    await db.query(
      "UPDATE audit_activities SET objective = ?, risk_description = ?, activity_name = ?, estimated_time = ?, scope = ?, starting_date = ?, ending_date = ?, activity_type = ?, finished = ?, programmed = ?, unit_reference = UUID_TO_BIN(?)  WHERE id_activity = UUID_TO_BIN(?)",
      [
        objective,
        riskDescription,
        activityName,
        estimatedTime,
        scope,
        startingDate,
        endingDate,
        activityType,
        finished,
        programmed,
        unitReference,
        id,
      ]
    );
  }

  static async deleteActivity({id}) {
    await db.query(
      "DELETE FROM audit_activities WHERE id_activity = UUID_TO_BIN(?)",
      [id]
    );
  }
}
