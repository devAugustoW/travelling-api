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
routes.patch('/albums/:albumId/location', authMiddleware, AlbumController.updateLocation);
routes.patch('/albums/:albumId/title', authMiddleware, AlbumController.updateTitle);
routes.patch('/albums/:albumId/description', authMiddleware, AlbumController.updateDescription);
routes.delete('/albums/:albumId', authMiddleware, AlbumController.delete);

// rotas post
routes.post('/posts', authMiddleware, PostController.store);
routes.get('/posts/best', authMiddleware, PostController.getBestPosts);
routes.get('/albums/:albumId/posts', authMiddleware, PostController.getPostsByAlbum);
routes.get('/albums/:albumId/locations', authMiddleware, PostController.getPostLocationsByAlbum);
routes.get('/posts/:id', authMiddleware, PostController.getPostById);
routes.patch('/posts/:postId', authMiddleware, PostController.updatePost);
routes.patch('/posts/:postId/grade', authMiddleware, PostController.updateGrade);
routes.delete('/posts/:postId', authMiddleware, PostController.delete);



export default routes;
