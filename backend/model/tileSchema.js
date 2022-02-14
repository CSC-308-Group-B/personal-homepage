const mongoose = require("mongoose");

const TileSchema = new mongoose.Schema(
    {
        tileType: {
            type: String,
            required: true,
            trim: true,
        },
        width: {
            type: Number,
            required: true,
        },
        posx: {
            type: Number,
            require: true
        },
        posy: {
            type: Number,
            required: true
        }
    }
);

module.exports = TileSchema;