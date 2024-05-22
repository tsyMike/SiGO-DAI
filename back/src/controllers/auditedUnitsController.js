export class AuditedUnitsController {
  constructor({ auditedUnitsModel }) {
    this.auditedUnitsModel = auditedUnitsModel;
  }
  getAllAuditedUnits = async (req, res) => {
    const auditedUnits = await this.auditedUnitsModel.getAllAuditedUnits();
    res.status(200).json(auditedUnits);
  };
}
