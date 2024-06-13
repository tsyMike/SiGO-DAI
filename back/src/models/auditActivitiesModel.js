// src/models/auditActivityModel.js
import db from "../config/db.js";
import { uuidResult } from "../utils/generateUUID.js";
export class AuditActivitiesModel {
  static async getAllActivities() {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(id_activity) id_activity, objective, risk_description, activity_name, estimated_time, scope, starting_date, ending_date, activity_type, finished, programmed, report_reference, BIN_TO_UUID(unit_reference) unit_reference " +
        " FROM audit_activities aa "
    );
    return rows;
  }

  static async getActivityById({ id }) {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(id_activity) id_activity, objective, risk_description, activity_name, estimated_time, scope, starting_date, ending_date, activity_type, finished, programmed, report_reference, BIN_TO_UUID(unit_reference) unit_reference" +
        " FROM audit_activities" +
        " WHERE id_activity = UUID_TO_BIN(?);",
      [id]
    );
    if (rows.length === 0) return [];
    return rows && rows.length != 0 ? rows[0] : [];
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
      unitReference,
    } = activity;

    const [{ uuid }] = await uuidResult.generate();

    const result = await db.query(
      "INSERT INTO audit_activities (id_activity, objective, risk_description, activity_name, estimated_time, scope, starting_date, ending_date, activity_type, finished, programmed, unit_reference)" +
        " VALUES(UUID_TO_BIN(?),?,?,?,?,?,?,?,?,NULL,?,UUID_TO_BIN(?))",
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
        programmed,
        unitReference,
      ]
    );
    return result.insertId;
  }

  static async updateActivity({ id, modifiedActivity }) {
    const {
      objective,
      risk_description,
      activity_name,
      estimated_time,
      scope,
      starting_date,
      ending_date,
      activity_type,
      finished,
      programmed,
      unit_reference,
    } = modifiedActivity;

    await db.query(
      "UPDATE audit_activities" +
        " SET objective = ?, risk_description = ?, activity_name = ?, estimated_time = ?, scope = ?, starting_date = ?, ending_date = ?, activity_type = ?, finished = ?, programmed = ?, unit_reference = UUID_TO_BIN(?) " +
        " WHERE id_activity = UUID_TO_BIN(?)",
      [
        objective,
        risk_description,
        activity_name,
        estimated_time,
        scope,
        starting_date,
        ending_date,
        activity_type,
        finished,
        programmed,
        unit_reference,
        id,
      ]
    );
  }

  static async deleteActivity({ id }) {
    console.log(id);
    await db.query(
      "DELETE FROM audit_activities WHERE id_activity = UUID_TO_BIN(?)",
      [id]
    );
  }
}
