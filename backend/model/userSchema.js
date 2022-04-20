const mongoose = require("mongoose");

const ListItemSchema = new mongoose.Schema(
    {
        type: Object,
        required: false,
    },
    {
        strict: false,
    }
);

const TileSchema = new mongoose.Schema({
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
        require: true,
    },
    y: {
        type: Number,
        required: true,
    },
    data: {
        type: Object,
        required: false,
    },
    list: {
        type: [ListItemSchema],
        default: undefined,
        required: false,
    },
});

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
        tiles: [TileSchema],
        backgroundColor: {
            type: String,
            required: false,
            default: "#ffffff",
        },
        backgroundImage: {
            type: String,
            required: false,
            default: "",
        },
    },
    {
        collection: "users",
    }
);

module.exports = UserSchema;
