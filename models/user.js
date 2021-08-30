import mongoose from '../config/db.js';

export default mongoose.model("User", mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    memberId: {
        type: String,
        required: true
    }
}), "users");