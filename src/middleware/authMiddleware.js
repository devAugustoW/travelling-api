import 'dotenv/config';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
	// pega o token do header
	const tokenHeader = req.headers.authorization;

	// verifica se o token foi enviado
	if (!tokenHeader) return res.status(401).json({ 
		message: 'Token não fornecido' 
	});

	// separa o Bearer do token
	const [, token] = tokenHeader.split(' ');

	try {
		// verifica se o token é válido
		const decoded = jwt.verify(token, JWT_SECRET);

		// adiciona o id do usuário na requisição
		req.userId = decoded.id;
		req.isVisitor = decoded.isVisitor || false;
		next();

	} catch (error) {
		return res.status(401).json({ 
			message: 'Token inválido' 
		});
	}
};

export default authMiddleware;