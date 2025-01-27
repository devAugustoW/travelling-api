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
}

export default new AlbumController();