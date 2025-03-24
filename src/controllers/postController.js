import Post from '../models/postSchema';
import Album from '../models/albumSchema';

// função para atualizar o grade do Album
async function updateAlbumGrade(albumId) {
  try {
    // busca todos os posts do álbum com grade maior que zero
    const posts = await Post.find({ albumId, grade: { $gt: 0 } });
    
    // se não houver posts com grade, definir grade como 0
    if (posts.length === 0) {
      await Album.findByIdAndUpdate(albumId, { grade: 0 });
      return;
    }
    
    // calcula a média das notas
    const totalGrade = posts.reduce((sum, post) => sum + post.grade, 0);
    const averageGrade = totalGrade / posts.length;
    
    // atualiza o grade do álbum
    await Album.findByIdAndUpdate(albumId, { grade: averageGrade });
  } catch (error) {
    console.error('Erro ao atualizar nota do álbum:', error);
  }
}

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
        grade, 
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
        grade,
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

	// buscar post por ID
	async getPostById(req, res) {
		try {
			const { id } = req.params;
			
			// Busca o post pelo ID
			const post = await Post.findById(id);
			
			// Verifica se o post existe
			if (!post) {
				return res.status(404).json({ error: 'Post não encontrado' });
			}
			
			// Verificar se o usuário tem permissão para ver o post
			// Buscar o álbum relacionado ao post
			const album = await Album.findById(post.albumId);
			
			if (!album || album.userId.toString() !== req.userId) {
				return res.status(403).json({ error: 'Você não tem permissão para visualizar este post' });
			}
			
			return res.json(post);
		} catch (error) {
			console.error('Erro ao buscar post por ID:', error);
			return res.status(500).json({ error: 'Erro ao buscar post' });
		}
	}

	// atualizar dados do post
	async updatePost(req, res) {
		try {
			const { postId } = req.params;
			const updates = req.body;

			// busca o post
			const post = await Post.findById(postId);

			// verifica se o post existe
			if (!post) {
				return res.status(404).json({ error: 'Post não encontrado' });
			}

			// verifica se o usuário é o dono do post
			if (post.userId.toString() !== req.userId) {
				return res.status(403).json({ error: 'Você não tem permissão para atualizar este post' });
			}

			// atualiza apenas os campos que foram modificados
			Object.keys(updates).forEach((key) => {
				if (post[key] !== undefined) {
					post[key] = updates[key];
				}
			});

			await post.save();

			return res.json(post);
		} catch (error) {
			console.error('Erro ao atualizar post:', error);
			return res.status(500).json({ error: 'Erro ao atualizar post' });
		}
	}

	// atualiza grade do post
  async updateGrade(req, res) {
    try {
      const { postId } = req.params;
      const { grade } = req.body;

      // valida se a grade está dentro do intervalo permitido (0-5)
      if (grade < 0 || grade > 5) {
        return res.status(400).json({ error: 'A nota deve estar entre 0 e 5' });
      }

      // busca o post
      const post = await Post.findById(postId);
      
      // verifica se o post existe
      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }

      // verifica se o usuário é o dono do post
      if (post.userId.toString() !== req.userId) {
        return res.status(403).json({ error: 'Você não tem permissão para atualizar este post' });
      }

      // atualiza a grade do post
      post.grade = grade;
      await post.save();

			// Atualizar a nota do álbum
      await updateAlbumGrade(post.albumId);

      return res.json(post);
    } catch (error) {
      console.error('Erro ao atualizar nota do post:', error);
      return res.status(500).json({ error: 'Erro ao atualizar nota do post' });
    }
  }

  // buscar localizações de posts por álbum
  async getPostLocationsByAlbum(req, res) {
    try {
      const { albumId } = req.params;

      // verifica se o álbum existe
      const albumExists = await Album.findById(albumId);
      if (!albumExists) {
        return res.status(404).json({ error: 'Álbum não encontrado' });
      }

      // verifica se o usuário tem permissão para ver o álbum
      if (albumExists.userId.toString() !== req.userId) {
        return res.status(403).json({ error: 'Você não tem permissão para visualizar este álbum' });
      }

      // busca todos os posts do álbum que possuem localização
      const postsWithLocation = await Post.find(
        { 
          albumId, 
          location: { $exists: true },
          'location.latitude': { $exists: true, $ne: null },
          'location.longitude': { $exists: true, $ne: null }
        },
        'title nameLocation location'  // seleciona apenas os campos necessários
      );

      // formata os dados da resposta
      const locations = postsWithLocation.map(post => ({
        id: post._id,
        title: post.title,
        nameLocation: post.nameLocation,
        location: post.location
      }));

      return res.json({
        message: 'Localizações encontradas com sucesso',
        count: locations.length,
        locations
      });
    } catch (error) {
      console.error('Erro ao buscar localizações dos posts:', error);
      return res.status(500).json({ error: 'Erro ao buscar localizações dos posts' });
    }
  }
}

export default new PostController();
