const mongoose = require("../config/db");
var Schema = mongoose.Schema;

const potSchema = mongoose.Schema({
    potId: {
        type: String,
        required: true
    },
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
    creatorId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Pot", potSchema);

