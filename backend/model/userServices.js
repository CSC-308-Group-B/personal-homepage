require('dotenv').config();
console.log(process.env);
const mongoose = require('mongoose');
const UserSchema = require("./userSchema");

let dbConnection;

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

async function deleteUserById(id) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        return userModel.findByIdAndDelete(id);
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

exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.deleteUserById = deleteUserById;
exports.addUser = addUser;