const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        tiles: {
            type: Array
        }
    },
    {
        collection : 'users'
    }
);

module.exports = UserSchema;