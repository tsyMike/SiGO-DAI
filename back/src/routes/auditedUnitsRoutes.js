import express from "express";
import { AuditedUnitsController } from "../controllers/auditedUnitsController.js";
export const createAuditedUnitsRouter = ({ auditedUnitsModel }) => {
  const auditedUnitsRouter = express.Router();
  const auditedUnitsController = new AuditedUnitsController({
    auditedUnitsModel,
  });

  auditedUnitsRouter.get(
    "/audited-units",
    auditedUnitsController.getAllAuditedUnits
  );
  // auditedUnitsRouter.get("/audited-units/:id", auditedUnitsController.algo);
  // auditedUnitsRouter.post("/audited-units", auditedUnitsController.algo);
  // auditedUnitsRouter.put("/audited-units/:id", auditedUnitsController.algo);
  // auditedUnitsRouter.delete("/audited-units", auditedUnitsController.algo);
  return auditedUnitsRouter;
};
