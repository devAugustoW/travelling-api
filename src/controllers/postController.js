import Post from '../models/postSchema';
import Album from '../models/albumSchema';

class PostController {
	// criar um post
  async store(req, res) {
    try {
      const { 
        title, 
        description, 
        imagem, 
        nameLocation, 
        location, 
        nota, 
        cover, 
        albumId 
      } = req.body;

      // Verificar se o álbum existe
      const albumExists = await Album.findById(albumId);
      if (!albumExists) {
        return res.status(404).json({ error: 'Álbum não encontrado' });
      }

      // Verificar se o usuário é o dono do álbum
      if (albumExists.userId.toString() !== req.userId) {
        return res.status(403).json({ error: 'Você não tem permissão para adicionar posts a este álbum' });
      }

			// novo post marcado como capa, atualizar outrros posts do álbum para cover: false
			if (cover) {
				await Post.updateMany(
					{ albumId, cover: true },
					{ cover: false }
				);
			}

      // cria o novo post
      const post = await Post.create({
        title,
        description,
        imagem,
        nameLocation,
        location,
        nota,
        cover,
        albumId,
        userId: req.userId
      });

      // Se for uma foto de capa, atualizar o álbum
      if (cover) {
        await Album.findByIdAndUpdate(albumId, { cover: post._id });
      }

      return res.status(201).json(post);
    } catch (error) {
      console.error('Erro ao criar post:', error);
      return res.status(500).json({ error: 'Erro ao criar post' });
    }
  }

	// buscar posts por álbum
	async getPostsByAlbum(req, res) {
    try {
      const { albumId } = req.params;

      // Verificar se o álbum existe
      const albumExists = await Album.findById(albumId);
      if (!albumExists) {
        return res.status(404).json({ error: 'Álbum não encontrado' });
      }

      // Verificar se o usuário tem permissão para ver o álbum
      if (albumExists.userId.toString() !== req.userId) {
        return res.status(403).json({ error: 'Você não tem permissão para visualizar os posts deste álbum' });
      }

      // Buscar todos os posts do álbum
      const posts = await Post.find({ albumId }).sort({ createdAt: -1 });

      return res.json(posts);
    } catch (error) {
      console.error('Erro ao buscar posts do álbum:', error);
      return res.status(500).json({ error: 'Erro ao buscar posts do álbum' });
    }
  }
}

export default new PostController();
