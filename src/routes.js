import { Router } from 'express';
import UserController from './controllers/userController';
import AlbumController from './controllers/albumController';

import authMiddleware from './middleware/authMiddleware';

const routes = new Router();

// rotas públicas
routes.post('/user', UserController.store);
routes.post('/login', UserController.login);

// rotas user
routes.put('/user/:id', authMiddleware, UserController.update);
routes.get('/user', authMiddleware, UserController.show);	
routes.delete('/user/:id', authMiddleware, UserController.delete);


// rotas álbum
routes.post('/albums', authMiddleware, AlbumController.store);


export default routes;
