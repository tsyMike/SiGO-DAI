export class ReportsController {
  constructor({ reportsModel }) {
    this.reportsModel = reportsModel;
  }
  getAllReports = async (req, res) => {
    const reports = await this.reportsModel.getAllReports();
    res.status(200).json(reports);
  };
  getReportById = async (req, res) => {
    const { id } = req.params;
    const report = await this.reportsModel.getReportById({ id });
    if (!report) {
      return res.status(404).json({ error: "Reporte no encontrado" });
    }
    res.status(200).json(report);
  };
  getReportsByActivity = async (req, res) => {
    const { id } = req.params;
    const reports = await this.reportsModel.getReportsByActivity({ id });
    if (!reports) {
        return res.status(404).json({ error: "Reportes no encontrado" }); 
      }
    res.status(200).json(reports);
  }
  getAuditableReports = async (req, res) => {
    const reports = await this.reportsModel.getAuditableReports();
    if (!reports) {
        return res.status(404).json({ error: "Reportes no encontrado" }); 
      }
    res.status(200).json(reports);
  }
  createReport = async (req, res) => {
    const { report } = req.body;
    const id = await this.reportsModel.createReport({ report });
    res.status(201).json({ id });
  };
  updateReport = async (req, res) => {
    const { id } = req.params;
    const { modifiedReport } = req.body;
    await this.reportsModel.updateReport({ id, modifiedReport });
    res.status(204).end();
  };
  deleteReport = async (req, res) => {
    const { id } = req.params;
    await this.reportsModel.deleteReport({ id });
    res.status(204).end();
  };
}
