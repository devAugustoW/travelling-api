import Album from '../models/albumSchema';

class AlbumController {
  // criar album
  async store(req, res) {
    try {
      // adiciona o userId do token à requisição
      req.body.userId = req.userId;

			// cria o álbum
      const album = await Album.create(req.body);

			// retorna a resposta com o álbum criado
      return res.status(201).json({
        message: 'Álbum criado com sucesso',
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