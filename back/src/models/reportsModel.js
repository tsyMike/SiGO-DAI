import db from "../config/db.js";
import { uuidResult } from "../utils/generateUUID.js";
export class ReportsModel {
  static async getAllReports() {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(r.id_doc) id_report, BIN_TO_UUID(r.id_activity) id_activity, r.id_report_type, r.auditable, d.description, d.title, d.issue_date, d.link, d.correlative " +
        " FROM docs d, reports r" +
        " WHERE d.id_doc = r.id_doc"
    );
    return rows || [];
  }
  static async getReportById({ id }) {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(r.id_doc) id_report, BIN_TO_UUID(r.id_activity) id_activity, r.id_report_type, r.auditable, d.description, d.title, d.issue_date, d.link, d.correlative " +
        " FROM docs d, reports r" +
        " WHERE d.id_doc = UUID_TO_BIN(?)",
      [id]
    );
    return rows || [];
  }
  static async getReportsByActivity({ id }) {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(r.id_doc) id_report, BIN_TO_UUID(r.id_activity) id_activity, r.id_report_type, r.auditable, d.description, d.title, d.issue_date, d.link, d.correlative " +
        " FROM docs d, reports r" +
        " WHERE r.id_activity = UUID_TO_BIN(?) and r.id_doc = d.id_doc",
      [id]
    );
    return rows || [];
  }
  static async getAuditableReports() {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(r.id_doc) id_report, BIN_TO_UUID(r.id_activity) id_activity, r.auditable, d.correlative" +
        " FROM docs d, reports r" +
        " WHERE r.auditable = 1 AND r.id_doc = d.id_doc"
    );
    return rows || [];
  }
  static async createReport({ report }) {
    const {
      idActivity,
      idReportType,
      auditable,
      description,
      title,
      issueDate,
      link,
      correlative,
    } = report;
    const [{ uuid }] = await uuidResult.generate();
    const result1 = await db.query(
      "INSERT INTO docs (id_doc, description, title, issue_date, link, correlative) " +
        "VALUES(UUID_TO_BIN(?),?,?,?,?,?)",
      [uuid, description, title, issueDate, link, correlative]
    );
    const result2 = await db.query(
      "INSERT INTO reports (id_doc, id_activity, id_report_type, auditable) " +
        "VALUES(UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?)",
      [uuid, idActivity, idReportType, auditable]
    );
    return [result1.insertId, result2.insertId];
  }
  static async updateReport({ id, modifiedReport }) {
    const {
      idActivity,
      idReportType,
      auditable,
      description,
      title,
      issueDate,
      link,
      correlative,
    } = modifiedReport;
    await db.query(
      "UPDATE docs " +
        "SET description = ?, title = ?, issue_date = ?, link = ?, correlative = ? " +
        "WHERE id_doc = UUID_TO_BIN(?)",
      [description, title, issueDate, link, correlative, id]
    );
    await db.query(
      "UPDATE reports " +
        "SET id_activity = ?, id_report_type = ?, auditable = ? " +
        "WHERE id_doc = UUID_TO_BIN(?)",
      [idActivity, idReportType, auditable, id]
    );
  }
  static async deleteReport({ id }) {
    await db.query("DELETE FROM docs WHERE id_doc = UUID_TO_BIN(?)", [id]);
  }
}
