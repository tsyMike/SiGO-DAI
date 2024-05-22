import db from "../config/db.js";
export class uuidResult {
  static async generate() {
    const [uuidResult] = await db.query("SELECT UUID() uuid;");
    return uuidResult;
  }
}
