import { Router } from 'express';
import UserController from './controllers/userController';
import AlbumController from './controllers/albumController';
import PostController from './controllers/postController';
import authMiddleware from './middleware/authMiddleware';
import visitorMiddleware from './middleware/visitorMiddleware';

const routes = new Router();


// Rota para login como visitante
routes.post('/login-visitor', visitorMiddleware, UserController.loginAsVisitor);

// rotas públicas
routes.post('/user', UserController.store);
routes.post('/login', UserController.login);

// Middleware para todas as rotas abaixo
routes.use(authMiddleware);
// Middleware de visitante para as rotas protegidas
routes.use(visitorMiddleware);


// rotas user
routes.get('/user', UserController.show);	
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.delete);
routes.patch('/user/profile-image', UserController.updateProfileImage);
routes.get('/user/stats', AlbumController.getUserStats);


// rotas álbum
routes.post('/albums', AlbumController.store);
routes.get('/user/albums', AlbumController.getUserAlbums);
routes.get('/albums/filter', AlbumController.filterAlbums);
routes.get('/albums/:id', AlbumController.getAlbumById);
routes.patch('/albums/:albumId/location', AlbumController.updateLocation);
routes.patch('/albums/:albumId/title', AlbumController.updateTitle);
routes.patch('/albums/:albumId/description', AlbumController.updateDescription);
routes.delete('/albums/:albumId', AlbumController.delete);


// rotas post
routes.post('/posts', PostController.store);
routes.get('/posts/best', PostController.getBestPosts);
routes.get('/posts/search', PostController.searchPosts);
routes.get('/albums/:albumId/posts', PostController.getPostsByAlbum);
routes.get('/albums/:albumId/locations', PostController.getPostLocationsByAlbum);
routes.get('/posts/:id', PostController.getPostById);
routes.patch('/posts/:postId', PostController.updatePost);
routes.patch('/posts/:postId/grade', PostController.updateGrade);
routes.delete('/posts/:postId', PostController.delete);


export default routes;
