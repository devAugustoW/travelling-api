import { Router } from 'express';
import UserController from './controllers/userController';

import authMiddleware from './middleware/authMiddleware';

const routes = new Router();

// rotas públicas
routes.post('/createuser', UserController.store);
routes.post('/login', UserController.login);

// atualizar usuário
routes.put('/updateuser/:id', authMiddleware, UserController.update);
routes.get('/user', authMiddleware, UserController.show);

export default routes;
