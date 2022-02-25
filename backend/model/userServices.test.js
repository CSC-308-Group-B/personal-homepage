const mongoose = require("mongoose");
const UserSchema = require("./userSchema");
const userServices = require("./userServices");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { add } = require("./tileSchema");

let mongoServer;
let conn;
let userModel;

let userBolas, userJace, userRagavan;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    conn = await mongoose.createConnection(uri, mongooseOpts);
    userModel = conn.model("User", UserSchema);
    userServices.setDbConnection(conn);
});

afterAll(async () => {
    await conn.dropDatabase();
    await conn.close();
    await mongoServer.stop();
});

beforeEach(async () => {
    //first dummyUser
    let dummyUser = {
        name: "Nicol Bolas",
        email: "dragon@gmail.com",
        tiles: [
            {
                tileType: "noTileType",
                width: 2,
                x: 0,
                y: 200,
            },
            {
                tileType: "noTileType",
                width: 2,
                x: 25,
                y: 400,
            },
            {
                tileType: "noTileType",
                width: 2,
                x: 75,
                y: 600,
            },
        ]
    }
    userBolas = new userModel(dummyUser);
    await userBolas.save();
    //second dummyUser
    dummyUser = {
        name: "Jace, the Mind Sculptor",
        email: "iforgot@gmail.com",
        tiles: [
            {
                tileType: "noTileType",
                width: 2,
                x: 0,
                y: 200,
            },
            {
                tileType: "noTileType",
                width: 2,
                x: 25,
                y: 400,
            },
            {
                tileType: "noTileType",
                width: 2,
                x: 75,
                y: 600,
            },
        ]
    }
    userJace = new userModel(dummyUser);
    await userJace.save();
    //third dummyUser
    dummyUser = {
        name: "Ragavan",
        email: "monke@gmail.com",
        tiles: [
            {
                tileType: "noTileType",
                width: 2,
                x: 0,
                y: 200,
            },
            {
                tileType: "noTileType",
                width: 2,
                x: 25,
                y: 400,
            },
            {
                tileType: "noTileType",
                width: 2,
                x: 75,
                y: 600,
            },
        ]
    }
    userRagavan = new userModel(dummyUser);
    await userRagavan.save();
});

afterEach(async () => {
    await userModel.deleteMany();
});


//TEST CASES:


//getUsers()
test("Fetching all users", async () => {
    const users = await userServices.getUsers();
    expect(users).toBeDefined();
    expect(users.length).toBeGreaterThan(0);
    expect(users.length).toBe(3);
});

//getUserById()
test("Fetching user by id - doesn't exist", async () => {
    const foundUser = await userServices.getUserById("notAnId");
    expect(foundUser).toBeUndefined();
});
test("Fetching user by id", async () => {
    const foundUser = await userServices.getUserById(userBolas._id);
    expect(foundUser).toBeDefined();
    expect(foundUser.name).toBe(userBolas.name);
    expect(foundUser.email).toBe(userBolas.email);
    expect(foundUser.tiles.length).toBe(userBolas.tiles.length);
});

//getUserByEmail()
test("Fetch user by email - doesn't exist", async () => {
    const foundUser = await userServices.getUserByEmail("fblthp@gmail.com");
    expect(foundUser).toBeUndefined();
});
test("Fetch user by email - exists", async () => {
    const foundUser = await userServices.getUserByEmail(userRagavan.email);
    expect(foundUser).toBeDefined();
    expect(foundUser.name).toBe(userRagavan.name);
});

