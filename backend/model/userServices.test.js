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
            }
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
                data: {
                    list: [
                        {text: "Text1", status: 0},
                        {text: "Text2", status: 1},
                        {text: "Text3", status: 0}
                    ]
                }
            }
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
test("Remove tile from user by ids", async () => {
    const updatedUser = await userServices.removeTileFromUserByIds(userBolas.id, userBolas.tiles[0]._id);
    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe(userBolas.name);
    expect(updatedUser.email).toBe(userBolas.email);
    expect(updatedUser.tiles.length).toBe(userBolas.tiles.length - 1);
});

//updateTileFields()
test("Update tile fields", async () => {
    const newFields = {x: 1, width: 42}
    const updatedUser = await userServices.updateTileFields(userBolas._id, userBolas.tiles[1]._id, newFields);
    expect(updatedUser).toBeDefined();
    expect(updatedUser.tiles.length).toBe(userBolas.tiles.length);
    for (key of Object.keys(newFields)) {
        expect(updatedUser.tiles[1][key]).toBe(newFields[key]);
    }
});

//addTileListItem()
test("Add tile list item", async () => {
    const newItem = {text: "I'm a new item!", status: 200};
    const updatedUser = await userServices.addTileListItem(userRagavan._id, userRagavan.tiles[0]._id, newItem);
    const newIndex = userRagavan.tiles[0].data.list.length;
    for (key of Object.keys(newItem)) {
        expect(updatedUser.tiles[0].data.list[newIndex][key]).toBe(newItem[key]);
    }
});

//deleteTileListItem()
test("Delete tile list item", async () => {
    const updatedUser = await userServices.deleteTileListItem(userRagavan._id, userRagavan.tiles[0]._id, 1);
    expect(updatedUser.tiles[0].data.list.length).toBe(userRagavan.tiles[0].data.list.length - 1);
});

//updateTileListItem()
test("Update tile list item", async () => {
    const newFields = {text: "I've been updated", status: 2};
    const updatedUser = await userServices.updateTileListItem(userRagavan._id, userRagavan.tiles[0]._id, 2, newFields);
    expect(updatedUser.tiles[0].data.list[2].text).toBe(newFields.text);
    expect(updatedUser.tiles[0].data.list[2].status).toBe(newFields.status);
});