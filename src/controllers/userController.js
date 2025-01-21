import User from '../models/userSchema';


class UserController {
  // criar usuário
  async store(req, res) {
		try {
			// resgata os dados do corpo da requisição
			const { name, email, password } = req.body;

			// verifica se o usuário já existe
      let userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ error: 'Usuário já cadastrado.' });

			// salva o usuário no banco de dados
			const user = await User.create({ name, email, password });
			return res.status(201).json({ message: 'Usuário cadastrado com sucesso', user });
			
		} catch (error) {
			console.log('Erro ao criar usuário:', error);
      res.status(500).json({ message: 'Erro no servidor', error: error.message });
		}
  }

  // logar com autenticação
  async login(req, res) {
    
  }

  // listar usuários (rota protegida)
  async index(req, res) {
   
  }

  // atualizar usuário
  async update(req, res) {
    
  }

  // deletar usuário
  async delete(req, res) {
   
  }
}

export default new UserController();