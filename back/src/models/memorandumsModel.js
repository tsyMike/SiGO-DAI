import db from "../config/db.js";
import { uuidResult } from "../utils/generateUUID.js";
export class MemorandumsModel {
  static async getAllMemorandums() {
    const [rows] = await db.query("SELECT * FROM memorandums m, docs d");
    return rows;
  }
  static async getMemorandumById() {}
  static async createMemoradum() {}
  static async updateMemoradum() {}
  static async deleteMemoradum() {}
}
