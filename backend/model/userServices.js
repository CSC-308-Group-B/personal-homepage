const { Router } = require("express");
const mongoose = require("mongoose");
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

async function getUsers() {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        return (await userModel.find()) || undefined;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function getUserById(id) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        return (await userModel.findById(id)) || undefined;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function getUserByEmail(email) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        return (await userModel.findOne({ email: email })) || undefined;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function deleteUserById(id) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        return (await userModel.findByIdAndDelete(id)) || undefined;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function addUser(user) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        const userToAdd = new userModel(user);
        const savedUser = await userToAdd.save();
        return savedUser;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function setUserFields(userId, newFields) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        return (
            (await userModel.findByIdAndUpdate(userId, newFields, {
                new: true,
            })) || undefined
        );
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function addTileToUserById(id, tile) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        return (
            (await userModel.findByIdAndUpdate(
                id,
                { $push: { tiles: tile } },
                { new: true, safe: true, upsert: true }
            )) || undefined
        );
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function removeTileFromUserByIds(id, tileId) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        return (
            (await userModel.findByIdAndUpdate(
                id,
                { $pull: { tiles: { _id: tileId } } },
                { new: true, safe: true }
            )) || undefined
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
        return (
            (await userModel.findOneAndUpdate(
                {
                    _id: userId,
                    "tiles._id": tileId,
                },
                {
                    $set: newFields,
                },
                {
                    upsert: true,
                    new: true,
                    safe: true,
                }
            )) || undefined
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
                "tiles._id": tileId,
            },
            {
                $push: { "tiles.$.list": newItem },
            },
            {
                upsert: true,
                new: true,
                safe: true,
            }
        );
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function getTileListItem(user, tileId, newItem) {
    for (tile of user.tiles) {
        if (tile._id == tileId) {
            outerloop: for (item of tile.list) {
                for (key of Object.keys(newItem)) {
                    if (item[key] != newItem[key]) continue outerloop;
                }
                return item;
            }
        }
    }
    return undefined;
}

async function deleteTileListItem(userId, tileId, itemId) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        return (
            (await userModel.findOneAndUpdate(
                {
                    _id: userId,
                    "tiles._id": tileId,
                },
                {
                    $pull: { "tiles.$.list": { _id: itemId } },
                },
                {
                    upsert: true,
                    new: true,
                    safe: true,
                }
            )) || undefined
        );
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function updateTileListItem(userId, tileId, itemId, updatedFields) {
    const userModel = getDbConnection().model("User", UserSchema);
    //multiple positional ($) operators are not allowed, so we must find the index manually
    const oldUser = await getUserById(userId);
    if (!oldUser) return undefined;
    let tileIndex = -1;
    let found = false;
    for (tile of oldUser.tiles) {
        tileIndex++;
        if (tile._id.toString() == tileId.toString()) {
            found = true;
            break;
        }
    }
    if (!found) return undefined;
    //now, create the new fields object
    let newFields = {};
    for (key of Object.keys(updatedFields)) {
        newFields[`tiles.${tileIndex}.list.$.${key}`] = updatedFields[key];
    }
    //and create the query object
    let queryObject = {
        _id: userId,
    };
    queryObject[`tiles.${tileIndex}.list._id`] = itemId;
    //mongoose query
    try {
        return (
            (await userModel.findOneAndUpdate(
                queryObject,
                {
                    $set: newFields,
                },
                {
                    upsert: true,
                    new: true,
                    safe: true,
                }
            )) || undefined
        );
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
exports.setUserFields = setUserFields;
exports.addTileToUserById = addTileToUserById;
exports.removeTileFromUserByIds = removeTileFromUserByIds;
exports.getUserByEmail = getUserByEmail;
exports.updateTileFields = updateTileFields;
exports.updateTileListItem = updateTileListItem;
exports.addTileListItem = addTileListItem;
exports.deleteTileListItem = deleteTileListItem;
exports.getTileListItem = getTileListItem;
