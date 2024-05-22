export class AuditorsController {
  constructor({ auditorsModel }) {
    this.auditorsModel = auditorsModel;
  }
  getAllAuditors = async (req, res) => {
    const auditors = await this.auditorsModel.getAllAuditors();
    res.status(200).json(auditors);
  };

  getAuditorById = async (req, res) => {
    const { id } = req.params;
    const auditor = await this.auditorsModel.getAuditorById({ id });
    if (!auditor) {
      return res.status(404).json({ error: "Auditor no encontrado" });
    }
    res.status(200).json(auditor);
  };

  createAuditor = async (req, res) => {
    const auditor = req.body;
    const id = await this.auditorsModel.createAuditor({ auditor });
    res.status(201).json({ id });
  };

  updateAuditor = async (req, res) => {
    const { id } = req.params;
    const modifiedAuditor = req.body;
    await this.auditorsModel.updateAuditor({ id, modifiedAuditor });
    res.status(204).end();
  };

  deleteAuditor = async (req, res) => {
    const { id } = req.params;
    await this.auditorsModel.deleteAuditor({ id });
    res.status(204).end();
  };
}
