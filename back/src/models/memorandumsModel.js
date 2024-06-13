import db from "../config/db.js";
import { uuidResult } from "../utils/generateUUID.js";
export class MemorandumsModel {
  static async getAllMemorandums() {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(m.id_memo) id_memo, BIN_TO_UUID(m.assigned_activity) assigned_activity, d.description, d.title, d.correlative, d.issue_date, d.correlative, d.link " +
        "FROM memorandums m, docs d" +
        " WHERE m.id_memo = d.id_doc"
    );
    return rows;
  }
  static async getMemorandumById({ id }) {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(m.id_memo) id_memo, BIN_TO_UUID(m.assigned_activity) assigned_activity, d.description, d.title, d.correlative, d.issue_date, d.correlative, d.link " +
        "FROM memorandums m, docs d" +
        " WHERE m.id_memo = d.id_doc AND m.id_memo = UUID_TO_BIN(?)",
      [id]
    );
    return rows && rows.length ? rows[0] : [];
  }
  static async getMemorandumByActivity({ id_activity }) {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(m.id_memo) id_memo, BIN_TO_UUID(m.assigned_activity) assigned_activity, d.description, d.title, d.correlative, d.issue_date, d.correlative, d.link " +
        "FROM memorandums m, docs d" +
        " WHERE m.id_memo = d.id_doc AND m.assigned_activity = UUID_TO_BIN(?)",
      [id_activity]
    );
    return rows && rows.length ? rows[0] : [];
  }
  static async getMemorandumsByAuditor({ id }) {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(m.id_memo) id_memo, BIN_TO_UUID(m.assigned_activity) assigned_activity, d.description, d.title, d.correlative, d.issue_date, d.correlative, d.link" +
        " FROM memorandums m, docs d, assigned_memos am" +
        " WHERE m.id_memo = d.id_doc" +
        " AND m.id_memo = am.id_memo" +
        " AND am.ci = UUID_TO_BIN(?)",
      [id]
    );
    return rows ? rows : [];
  }
  static async createMemoradum({ memorandum }) {
    const [{ uuid }] = await uuidResult.generate();
    const {
      description,
      title,
      correlative,
      issueDate,
      link,
      limitDate,
      assignedActivity,
    } = memorandum;
    const result1 = await db.query(
      "INSERT INTO docs (id_doc, description,title, correlative, issue_date, link) " +
        "VALUES (UUID_TO_BIN(?),?,?,?,?,?)",
      [uuid, description, title, correlative, issueDate, link]
    );
    const result2 = await db.query(
      "INSERT INTO memorandums VALUES (UUID_TO_BIN(?), ?, UUID_TO_BIN(?))",
      [uuid, limitDate, assignedActivity]
    );
    return [result1, result2];
  }
  static async updateMemoradum({ id, modifiedMemmo }) {
    const { title, correlative, issueDate, link, limitDate, assignedActivity } =
      modifiedMemmo;
    await db.query(
      "UPDATE docs SET title = ?, correlative = ?, issue_date = ?, link = ? " +
        "WHERE id_doc = UUID_TO_BIN(?)",
      [title, correlative, issueDate, link, id]
    );
    await db.query(
      "UPDATE memorandums SET limit_date = ? assigned_activity = ? " +
        "WHERE id_memo = UUID_TO_BIN(?)"
    );
  }
  static async deleteMemorandum({ id }) {
    await db.query("DELETE FROM docs WHERE id_doc = UUID_TO_BIN(?)", [id]);
  }
}
