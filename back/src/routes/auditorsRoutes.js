import express from "express";
import { AuditorsController } from "../controllers/auditorsController.js";

export const createAuditorsRouter = ({ auditorsModel }) => {
  const auditorRouter = express.Router();

  const auditorController = new AuditorsController({
    auditorsModel,
  });

  auditorRouter.get("/auditors", auditorController.getAllAuditors);
  auditorRouter.get("/auditors/:id", auditorController.getAuditorById);
  auditorRouter.get("/active-auditors/", auditorController.getNoActiveAuditorsParam);
  auditorRouter.post("/auditors", auditorController.createAuditor);
  auditorRouter.put("/auditors/update/:id", auditorController.updateAuditor);
  auditorRouter.put("/auditors/assign/:id", auditorController.assignAuditor);
  auditorRouter.delete("/auditors/:id", auditorController.deleteAuditor);

  return auditorRouter;
};
