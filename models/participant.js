const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    team_name: {
        type: String,
        required: true
    },
    wins: {
        type: Number,
        required: true
    },
    losses: {
        type: Number,
        required: true
    },
    ties: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('participant', participantSchema);