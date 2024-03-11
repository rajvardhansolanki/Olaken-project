const mongoose = require('mongoose');

const cineNameSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  isVideoPlayed: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  hasUserLiked: { type: Boolean, default: false },
  shareCount: { type: Number, default: 0 },
});



const CineName = mongoose.model('CineName', cineNameSchema);

export default CineName;
