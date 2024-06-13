import db from "../config/db.js";
import { uuidResult } from "../utils/generateUUID.js";
export class RecommendationsModel {
  static async getAllRecommendations() {
    const [rows] = await db.query(
      "SELECT BIN_TO_UUID(r.id_recommendation) id_recommendation, BIN_TO_UUID(rh.id_recommendation_version) id_recommendation_version, BIN_TO_UUID(r.id_observation) id_observation, CONCAT('R', r.numeral) numeral, r.description, rh.compliance, rh.step, rh.created_date, rh.acceptance, rh.starting_date, rh.ending_date" +
        " FROM recommendations r, recommendation_history rh" +
        " WHERE r.id_recommendation = rh.id_recommendation"
    );
    return rows || [];
  }
  static async getRecommendationById({ id }) {
    try {
      const [rows] = await db.query(
        "SELECT BIN_TO_UUID(r.id_recommendation) id_recommendation, BIN_TO_UUID(rh.id_recommendation_version) id_recommendation_version, BIN_TO_UUID(r.id_observation) id_observation, CONCAT('R', r.numeral) numeral, r.description, rh.compliance, rh.step, rh.created_date, rh.acceptance, rh.starting_date, rh.ending_date" +
          " FROM recommendations r, recommendation_history rh" +
          " WHERE r.id_recommendation = rh.id_recommendation" +
          " AND r.id_recommendation = UUID_TO_BIN(?)",
        [id]
      );

      if (rows.length === 0) {
        return [];
      }

      const newRows = await Promise.all(
        rows.map(async (e) => {
          try {
            const [response] = await db.query(
              "SELECT BIN_TO_UUID(id_unit) id_unit" +
                " FROM assigned_recommendations" +
                " WHERE id_recommendation = UUID_TO_BIN(?)",
              [e.id_recommendation]
            );
            return { ...e, audited_units: response };
          } catch (error) {
            console.error("Error fetching assigned recommendations:", error);
            return { ...e, audited_units: [] };
          }
        })
      );

      return newRows;
    } catch (error) {
      console.error("Error fetching recommendation by ID:", error);
      return [];
    }
  }

  static async getRecommendationHistoryByRecommendationId({ id }) {
    try {
      const [rows] = await db.query(
        "SELECT BIN_TO_UUID(r.id_recommendation) id_recommendation, BIN_TO_UUID(rh.id_recommendation_version) id_recommendation_version, BIN_TO_UUID(r.id_observation) id_observation, CONCAT('R', r.numeral) numeral, r.description, rh.compliance, rh.step, rh.created_date, rh.acceptance, rh.starting_date, rh.ending_date" +
          " FROM recommendations r, recommendation_history rh" +
          " WHERE UUID_TO_BIN(?) = rh.id_recommendation",
        [id]
      );

      if (rows.length === 0) {
        return null;
      }

      const newRows = await Promise.all(
        rows.map(async (e) => {
          try {
            const [response] = await db.query(
              "SELECT BIN_TO_UUID(id_unit) id_unit" +
                " FROM assigned_recommendations" +
                " WHERE id_recommendation = UUID_TO_BIN(?)",
              [e.id_recommendation]
            );
            return { ...e, audited_units: response };
          } catch (error) {
            console.error("Error fetching assigned recommendations:", error);
            return { ...e, audited_units: [] };
          }
        })
      );

      return newRows[0];
    } catch (error) {
      console.error(
        "Error fetching recommendation history by recommendation ID:",
        error
      );
      return null;
    }
  }

