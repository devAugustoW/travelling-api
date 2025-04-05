import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
	typeTrip: {
    type: String,
    enum: ['forest', 'mountain', 'beach', 'city', 'work', 'trip'],
    required: true
  },
	destination: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
	tripActivity: {
    type: String,
    enum: ['caminhada', 'trilha', 'mergulho', 'pedal', 'desafio']
  },
	difficulty: {
    type: String,
    enum: ['fácil', 'médio', 'difícil'], 
		default: ""
  },
	timeTravel: {
    type: String,
		enum: ['30 - 60min', '60 - 90min', '90min - 2h', '2h - 3h', '+3h'],
		default: ""
  },
	cost: {
    type: String,
		enum: ['1K', '1K - 3K', '3K - 5K', '5K - 10K', '+10K'],
		default: ""
  },
  description: {
    type: String,
    required: true
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
  },
	grade: {
    type: Number,
    min: 0,
    max: 5
  }
}, {
  timestamps: true
});

export default mongoose.model('Album', albumSchema);