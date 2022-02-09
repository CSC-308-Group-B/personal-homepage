const mongoose = require("mongoose");
const TileSchema = require("./tileSchema")

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        tiles: [TileSchema]
    },
    {
        collection : 'users'
    }
);

module.exports = UserSchema;