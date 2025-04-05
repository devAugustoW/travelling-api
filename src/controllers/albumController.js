import Album from '../models/albumSchema';
import Post from '../models/postSchema';

class AlbumController {
  // Cria album
  async store(req, res) {
    try {
			// resgata os dados do corpo da requisição
			const { 
        title, 
        description, 
        destination, 
				typeTrip,
        tripActivity,  
        difficulty, 
        timeTravel, 
        cost, 
        grade, 
        location 
      } = req.body;

      // adiciona o userId do token à requisição
      req.body.userId = req.userId;

			// criação do álbum com todos os campos
			const album = await Album.create({
				title,
				description,
				destination,
				typeTrip,
				tripActivity,  
				difficulty,
				timeTravel,
				cost,
				grade,
				location,
				userId: req.userId
			});

			// retorna a resposta com o álbum criado
      return res.status(201).json({
        message: 'Álbum criado com sucesso!',
        album
      });

    } catch (error) {
      console.log('Erro ao criar álbum:', error);
      return res.status(500).json({ 
        message: 'Erro no servidor', 
        error: error.message 
      });
    }
  }

	// Busca álbuns do usuário logado
  async getUserAlbums(req, res) {
    try {
      const albums = await Album.find({ userId: req.userId })
			.populate('userId', '-password')
			.populate('cover')
			.sort('-createdAt');

      return res.json({
        message: 'Álbuns encontrados com sucesso',
        count: albums.length,
        albums
      });

    } catch (error) {
      console.log('Erro ao buscar álbuns do usuário:', error);
      return res.status(500).json({ 
        message: 'Erro no servidor', 
        error: error.message 
      });
    }
  }

	// Busca álbum por id
	async getAlbumById(req, res) {
		try {
			const album = await Album.findById(req.params.id);
			if (!album) {
				return res.status(404).json({ message: 'Álbum não encontrado' });
			}
			res.json(album);
		} catch (error) {
			res.status(500).json({ message: 'Erro no servidor', error: error.message });
		}
	};

	// Atualiza localização do álbum
	async updateLocation(req, res) {
		try {
			const { albumId } = req.params;
			const { latitude, longitude } = req.body;

			// Verifica se os dados necessários foram fornecidos
			if (!latitude || !longitude) {
				return res.status(400).json({ 
					message: 'Latitude e longitude são obrigatórios' 
				});
			}

			// Busca o álbum pelo ID
			const album = await Album.findById(albumId);

			// Verifica se o álbum existe
			if (!album) {
				return res.status(404).json({ message: 'Álbum não encontrado' });
			}

			// Verifica se o usuário é o dono do álbum
			if (album.userId.toString() !== req.userId) {
				return res.status(403).json({ 
					message: 'Você não tem permissão para atualizar este álbum' 
				});
			}

			// Atualiza apenas o campo location
			album.location = {
				latitude,
				longitude
			};

			// Salva as alterações
			await album.save();

			return res.json({
				message: 'Localização do álbum atualizada com sucesso',
				album
			});
		} catch (error) {
			console.log('Erro ao atualizar localização do álbum:', error);
			return res.status(500).json({ 
				message: 'Erro no servidor', 
				error: error.message 
			});
		}
	};

	// Atualiza título do álbum
	async updateTitle(req, res) {
		try {
			const { albumId } = req.params;
			const { title } = req.body;

			// busca o álbum pelo ID
			const album = await Album.findById(albumId);

			// verifica se o álbum existe
			if (!album) {
				return res.status(404).json({ message: 'Álbum não encontrado' });
			}

			// verifica se o usuário é o dono do álbum
			if (album.userId.toString() !== req.userId) {
				return res.status(403).json({ 
					message: 'Você não tem permissão para atualizar este álbum' 
				});
			}

			// atualiza apenas o campo title
			album.title = title;

			// salva as alterações
			await album.save();

			return res.json({
				message: 'Título do álbum atualizado com sucesso',
				album
			});

		} catch (error) {
			console.log('Erro ao atualizar título do álbum:', error);
			return res.status(500).json({ 
				message: 'Erro no servidor', 
				error: error.message 
			});
		}
	}

	// Atualiza descrição do álbum
	async updateDescription(req, res) {
		try {
			const { albumId } = req.params;
			const { description } = req.body;

			// busca o álbum pelo ID
			const album = await Album.findById(albumId);

			// verifica se o álbum existe
			if (!album) {
				return res.status(404).json({ message: 'Álbum não encontrado' });
			}

			// verifica se o usuário é o dono do álbum
			if (album.userId.toString() !== req.userId) {
				return res.status(403).json({ 
					message: 'Você não tem permissão para atualizar este álbum' 
				});
			}

			// atualiza apenas o campo description
			album.description = description;

			// salva as alterações
			await album.save();

			return res.json({
				message: 'Descrição do álbum atualizada com sucesso',
				album
			});

		} catch (error) {
			console.log('Erro ao atualizar descrição do álbum:', error);
			return res.status(500).json({ 
				message: 'Erro no servidor', 
				error: error.message 
			});
		}
	}

	// Deleta álbum e todos os seus posts
	async delete(req, res) {
    try {
      const { albumId } = req.params;
      
      // busca o álbum pelo ID
      const album = await Album.findById(albumId);
      
      // verifica se o álbum existe
      if (!album) {
        return res.status(404).json({ message: 'Álbum não encontrado' });
      }
      
      // verifica se o usuário é o dono do álbum
      if (album.userId.toString() !== req.userId) {
        return res.status(403).json({ 
          message: 'Você não tem permissão para deletar este álbum' 
        });
      }
      
      // deletar todos os posts associados ao álbum
      const deletePostsResult = await Post.deleteMany({ albumId });
      const postsDeleted = deletePostsResult.deletedCount;
      
      // deletar o álbum
      await Album.findByIdAndDelete(albumId);
      
      return res.json({
        message: 'Álbum e posts deletados com sucesso',
        details: {
          albumDeleted: true,
          postsDeleted
        }
      });
      
    } catch (error) {
      console.log('Erro ao deletar álbum:', error);
      return res.status(500).json({ 
        message: 'Erro no servidor', 
        error: error.message 
      });
    }
  }

	// Filtrar álbuns por tipo de viagem e/ou atividade
	async filterAlbums(req, res) {
		try {
			const { typeTrip, tripActivity } = req.query;
			
			// criar objeto de filtro com ID do usuário
			const filter = { userId: req.userId };
			
			// adicionar filtros se eles existirem na query
			if (typeTrip) filter.typeTrip = typeTrip;
			if (tripActivity) filter.tripActivity = tripActivity;
			
			console.log('Query recebida:', req.query);
			console.log('Filtro aplicado:', filter);
			
			// buscar álbuns com os filtros aplicados
			const albums = await Album.find(filter)
				.populate('userId', '-password')
				.populate('cover')
				.sort('-createdAt');
			
			return res.json({
				message: 'Álbuns filtrados com sucesso',
				count: albums.length,
				albums
			});
			
		} catch (error) {
			console.log('Erro ao filtrar álbuns:', error);
			return res.status(500).json({ 
				message: 'Erro no servidor', 
				error: error.message 
			});
		}
	}
	
}

export default new AlbumController();