const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    musics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "music"
    }],

    artists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }]

}, { timestamps: true });

const albumModel = mongoose.model("Album", albumSchema);

module.exports = albumModel;