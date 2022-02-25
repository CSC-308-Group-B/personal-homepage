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
        return await userModel.findById(id) || undefined;
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

async function addTileListItem(userId, tileId, newItem) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        return await userModel.findOneAndUpdate(
            {
                _id: userId,
                "tiles._id": tileId
            },
            {
                $push: {"tiles.$.data.list": newItem}
            },
            {
                upsert: true,
                new:true,
                safe: true
            }
        )
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function deleteTileListItem(userId, tileId, itemIndex) {
    const userModel = getDbConnection().model("User", UserSchema);
    //mongoose doesn't make it easy to remove items from arrays by index.
    //So, we first add a "delete" field with the value of 1, and remove all items with delete: 1
    updateTileListItem(userId, tileId, itemIndex, {delete: 1});
    try {
        return await userModel.findOneAndUpdate(
            {
                _id: userId,
                "tiles._id": tileId
            },
            {
                $pull: {"tiles.$.data.list": {"delete": 1}}
            },
            {
                upsert: true,
                new:true,
                safe: true
            }
        )
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function updateTileListItem(userId, tileId, itemIndex, updatedFields) {
    const userModel = getDbConnection().model("User", UserSchema);
    let newFields = {};
    for (key of Object.keys(updatedFields)) {
        newFields[`tiles.$.data.list.${itemIndex}.${key}`] = updatedFields[key];
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
        )
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

exports.setDbConnection = setDbConnection;
exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.deleteUserById = deleteUserById;
exports.addUser = addUser;
exports.addTileToUserById = addTileToUserById;
exports.removeTileFromUserByIds = removeTileFromUserByIds;
exports.getUserByEmail = getUserByEmail;
exports.updateTileFields = updateTileFields;
exports.updateTileListItem = updateTileListItem;
exports.addTileListItem = addTileListItem;
exports.deleteTileListItem = deleteTileListItem;