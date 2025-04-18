import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  imagem: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  grade: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  cover: {
    type: Boolean,
    default: false
  },
  nameLocation: {
    type: String,
  },
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Post', postSchema);