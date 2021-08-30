import mongoose from '../config/db.js';
const Schema = mongoose.Schema;

export default mongoose.model("Pot", mongoose.Schema({
  event: {
    type: String,
    required: true
  },
  outcomes:{
    type: Schema.Types.Mixed,
    required: true
  },
  buyIn: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  locked: {
    type: Boolean,
    required: true
  },
  creatorId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
}));

