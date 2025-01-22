import { Router } from 'express';
import UserController from './controllers/userController';

const routes = new Router();

// criar um usuário
routes.post('/createuser', UserController.store);

// logar usuário
routes.post('/login', UserController.login);


export default routes;
