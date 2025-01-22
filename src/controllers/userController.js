import User from '../models/userSchema';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class UserController {
  // criar usuário
  async store(req, res) {
		try {
			// resgata os dados do corpo da requisição
			const { name, email, password } = req.body;

			// verifica se o usuário já existe
      let userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ 
				error: 'Usuário já cadastrado.' 
			});

			// salva o usuário no banco de dados
			const user = await User.create({ name, email, password });

			// não retornar a senha na resposta
			user.password = undefined;

			// retornar a resposta com o usuário cadastrado
			return res.status(201).json({ 
				message: 'Usuário cadastrado com sucesso.', 
				user 
			});

		} catch (error) {
			console.log('Erro ao criar usuário:', error);
      res.status(500).json({ message: 'Erro no servidor', error: error.message });
		}
  }

  // logar com autenticação
  async login(req, res) {
		try {
			// extrair dados da requisição
		const { email, password } = req.body;

		// buscar usuário no banco de dados
    const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ 
			message: 'Email ou senha incorretos.' 
		});

		// comparar senhas
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) return res.status(400).json({ 
			message: 'Senha incorreta' 
		});

		// gerar Token
		const token = jwt.sign(
			{ id: user._id },
			
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRES_IN }
		);

		// não retornar a senha na resposta
		user.password = undefined;

		// retornar a resposta com o usuário logado
		return res.status(200).json({
      message: 'Login realizado com sucesso.',
      user,
      token
    });

		} catch (error) {
			console.log('Erro ao fazer login:', error);

			return res.status(500).json({ 
				message: 'Erro no servidor', 
				error: error.message 
			});
		}
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