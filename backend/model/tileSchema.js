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
        x: {
            type: Number,
            require: true
        },
        y: {
            type: Number,
            required: true
        },
        data: {
            type: Object,
            required: false
        }
    }
);

module.exports = TileSchema;