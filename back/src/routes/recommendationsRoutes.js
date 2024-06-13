import express from "express";
import { RecommendationsController } from "../controllers/recommendationsController.js";

export const createRecommendationsRouter = ({ recommendationsModel }) => {
  const recommendationsRouter = express.Router();
  const recommendationsController = new RecommendationsController({
    recommendationsModel,
  });

  recommendationsRouter.get(
    "/recommendations",
    recommendationsController.getAllRecommendations
  );

  recommendationsRouter.get(
    "/recommendations/history/:id",
    recommendationsController.getRecommendationHistoryByRecommendationId
  );
  recommendationsRouter.get(
    "/recommendations/:id",
    recommendationsController.getRecommendationById
  );
  recommendationsRouter.get(
    "/recommendations/observation/:id",
    recommendationsController.getRecommendationsByObservation
  );

  recommendationsRouter.get(
    "/recommendations/audited-unit/:id",
    recommendationsController.getRecommendationsByAuditedUnit
  );

  recommendationsRouter.post(
    "/recommendations",
    recommendationsController.createRecommendation
  );

  recommendationsRouter.delete(
    "/recommendations/:id",
    recommendationsController.deleteRecommendation
  );

  return recommendationsRouter;
};
