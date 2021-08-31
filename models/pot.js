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
  firstOutcome: {
    type: String,
    required: true
  },
  secondOutcome: {
    type: String,
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
  finalOutcome: {
    type: String,
    required: false
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

