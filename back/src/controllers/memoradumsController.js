export class MemoradumsController {
  constructor({ memoradumsModel }) {
    this.memoradumsModel = memoradumsModel;
  }
  getAllMemorandums = async (req, res) => {
    const memorandums = await this.memoradumsModel.getAllMemorandums();
    res.status(200).json(memorandums);
  };
  getMemoradumById = async (req, res) => {
    const { id } = req.params;
    const memoradum = await this.memoradumsModel.getMemoradumById({ id });
    if (!memoradum) {
      return res.status(404).json({ error: "Memoradum no encontrado" });
    }
    res.status(200).json(memoradum);
  };
  createMemoradum = async (req, res) => {
    const memorandum = req.body;
    const id = await this.memoradumsModel.createMemoradum({ memorandum });
    res.status(201).json({ id });
  };
  updateMemorandum = async (req, res) => {
    const { id } = req.params;
    const memorandum = res.body;
    await this.memoradumsModel.updateMemorandum({ id, memorandum });
    res.status(204).end();
  };
  deleteMemorandum = async (req, res) => {
    const { id } = req.params;
    await this.memoradumsModel.deleteMemorandum({ id });
    req.status(204).end();
  };
}
