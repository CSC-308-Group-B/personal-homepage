const { Router } = require('express');
const mongoose = require('mongoose');
const UserSchema = require("./userSchema");

let dbConnection;

function setDbConnection(conn) {
    dbConnection = conn;
    return conn;
}

function getDbConnection() {
    if (!dbConnection) {
        const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.9qzfh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
        dbConnection = mongoose.createConnection(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    return dbConnection;
}

async function getUsers(){
    const userModel = getDbConnection().model("User", UserSchema);    
    try {
        return await userModel.find();
    } catch(error) {
        console.log(error);
        return undefined;
    }
}

async function getUserById(id){
    const userModel = getDbConnection().model("User", UserSchema);    
    try {
        return await userModel.findById(id);
    } catch(error) {
        console.log(error);
        return undefined;
    }
}

async function getUserByEmail(email){
    const userModel = getDbConnection().model("User", UserSchema);    
    try {
        return await userModel.findOne({ email:email }) || undefined;
    } catch(error) {
        console.log(error);
        return undefined;
    }
}

async function deleteUserById(id) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        return userModel.findByIdAndDelete(id) || undefined;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function addUser(user){
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        const userToAdd = new userModel(user);
        const savedUser = await userToAdd.save()
        return savedUser;
    } catch(error) {
        console.log(error);
        return false;
    }   
}

async function addTileToUserById(id, tile) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        return await userModel.findByIdAndUpdate(
            id,
            {$push: {"tiles": tile}},
            {new:true, safe: true, upsert: true}
        );
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function removeTileFromUserByIds(id, tileId) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        return await userModel.findByIdAndUpdate(
            id,
            {$pull: {"tiles": {"_id": tileId}}},
            {new:true, safe: true}
        );
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function updateTileFields(userId, tileId, updatedFields) {
    const userModel = getDbConnection().model("User", UserSchema);
    let newFields = {};
    for (key of Object.keys(updatedFields)) {
        newFields[`tiles.$.${key}`] = updatedFields[key];
    }
    try {
        return await userModel.findOneAndUpdate(
            {
                _id: userId,
                "tiles._id": tileId
            },
            {
                $set: newFields
            },
            {
                upsert: true,
                new:true,
                safe: true
            }
        );
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

exports.setDbConnection = setDbConnection; //tested
exports.getUserById = getUserById; //tested
exports.getUsers = getUsers; //tested
exports.deleteUserById = deleteUserById; //tested
exports.addUser = addUser; //tested
exports.addTileToUserById = addTileToUserById; //
exports.removeTileFromUserByIds = removeTileFromUserByIds; //
exports.getUserByEmail = getUserByEmail; //tested
exports.updateTileFields = updateTileFields; //