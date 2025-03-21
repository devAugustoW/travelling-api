import { Router } from 'express';
import UserController from './controllers/userController';
import AlbumController from './controllers/albumController';
import PostController from './controllers/postController';
import authMiddleware from './middleware/authMiddleware';

const routes = new Router();

// rotas públicas
routes.post('/user', UserController.store);
routes.post('/login', UserController.login);

// rotas user
routes.get('/user', authMiddleware, UserController.show);	
routes.put('/user/:id', authMiddleware, UserController.update);
routes.delete('/user/:id', authMiddleware, UserController.delete);


// rotas álbum
routes.post('/albums', authMiddleware, AlbumController.store);
routes.get('/user/albums', authMiddleware, AlbumController.getUserAlbums);
routes.get('/albums/:id', authMiddleware, AlbumController.getAlbumById);

// rotas post
routes.post('/posts', authMiddleware, PostController.store);
routes.get('/albums/:albumId/posts', authMiddleware, PostController.getPostsByAlbum);
routes.get('/posts/:id', authMiddleware, PostController.getPostById);
routes.patch('/posts/:postId/grade', authMiddleware, PostController.updateGrade);



export default routes;
