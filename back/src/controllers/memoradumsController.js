export class MemoradumsController {
  constructor({ memorandumsModel }) {
    this.memorandumsModel = memorandumsModel;
  }
  getAllMemorandums = async (req, res) => {
    const memorandums = await this.memorandumsModel.getAllMemorandums();
    res.status(200).json(memorandums);
  };
  getMemoradumById = async (req, res) => {
    const { id } = req.params;
    const memoradum = await this.memorandumsModel.getMemorandumById({ id });
    if (!memoradum) {
      return res.status(404).json({ error: "Memoradum no encontrado" });
    }
    res.status(200).json(memoradum);
  };
  getMemoradumByActivity = async (req, res) => {
    const { id_activity } = req.params;
    const memoradum = await this.memorandumsModel.getMemorandumByActivity({
      id_activity,
    });
    if (!memoradum) {
      return res.status(404).json({ error: "Memoradum no encontrado" });
    }
    res.status(200).json(memoradum);
  };
  getMemorandumsByAuditor = async (req, res) => {
    const { id } = req.params;
    const memoradums = await this.memorandumsModel.getMemorandumsByAuditor({
      id,
    });
    res.status(200).json(memoradums);
  };
  createMemoradum = async (req, res) => {
    const memorandum = req.body;
    const id = await this.memorandumsModel.createMemoradum({ memorandum });
    res.status(201).json({ id });
  };
  updateMemorandum = async (req, res) => {
    const { id } = req.params;
    const memorandum = res.body;
    await this.memorandumsModel.updateMemorandum({ id, memorandum });
    res.status(204).end();
  };
  deleteMemorandum = async (req, res) => {
    const { id } = req.params;
    await this.memorandumsModel.deleteMemorandum({ id });
    res.status(204).end();
  };
}
