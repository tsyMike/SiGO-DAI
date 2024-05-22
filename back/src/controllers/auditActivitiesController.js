export class AuditActivitiesController {
  constructor({ auditActivitiesModel }) {
    this.auditActivitiesModel = auditActivitiesModel;
  }
  getAllActivities = async (req, res) => {
    const activities = await this.auditActivitiesModel.getAllActivities();
    res.status(200).json(activities);
  };

  getActivityById = async (req, res) => {
    const { id } = req.params;
    const activity = await this.auditActivitiesModel.getActivityById(id);
    if (!activity) {
      return res.status(404).json({ error: "Actividad no encontrada" });
    }
    res.status(200).json(activity);
  };

  createActivity = async (req, res) => {
    const activity = req.body;
    const id = await this.auditActivitiesModel.createActivity(activity);
    res.status(201).json({ id });
  };

  updateActivity = async (req, res) => {
    const { id } = req.params;
    const activity = req.body;
    await this.auditActivitiesModel.updateActivity(id, activity);
    res.status(204).end();
  };

  deleteActivity = async (req, res) => {
    await this.auditActivitiesModel.deleteActivity(id);
    res.status(204).end();
  };
}
