// src/app.js
import express from "express";
import { createAuditActivityRouter } from "./src/routes/auditActivitiesRoutes.js";
import { createAuditorsRouter } from "./src/routes/auditorsRoutes.js";
import { createAuditedUnitsRouter } from "./src/routes/auditedUnitsRoutes.js";
import { createActivityTypesRouter } from "./src/routes/activityTypesRoutes.js";

import { AuditActivitiesModel } from "./src/models/auditActivitiesModel.js";
import { AuditorsModel } from "./src/models/auditorsModel.js";
import { AuditedUnitsModel } from "./src/models/auditedUnitsModel.js";
import { ActivityTypesModel } from "./src/models/activityTypesModel.js";

import cors from "cors";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000", // Cambia esto al dominio de tu frontend
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true, // Si necesitas enviar cookies o autenticación
};

app.use(cors(corsOptions));

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

app.use(
  "/api",
  createActivityTypesRouter({ activityTypesModel: ActivityTypesModel })
);

app.use("/api", createAuditorsRouter({ auditorsModel: AuditorsModel }));

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
