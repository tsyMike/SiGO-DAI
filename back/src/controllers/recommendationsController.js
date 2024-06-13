import db from "../config/db.js";
import { uuidResult } from "../utils/generateUUID.js";

export class RecommendationsController {
  constructor({ recommendationsModel }) {
    this.recommendationsModel = recommendationsModel;
  }

  getAllRecommendations = async (req, res) => {
    const recommendations = await this.recommendationsModel.getAllRecommendations();
    res.status(200).json(recommendations);
  };
  getRecommendationById = async (req, res) => {
    const {id} = req.params;
    const recommendations =
      await this.recommendationsModel.getRecommendationById({ id });
    res.status(200).json(recommendations);
  }
  getRecommendationHistoryByRecommendationId = async (req, res) => {
    const { id } = req.params;
    const history = await this.recommendationsModel.getRecommendationHistoryByRecommendationId({ id });
    return !history
      ? res.status(404).json({ error: "Historial de recomendación no encontrado" })
      : res.status(200).json(history);
  };

  getRecommendationsByObservation = async (req, res) => {
    const { id } = req.params;
    const recommendations = await this.recommendationsModel.getRecommendationsByObservation({ id });
    res.status(200).json(recommendations);
  };

  getRecommendationsByAuditedUnit = async (req, res) => {
    const { id } = req.params;
    const recommendations = await this.recommendationsModel.getRecommendationsByAuditedUnit({ id });
    res.status(200).json(recommendations);
  };

  createRecommendation = async (req, res) => {
    const recommendation = req.body;
    const id = await this.recommendationsModel.createRecommendation({ recommendation });
    res.status(201).json({ id });
  };

  deleteRecommendation = async (req, res) => {
    const { id } = req.params;
    await this.recommendationsModel.deleteRecommendation({ id });
    res.status(204).end();
  };
}
