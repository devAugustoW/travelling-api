import Album from '../models/albumSchema';

class AlbumController {
  // criar album
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

	// buscar álbuns do usuário logado
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
}

export default new AlbumController();