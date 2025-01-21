import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';

dotenv.config();

const app = express();	
mongoose.connect(process.env.MONGO_URI)
	.then(() => console.log('Conectado ao MongoDB!'))
	.catch((error) =>console.error('Erro ao conectar ao MongoDB:', error));

app.use(express.json());
app.use(routes);

export default app;