export class AuditedUnitsController {
  constructor({ auditedUnitsModel }) {
    this.auditedUnitsModel = auditedUnitsModel;
  }
  getAllAuditedUnits = async (req, res) => {
    const auditedUnits = await this.auditedUnitsModel.getAllAuditedUnits();
    res.status(200).json(auditedUnits);
  };
  getAuditedUnitById = async (req, res) => {
    const { id } = req.params;
    const auditedUnit = await this.auditedUnitsModel.getAuditedUnitById({ id });
    if (!auditedUnit) {
      return res.status(404).json({ error: "Unidad auditada no encontrada" });
    }
    res.status(200).json(auditedUnit);
  };
}