  static async getRecommendationsByObservation({ id }) {
    try {
      const [rows] = await db.query(
        "SELECT BIN_TO_UUID(r.id_recommendation) id_recommendation, BIN_TO_UUID(rh.id_recommendation_version) id_recommendation_version, BIN_TO_UUID(r.id_observation) id_observation, CONCAT('R', r.numeral) numeral, r.description, rh.compliance, rh.step, rh.created_date, rh.acceptance, rh.starting_date, rh.ending_date" +
          " FROM recommendations r, recommendation_history rh" +
          " WHERE r.id_observation = UUID_TO_BIN(?)" +
          " AND r.id_recommendation = rh.id_recommendation",
        [id]
      );

      if (rows.length === 0) {
        return [];
      }

      const newRows = await Promise.all(
        rows.map(async (e) => {
          try {
            const [response] = await db.query(
              "SELECT BIN_TO_UUID(id_unit) id_unit" +
                " FROM assigned_recommendations" +
                " WHERE id_recommendation = UUID_TO_BIN(?)",
              [e.id_recommendation]
            );
            return { ...e, audited_units: response };
          } catch (error) {
            console.error("error fetching assigned recommendations", error);
            return { ...e, audited_units: [] }; // Return an empty array or null in case of error
          }
        })
      );

      return newRows;
    } catch (error) {
      console.error("error fetching recommendations", error);
      return [];
    }
  }

  static async getRecommendationsByAuditedUnit({ id }) {
    try {
      const [rows] = await db.query(
        "SELECT BIN_TO_UUID(ar.id_unit) id_unit, BIN_TO_UUID(r.id_recommendation) id_recommendation, BIN_TO_UUID(rh.id_recommendation_version) id_recommendation_version, BIN_TO_UUID(r.id_observation) id_observation, CONCAT('R', r.numeral) numeral, r.description, rh.compliance, rh.step, rh.created_date, rh.acceptance, rh.starting_date, rh.ending_date" +
          " FROM recommendations r, recommendation_history rh, assigned_recommendations ar" +
          " WHERE r.id_recommendation = rh.id_recommendation" +
          " AND r.id_recommendation = ar.id_recommendation" +
          " AND ar.id_unit = UUID_TO_BIN(?)",
        [id]
      );

      if (rows.length === 0) {
        return [];
      }

      const newRows = await Promise.all(
        rows.map(async (e) => {
          try {
            const [response] = await db.query(
              "SELECT BIN_TO_UUID(id_unit) id_unit" +
                " FROM assigned_recommendations" +
                " WHERE id_recommendation = UUID_TO_BIN(?)",
              [e.id_recommendation]
            );
            return { ...e, audited_units: response };
          } catch (error) {
            console.error("Error fetching assigned recommendations:", error);
            return { ...e, audited_units: [] };
          }
        })
      );

      return newRows;
    } catch (error) {
      console.error("Error fetching recommendations by audited unit:", error);
      return [];
    }
  }

  static async createRecommendation({ recommendation }) {
    const { idObservation, numeral, description, auditedUnits } =
      recommendation;
    let [{ uuid }] = await uuidResult.generate();
    const uuidHistoryRecom = uuid;
    [{ uuid }] = await uuidResult.generate();
    const uuidRecom = uuid;

    const result1 = await db.query(
      "INSERT INTO recommendation_history (id_recommendation_version, step) " +
        " VALUES (UUID_TO_BIN(?), ?) ",
      [uuidHistoryRecom, 0]
    );
    const result2 = await db.query(
      "INSERT INTO recommendations (id_recommendation, id_observation, numeral, description)" +
        " VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?),?,?)",
      [uuidRecom, idObservation, numeral, description]
    );
    await db.query(
      "UPDATE recommendation_history" +
        " SET id_recommendation = UUID_TO_BIN(?)" +
        " WHERE id_recommendation_version = UUID_TO_BIN(?)",
      [uuidRecom, uuidHistoryRecom]
    );
    await db.query(
      "UPDATE recommendations" +
        " SET id_recommendation_version = UUID_TO_BIN(?)" +
        " WHERE id_recommendation = UUID_TO_BIN(?)",
      [uuidHistoryRecom, uuidRecom]
    );
    for (const iterator of auditedUnits) {
      await db.query(
        "INSERT INTO assigned_recommendations (id_recommendation, id_unit)" +
          " VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?))",
        [uuidRecom, iterator]
      );
    }
    return [result1.insertId, result2.insertId];
  }
  static async deleteRecommendation({ id }) {
    await db.query(
      "DELETE FROM recommendations" +
        " WHERE id_recommendation = UUID_TO_BIN(?)",
      [id]
    );
  }
}
