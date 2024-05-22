export class ActivityTypesController {
  constructor({ activityTypesModel }) {
    this.activityTypesModel = activityTypesModel;
  }
  getAllActivityTypes = async (req, res) => {
    const activityTypes = await this.activityTypesModel.getAllActivityTypes();
    res.status(200).json(activityTypes);
  };

  getActivityTypeById = async (req, res) => {
    const { id } = req.params;
    const activityType = await this.activityTypesModel.getActivityTypeById({
      id,
    });
    if (!activityType) {
      return res.status(404).json({ error: "Actividad no encontrada" });
    }
    res.status(200).json(activityType);
  };
}
