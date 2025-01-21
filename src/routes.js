import { Router } from 'express';
import UserController from './controllers/userController';

const routes = new Router();

// rota para criar um usuário
routes.post('/store', UserController.store);


export default routes;
