import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express();	
mongoose.connect(process.env.MONGO_URI)
	.then(() => console.log('Conectado ao MongoDB!'))
	.catch((error) =>console.error('Erro ao conectar ao MongoDB:', error));

// CORS
app.use(cors({
  origin: '*', 
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
  	credentials: true,
	optionsSuccessStatus: 200 
}));

app.use(express.json());
app.use(routes);

export default app;