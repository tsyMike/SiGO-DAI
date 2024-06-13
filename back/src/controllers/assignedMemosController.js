export class AssignedMemosController {
  constructor({ assignedMemosModel }) {
    this.assignedMemosModel = assignedMemosModel;
  }
  getAllAssignedMemos = async (req, res) => {
    const assignedMemorandums =
      await this.assignedMemosModel.getAllAssignedMemos();
    res.status(200).json(assignedMemorandums);
  };
  getAssignedMemosByAuditor = async (req, res) => {
    const { id } = req.params;
    const assignedMemorandum =
      await this.assignedMemosModel.getAssignedMemosByAuditor({ id });
    if (!assignedMemorandum) {
      return res
        .status(404)
        .json({ error: "Memoradum asignado no encontrado" });
    }
    res.status(200).json(assignedMemorandum);
  };
  getAssignedMemosByMemo = async (req, res) => {
    const { id } = req.params;
    const assignedMemorandum =
      await this.assignedMemosModel.getAssignedMemosByMemo({ id });
    if (!assignedMemorandum) {
      return res
        .status(404)
        .json({ error: "Memoradum asignado no encontrado" });
    }
    res.status(200).json(assignedMemorandum);
  };
  createAssignedMemo = async (req, res) => {
    const assignedMemo = req.body;
    const id = await this.assignedMemosModel.createAssignedMemo({
      assignedMemo,
    });
    res.status(201).json({ id });
  };
  updateAssignedMemo = async (req, res) => {};
  deleteAssignedMemo = async (req, res) => {
    const { idMemo, ci } = req.body;
    await this.assignedMemosModel.deleteAssignedMemo({ idMemo, ci });
    res.status(204).end();
  };
}