//addUser()
test("add user - invalid", async () => {
    const userFblthp = {
        namasdfasdfe: "Fblthp",
        emasdfasdfasdail: "fblthp@gmail.com",
        tifasdfasdfasdfasdfasdfles: [
            {
                tileType: "noTileType",
                width: 2,
                x: 0,
                y: 200,
            },
        ]
    }
    const addedUser = await userServices.addUser(userFblthp);
    expect(addedUser).toBe(false);
});
test("add user", async () => {
    const userFblthp = {
        name: "Fblthp",
        email: "fblthp@gmail.com",
        tiles: [
            {
                tileType: "noTileType",
                width: 2,
                x: 0,
                y: 200,
            },
        ]
    }
    const addedUser = await userServices.addUser(userFblthp);
    expect(addedUser).toBeDefined();
    expect(addedUser.name).toBe(userFblthp.name);
    expect(addedUser.email).toBe(userFblthp.email);
    expect(addedUser.tiles.length).toBe(userFblthp.tiles.length);
});

//deleteUserById()
test("Delete user by id - doesn't exist", async () => {
    const deletedUser = await userServices.deleteUserById("61fdb8eca419f17fb12d92c4");
    expect(deletedUser).toBeNull();
});
test("Delete user by id", async () => {
    const deletedUser = await userServices.deleteUserById(userRagavan._id);
    expect(deletedUser).toBeDefined();
    expect(deletedUser.name).toBe(userRagavan.name);
    expect(deletedUser.email).toBe(userRagavan.email);
    expect(deletedUser.tiles.length).toBe(userRagavan.tiles.length);
    const noLongerExistingUser = await userServices.getUserById(deletedUser._id);
    expect(noLongerExistingUser).toBeUndefined();
});

//addTileToUserById()
test("Add tile to user by id", async () => {
    const updatedUser = await userServices.addTileToUserById(userBolas._id, {
        tileType: "noTileType",
        width: 2,
        x: 0,
        y: 200,
    });
    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe(userBolas.name);
    expect(updatedUser.email).toBe(userBolas.email);
    expect(updatedUser.tiles.length).toBe(userBolas.tiles.length + 1);
});

//removeTileFromUserByIds()
test("Remove tile to user by ids", async () => {
    const dummyUser = {
        name: "Fblthp",
        email: "fblthp@gmail.com",
        tiles: [{
            tileType: "noTileType",
            width: 2,
            x: 0,
            y: 200,
        }]
    }
    const result = new userModel(dummyUser);
    const addedUser = await result.save();
    expect(addedUser.tiles.length).toBe(1);
    const updatedUser = await userServices.removeTileFromUserByIds(addedUser.id, addedUser.tiles[0]._id);
    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe(addedUser.name);
    expect(updatedUser.email).toBe(addedUser.email);
    expect(updatedUser.tiles.length).toBe(addedUser.tiles.length - 1);
});

//updateTileFields()
test("Update tile fields", async () => {
    const foundUser = await userServices.getUserByEmail("monke@gmail.com");
    const newFields = {x: 1, width: 42}
    const updatedUser = await userServices.updateTileFields(foundUser._id, foundUser.tiles[1]._id, newFields);
    expect(updatedUser).toBeDefined();
    expect(updatedUser.tiles.length).toBe(foundUser.tiles.length);
    for (key of Object.keys(newFields)) {
        expect(key).toBeDefined();
        expect(updatedUser.tiles[1][key]).toBe(newFields[key]);
    }
});

//updateTileListItem()
test("Update tile list item", async () => {
    const dummyUser = {
        name: "Fblthp",
        email: "fblthp@gmail.com",
        tiles: [{
            tileType: "toDoList",
            width: 2,
            x: 0,
            y: 200,
            data: {
                list: [
                    {text: "Text1", status: 0},
                    {text: "Text2", status: 1},
                    {text: "Text3", status: 0}
                ]
            }
        }]
    }
    const result = new userModel(dummyUser);
    const addedUser = await result.save();
    const newFields = {text: "I've been updated", status: 2};
    const updatedUser = await userServices.updateTileListItem(addedUser._id, addedUser.tiles[0]._id, 2, newFields);
    expect(updatedUser.tiles[0].data.list[2].text).toBe("I've been updated");
    expect(updatedUser.tiles[0].data.list[2].status).toBe(2);
});