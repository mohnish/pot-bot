const mongoose = require("../config/db");

const membersOutcome = mongoose.Schema({
    home: {
        type: Array,
        required: false
    },
    away: {
        type: Array,
        required: false
    }
})

const potSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    outcome:{
        type: String,
        required: true
    },
    buyIn: {
        type: number,
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
    members: membersOutcome,
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Pot", potSchema);

