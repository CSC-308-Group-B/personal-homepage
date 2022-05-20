const mongoose = require("mongoose");
const UserSchema = require("./userSchema");
const userServices = require("./userServices");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let userModel;

const fakeId = "kyle0was0here0haha0lolol";

init = async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    conn = await mongoose.createConnection(uri, mongooseOpts);
    userModel = conn.model("User", UserSchema);
    userServices.setDbConnection(conn);
};

cleanup = async () => {
    await conn.dropDatabase();
    await conn.close();
    await mongoServer.stop();
};

exports.init = init;
exports.cleanup = cleanup;
