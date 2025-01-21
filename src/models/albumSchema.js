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
  destiny: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Fácil', 'Médio', 'Difícil'],
    required: true
  },
  timeTravel: {
    type: String,
		enum: ['30 - 60 min', '60 - 90min', '90min - 2h', '2h - 3h', '+3h'],
    required: true
  },
  custo: {
    type: String,
		enum: ['1k', '1k - 3k', '3k - 5k', '+10k'],	
    required: true
  },
  nota: {
    type: Number,
    min: 0,
    max: 5
  },
  location: {
    latitude: Number,
    longitude: Number
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