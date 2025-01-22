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

			// busca usuário no banco de dados
    	const user = await User.findOne({ email });
			if (!user) return res.status(400).json({ 
				message: 'Email ou senha incorretos.' 
			});

			// compara senhas
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

		// retorna a resposta com o usuário logado
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

	// buscar usuário pelo ID
	async show(req, res) {
		try {
			// busca usuário pelo ID, inserido pelo middleware 
			const user = await User.findById(req.userId);
			if (!user) {
				return res.status(404).json({ 
					message: 'Usuário não encontrado' 
				});
			}
	
			// não retornar a senha na resposta
			user.password = undefined;
	
			// retorna a resposta com o usuário encontrado
			return res.json({
				user
			});
	
		} catch (error) {
			console.log('Erro ao buscar usuário:', error);
			return res.status(500).json({ 
				message: 'Erro no servidor', 
				error: error.message 
			});
		}
	}

  // atualizar usuário
  async update(req, res) {
		try {
			// busca usuário pelo ID, inserido pelo middleware 
			const user = await User.findById(req.userId);
			if (!user) return res.status(404).json({ 
			message: 'Usuário não encontrado' 
			});
    
			// extrai os dados do corpo da requisição
			const { name, oldPassword, password, userImg } = req.body;

			// atualiza se fornecido
			if (name) user.name = name;
			if (userImg) user.userImg = userImg;
			if (password) {
				// verifica se forneceu a senha antiga
				if (!oldPassword) {
					return res.status(400).json({ 
						message: 'Senha atual é necessária para alterar a senha' 
					});
				}

				// verifica se a senha antiga está correta
				const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
				if (!isPasswordValid) {
					return res.status(400).json({ 
						message: 'Senha atual incorreta' 
					});
				}

				// adiciona nova senha aos dados de atualização
				user.password = password;
			}

			// salva as alterações de edição do usuário
			await user.save();

			// Não retornar a senha na resposta
			user.password = undefined;

			// retorna a resposta com o usuário atualizado
			return res.json({
				message: 'Usuário atualizado com sucesso!',
				user
			});

		} catch (error) {
			console.log('Erro ao atualizar usuário:', error);
			return res.status(500).json({ 
				message: 'Erro no servidor', 
				error: error.message 
			});
		}
  }
	
	// deletar usuário
	async delete(req, res) {
		try {
			// busca usuário pelo ID, inserido pelo middleware 
			const user = await User.findById(req.userId);
			if (!user) {
				return res.status(404).json({ 
					message: 'Usuário não encontrado' 
				});
			}
	
			// deleta o usuário
			await User.findByIdAndDelete(req.userId);
	
			// retorna a resposta com o usuário deletado
			return res.json({
				message: 'Usuário deletado com sucesso'
			});
	
		} catch (error) {
			console.log('Erro ao deletar usuário:', error);
			return res.status(500).json({ 
				message: 'Erro no servidor', 
				error: error.message 
			});
		}
	}
}

export default new UserController();