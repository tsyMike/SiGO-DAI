import db from "../config/db.js";
import { uuidResult } from "../utils/generateUUID.js";
export class AssignedMemosModel {
  static async getAllAssignedMemos() {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(ci) ci, BIN_TO_UUID(id_memo) id_memo, assigned_date " +
        "FROM assigned_memos"
    );
    return rows && rows.length ? rows : [];
  }
  static async getAssignedMemosByAuditor({ id }) {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(id_memo) id_memo, assigned_date " +
        "FROM assigned_memos WHERE ci = UUID_TO_BIN(?)",
      [id]
    );
    return rows && rows.length ? rows : [];
  }
  static async getAssignedMemosByMemo({ idMemo }) {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(ci) ci, assigned_date " +
        "FROM assigned_memos WHERE id_memo = UUID_TO_BIN(?)",
      [idMemo]
    );
    return rows && rows.length ? rows : [];
  }
  static async createAssignedMemo({ assignedMemo }) {
    const { idMemo, ci, assignedDate } = assignedMemo;
    const result = await db.query(
      "INSERT INTO assigned_memos (id_memo, ci, assigned_date) " +
        "VALUES(UUID_TO_BIN(?), UUID_TO_BIN(?), ?)",
      [idMemo, ci, assignedDate]
    );
    return [result];
  }
  static async updateAssginedMemo({ modifiedAssignedMemo }) {
    const [idMemo, ci, assignedDate] = modifiedAssignedMemo;
    await db.query(
      "UPDATE assigned_memos " +
        "SET id_memo = UUID_TO_BIN(?), ci = UUID_TO_BIN(?), asssigned_date = ?",
      [idMemo, ci, assignedDate]
    );
  }
  static async deleteAssignedMemo({ idMemo, ci }) {
    await db.query(
      "DELETE FROM assigned_memos " +
        "WHERE id_memo = UUID_TO_BIN(?) AND ci = UUID_TO_BIN(?)",
      [idMemo, ci]
    );
  }
}
