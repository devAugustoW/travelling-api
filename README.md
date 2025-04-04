# Travelling API

Uma API RESTful para gerenciar álbuns e fotos de viagens, permitindo aos usuários documentar suas experiências com avaliações, localizações e descrições detalhadas.

## 📋 Descrição do Projeto
O Travelling API é um backend desenvolvido em Node.js que oferece suporte a um aplicativo de gerenciamento de viagens. Os usuários podem criar álbuns temáticos para diferentes tipos de viagens (praia, montanha, cidade, etc.), adicionar fotos com localizações, avaliações e descrições detalhadas.

## 🚀 Funcionalidades Principais
### Álbuns
* Criação de álbuns com categorização por tipo de viagem
* Gerenciamento de informações como destino, dificuldade e custo
* Atualização de título, descrição e localização
* Sistema de avaliação média baseado nas fotos

### Posts (Fotos)
* Upload e gerenciamento de fotos com descrições
*Sistema de geolocalização para cada foto
*Avaliações individuais (0-5 estrelas)
* Seleção de foto de capa para álbuns
* Visualização das melhores fotos (grade 5)

### Usuários
* Login com criptografia de senha
* Autenticação via token JWT
* Controle de acesso aos álbuns e fotos

## 🛠️ Tecnologias Utilizadas
* Node.js
* Express
* MongoDB com Mongoose
* JWT para autenticação
* Cors para segurança
* Dotenv para variáveis de ambiente

## 📚 Documentação da API
### Rotas de Usuário
* POST /user - Criar novo usuário
* POST /login - Autenticar usuário
* GET /user - Obter dados do usuário
* PUT /user/:id - Atualizar usuário
* DELETE /user/:id - Deletar usuário

### Rotas de Álbum
* POST /albums - Criar álbum
* GET /user/albums - Listar álbuns do usuário
* GET /albums/:id - Obter álbum específico
* PATCH /albums/:albumId/location - Atualizar localização
* PATCH /albums/:albumId/title - Atualizar título
* PATCH /albums/:albumId/description - Atualizar descrição
* DELETE /albums/:albumId - Deletar álbum e seus posts

### Rotas de Post
* POST /posts - Criar post
* GET /posts/best - Listar melhores fotos
* GET /albums/:albumId/posts - Listar posts do álbum
* GET /albums/:albumId/locations - Listar localizações dos posts
* GET /posts/:id - Obter post específico
* PATCH /posts/:postId - Atualizar post
* PATCH /posts/:postId/grade - Atualizar avaliação
* DELETE /posts/:postId - Deletar post

## 🔐 Autenticação
A API utiliza JWT (JSON Web Token) para autenticação. Todas as rotas (exceto login e criação de usuário) requerem um token válido no header:

##  🛠 Projeto em construção
* Assim que finalizar, sinalizo as informações de execução do Travelling API

## ✒️ Autor
Augusto Dantas - @devaugustow