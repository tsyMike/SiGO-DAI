export class UsersLoginController {
  constructor({ usersLoginModel }) {
    this.usersLoginModel = usersLoginModel;
  }
  login = async (req, res) => {
    const credentials = req.body;
    try {
      const userData = await this.usersLoginModel.login({ credentials });
      if (!userData || Object.keys(userData).length === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.status(200).json(userData);
    } catch (error) {
      console.error("Error en el controlador de login:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };
}
