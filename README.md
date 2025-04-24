# Travelling API

## 📋 Descrição do Projeto
O Travelling API é um backend desenvolvido em Node.js que oferece suporte a um aplicativo de gerenciamento de viagens. Os usuários podem criar álbuns temáticos para diferentes tipos de viagens (praia, montanha, cidade, etc.), adicionar fotos com localizações, avaliações e descrições detalhadas, percorrer em mapa interativo os pontos turísticos visitados.

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
* Modo visitante para explorar conteúdo demonstrativo

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
* POST /login-visitor - Acessar como visitante (modo demonstração)
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
A API utiliza JWT (JSON Web Token) para autenticação. Todas as rotas (exceto login e criação de usuário) requerem um token válido.

### Modo Visitante
O sistema possui um modo de demonstração onde visitantes podem:
* Acessar a aplicação sem necessidade de cadastro
* Explorar todos os álbuns e fotos do usuário demonstrativo
* Visualizar localizações e avaliações
* Restrições: não é permitido criar, editar ou deletar conteúdo

##  🛠 Get Started
Siga estas instruções para configurar e rodar a API localmente.

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- MongoDB Atlas (conta e cluster configurado)

### Configuração e Execução
1. Faça o download do repositório do projeto


2. Instale as dependências do projeto:
```bash
yarn install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione as seguintes variáveis:
```env
# MongoDB
MONGO_URI=sua_uri_do_mongodb_atlas

# JWT
JWT_SECRET=seu_jwt_secret_key
JWT_EXPIRES_IN=24h

# Server
PORT=3333
```

4. Configure o MongoDB Atlas:
   - Crie um cluster no MongoDB Atlas
   - Configure o IP de acesso na whitelist do MongoDB Atlas
   - Copie a URI de conexão e adicione no `.env`

5. Inicie o servidor de desenvolvimento:
```bash
yarn dev
```

### Testando a API
- A API estará disponível em `http://localhost:3333`
- Use ferramentas como Postman ou Insomnia para testar os endpoints
- Para testar o modo visitante, use o endpoint `/login-visitor`
- Baixe o nosso projeto frontend e veja a aplicação por completo: https://github.com/devAugustoW/travelling-app


## ✒️ Autor
Augusto Dantas - @devaugustow
