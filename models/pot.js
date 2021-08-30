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
  startAt: {
    type: Date,
    required: true
  },
  stopAt: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
}));

