import db from "../config/db.js";
import { uuidResult } from "../utils/generateUUID.js";
export class ObservationsModel {
  static async getAllObservations() {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(id_observation) id_observation, BIN_TO_UUID(id_report) id_report, numeral, description, criterion, condittion, cause, effect" +
        " FROM observations"
    );
    return rows || [];
  }
  static async getObservationById({ id }) {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(id_observation) id_observation, BIN_TO_UUID(id_report) id_report, numeral, description, criterion, condittion, cause, effect " +
        " FROM observations" +
        " WHERE id_observation = UUID_TO_BIN(?)",
      [id]
    );
    return rows ? rows[0] : [];
  }
  static async getObservationsByReport({ id }) {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(id_observation) id_observation, BIN_TO_UUID(id_report) id_report, numeral, description, criterion, condittion, cause, effect" +
        " FROM observations" +
        " WHERE id_report = UUID_TO_BIN(?)",
      [id]
    );
    return rows || [];
  }
  static async createObservation({ observation }) {
    const {
      idReport,
      numeral,
      description,
      criterion,
      condittion,
      cause,
      effect,
    } = observation;
    const [{ uuid }] = await uuidResult.generate();
    const result = await db.query(
      "INSERT INTO observations (id_observation, numeral, description, criterion, condittion, cause, effect, id_report)" +
        " VALUES(UUID_TO_BIN(?),?,?,?,?,?,?,UUID_TO_BIN(?))",
      [
        uuid,
        numeral,
        description,
        criterion,
        condittion,
        cause,
        effect,
        idReport,
      ]
    );
    return result.insertId;
  }
  static async deleteObservation({ id }) {
    await db.query("DELETE FROM observations WHERE id_observation = UUID_TO_BIN(?)", [id]);
  }
}
