import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
	typeTrip: {
    type: String,
    enum: ['forest', 'mountain', 'beach', 'city', 'work', 'trip'],
    required: true
  },
	tripActivity: {
    type: String,
    enum: ['Caminhada', 'Trilha', 'Mergulho', 'Circuito', 'Desafio']
  },
  difficulty: {
    type: String,
    enum: ['Fácil', 'Médio', 'Difícil'], 
		default: ""
  },
  timeTravel: {
    type: String,
		enum: ['30 - 60min', '60 - 90min', '90min - 2h', '2h - 3h', '+3h'],
		default: ""
  },
  cost: {
    type: String,
		enum: ['1k', '1k - 3k', '3k - 5k', '5k - 10k', '+10k'],
		default: ""
  },
  grade: {
    type: Number,
    min: 0,
    max: 5
  },
  location: {
    latitude: { 
      type: Number
    },
    longitude: { 
      type: Number
    }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cover: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
}, {
  timestamps: true
});

export default mongoose.model('Album', albumSchema);