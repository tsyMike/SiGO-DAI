// src/app.js
import express from "express";
import { createAuditActivityRouter } from "./src/routes/auditActivitiesRoutes.js";
import { createAuditorsRouter } from "./src/routes/auditorsRoutes.js";
import { createAuditedUnitsRouter } from "./src/routes/auditedUnitsRoutes.js";

import { AuditActivitiesModel } from "./src/models/auditActivitiesModel.js";
import { AuditorsModel } from "./src/models/auditorsModel.js";
import { AuditedUnitsModel } from "./src/models/auditedUnitsModel.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("¡Bienvenido a la aplicación SiGO-DAI!");
});

app.use(
  "/api",
  createAuditActivityRouter({ auditActivitiesModel: AuditActivitiesModel })
);

app.use(
  "/api",
  createAuditedUnitsRouter({ auditedUnitsModel: AuditedUnitsModel })
);

app.use("/api", createAuditorsRouter({ auditorsModel: AuditorsModel }));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
