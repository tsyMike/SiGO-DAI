export class ObservationsController {
  constructor({ observationsModel }) {
    this.observationsModel = observationsModel;
  }
  getAllObservations = async (req, res) => {
    const observations = await this.observationsModel.getAllObservations();
    res.status(200).json(observations);
  };
  getObservationById = async (req, res) => {
    const { id } = req.params;
    const observation = await this.observationsModel.getObservationById({ id });
    return !observation
      ? res.status(404).json({ error: "Observación no encontrada" })
      : res.status(200).json(activity);
  };
  getObservationsByReport = async (req, res) => {
    const { id } = req.params;
    const observations = await this.observationsModel.getObservationsByReport({
      id,
    });
    res.status(200).json(observations);
  };
  createObservation = async (req, res) => {
    const observation = req.body;
    const id = await this.observationsModel.createObservation({ observation });
    res.status(201).json({ id });
  };
  deleteObservation = async (req, res) => {
    const { id } = req.params;
    await this.observationsModel.deleteObservation({ id });
    res.status(204).end();
  };
}
