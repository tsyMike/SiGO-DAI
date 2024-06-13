import express from "express";
import { ReportsController } from "../controllers/reportsController.js";

export const createReportsRouter = ({ reportsModel }) => {
  const reportsRouter = express.Router();

  const reportsController = new ReportsController({
    reportsModel,
  });

  reportsRouter.get("/reports", reportsController.getAllReports);
  reportsRouter.get("/reports/:id", reportsController.getReportById);
  reportsRouter.get(
    "/reports/activity/:id",
    reportsController.getReportsByActivity
  );
  reportsRouter.post("/reports", reportsController.createReport);
  reportsRouter.put("/reports/:id", reportsController.updateReport);
  reportsRouter.delete("/reports/:id", reportsController.deleteReport);

  return reportsRouter;
};
