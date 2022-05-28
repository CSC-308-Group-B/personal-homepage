const mongoose = require("mongoose");
const UserSchema = require("./userSchema");
const userServices = require("./userServices");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let userModel;

let userBolas, userJace, userRagavan;

const fakeId = "kyle0was0here0haha0lolol";

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
            {
                tileType: "noTileType",
                width: 3,
                x: 0,
                y: 700,
            },
            {
                tileType: "noTileType",
                width: 1,
                x: 25,
                y: 800,
            },
        ],
    };
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
        ],
    };
    userJace = new userModel(dummyUser);
    await userJace.save();
    //third dummyUser
    dummyUser = {
        name: "Ragavan",
        email: "monke@gmail.com",
        tiles: [
            {
                tileType: "toDoListTile",
                width: 2,
                x: 0,
                y: 200,
                data: {},
                list: [
                    { text: "Text1", status: 0 },
                    { text: "Text2", status: 1 },
                    { text: "Text3", status: 0 },
                ],
            },
        ],
    };
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
test("Fetching user by id", async () => {
    const foundUser = await userServices.getUserById(userBolas._id);
    expect(foundUser).toBeDefined();
    expect(foundUser.name).toBe(userBolas.name);
    expect(foundUser.email).toBe(userBolas.email);
    expect(foundUser.tiles.length).toBe(userBolas.tiles.length);
});
test("Fetching user by id (bad id)", async () => {
    const foundUser = await userServices.getUserById(fakeId);
    expect(foundUser).toBeUndefined();
});

//getUserByEmail()
test("Fetch user by email", async () => {
    const foundUser = await userServices.getUserByEmail(userRagavan.email);
    expect(foundUser).toBeDefined();
    expect(foundUser.name).toBe(userRagavan.name);
});
test("Fetch user by email (bad email)", async () => {
    const foundUser = await userServices.getUserByEmail("fblthp@gmail.com");
    expect(foundUser).toBeUndefined();
});

//addUser()
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
        ],
    };
    const addedUser = await userServices.addUser(userFblthp);
    expect(addedUser).toBeDefined();
    expect(addedUser.name).toBe(userFblthp.name);
    expect(addedUser.email).toBe(userFblthp.email);
    expect(addedUser.tiles.length).toBe(userFblthp.tiles.length);
});
test("add user (bad schema)", async () => {
    const userFblthp = {
        lorem: "Fblthp",
        ipsum: "fblthp@gmail.com",
        random: [
            {
                well: "noTileType",
                hello: 2,
                there: 0,
                O: 200,
            },
        ],
    };
    const addedUser = await userServices.addUser(userFblthp);
    expect(addedUser).toBeUndefined();
});

//deleteUserById()
test("Delete user by id", async () => {
    const deletedUser = await userServices.deleteUserById(userRagavan._id);
    expect(deletedUser).toBeDefined();
    expect(deletedUser.name).toBe(userRagavan.name);
    expect(deletedUser.email).toBe(userRagavan.email);
    expect(deletedUser.tiles.length).toBe(userRagavan.tiles.length);
    const noLongerExistingUser = await userServices.getUserById(
        deletedUser._id
    );
    expect(noLongerExistingUser).toBeUndefined();
});
test("Delete user by id (bad userId)", async () => {
    const deletedUser = await userServices.deleteUserById(fakeId);
    expect(deletedUser).toBeUndefined();
});

//setUserFields()
test("Set user fields", async () => {
    const newFields = { email: "sakashimaTheImpostor@gmail.com" };
    const updatedUser = await userServices.setUserFields(
        userJace._id,
        newFields
    );
    expect(updatedUser).toBeDefined();
    for (key of Object.keys(newFields)) {
        expect(updatedUser[key]).toBe(newFields[key]);
    }
});
test("Set user fields (bad userId)", async () => {
    const updatedUser = await userServices.setUserFields(fakeId, {});
    expect(updatedUser).toBeUndefined();
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
test("Add tile to user by id (bad userId)", async () => {
    const updatedUser = await userServices.addTileToUserById(fakeId, {});
    expect(updatedUser).toBeUndefined();
});

//removeTileFromUserByIds()
test("Remove tile from user by ids", async () => {
    const updatedUser = await userServices.removeTileFromUserByIds(
        userBolas.id,
        userBolas.tiles[0]._id
    );
    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe(userBolas.name);
    expect(updatedUser.email).toBe(userBolas.email);
    expect(updatedUser.tiles.length).toBe(userBolas.tiles.length - 1);
});
test("Remove tile from user by ids (bad userId)", async () => {
    const updatedUser = await userServices.removeTileFromUserByIds(
        fakeId,
        userBolas.tiles[0]._id
    );
    expect(updatedUser).toBeUndefined();
});
test("Remove tile from user by ids (bad tileId)", async () => {
    const updatedUser = await userServices.removeTileFromUserByIds(
        userBolas.id,
        fakeId
    );
    expect(updatedUser).toBeUndefined();
});

//updateTileFields()
test("Update tile fields", async () => {
    const newFields = { x: 1, width: 42 };
    const updatedUser = await userServices.updateTileFields(
        userBolas._id,
        userBolas.tiles[1]._id,
        newFields
    );
    expect(updatedUser).toBeDefined();
    expect(updatedUser.tiles.length).toBe(userBolas.tiles.length);
    for (key of Object.keys(newFields)) {
        expect(updatedUser.tiles[1][key]).toBe(newFields[key]);
    }
});
test("Update tile fields (bad userId)", async () => {
    const updatedUser = await userServices.updateTileFields(
        fakeId,
        userBolas.tiles[1]._id,
        {}
    );
    expect(updatedUser).toBeUndefined();
});
test("Update tile fields (bad tileId)", async () => {
    const updatedUser = await userServices.updateTileFields(
        userBolas._id,
        fakeId,
        {}
    );
    expect(updatedUser).toBeUndefined();
});

//updateTileDataFields()
test("Update tile data fields", async () => {
    const newFields = { dataField: 1, something: "hello world" };
    const updatedUser = await userServices.updateTileDataFields(
        userBolas._id,
        userBolas.tiles[1]._id,
        newFields
    );
    expect(updatedUser).toBeDefined();
    expect(updatedUser.tiles.length).toBe(userBolas.tiles.length);
    for (key of Object.keys(newFields)) {
        expect(updatedUser.tiles[1].data[key]).toBe(newFields[key]);
    }
});
test("Update tile fields (bad userId)", async () => {
    const updatedUser = await userServices.updateTileDataFields(
        fakeId,
        userBolas.tiles[1]._id,
        {}
    );
    expect(updatedUser).toBeUndefined();
});
test("Update tile fields (bad tileId)", async () => {
    const updatedUser = await userServices.updateTileDataFields(
        userBolas._id,
        fakeId,
        {}
    );
    expect(updatedUser).toBeUndefined();
});

//addTileListItem()
test("Add tile list item", async () => {
    const newItem = { text: "I'm a new item!", status: 200 };
    const updatedUser = await userServices.addTileListItem(
        userRagavan._id,
        userRagavan.tiles[0]._id,
        newItem
    );
    const newIndex = userRagavan.tiles[0].list.length;
    for (key of Object.keys(newItem)) {
        expect(updatedUser.tiles[0].list[newIndex][key]).toBe(newItem[key]);
    }
});
test("Add tile list item (bad userId)", async () => {
    const updatedUser = await userServices.addTileListItem(
        fakeId,
        userRagavan.tiles[0]._id,
        {}
    );
    expect(updatedUser).toBeUndefined();
});
test("Add tile list item (bad tileId)", async () => {
    const updatedUser = await userServices.addTileListItem(
        userRagavan._id,
        fakeId,
        {}
    );
    expect(updatedUser).toBeUndefined();
});

//deleteTileListItem()
test("Delete tile list item", async () => {
    const updatedUser = await userServices.deleteTileListItem(
        userRagavan._id,
        userRagavan.tiles[0]._id,
        userRagavan.tiles[0].list[0]._id
    );
    expect(updatedUser.tiles[0].list.length).toBe(
        userRagavan.tiles[0].list.length - 1
    );
});
test("Delete tile list item (bad userId)", async () => {
    const updatedUser = await userServices.deleteTileListItem(
        fakeId,
        userRagavan.tiles[0]._id,
        userRagavan.tiles[0].list[0]._id
    );
    expect(updatedUser).toBeUndefined();
});
test("Delete tile list item (bad tileId)", async () => {
    const updatedUser = await userServices.deleteTileListItem(
        userRagavan._id,
        fakeId,
        userRagavan.tiles[0].list[0]._id
    );
    expect(updatedUser).toBeUndefined();
});
test("Delete tile list item (bad itemId)", async () => {
    const updatedUser = await userServices.deleteTileListItem(
        userRagavan._id,
        userRagavan.tiles[0]._id,
        fakeId
    );
    expect(updatedUser).toBeUndefined();
});

//updateTileListItem()
test("Update tile list item", async () => {
    const newFields = { text: "I've been updated", status: 400 };
    const itemIndex = 1;
    const updatedUser = await userServices.updateTileListItem(
        userRagavan._id,
        userRagavan.tiles[0]._id,
        userRagavan.tiles[0].list[itemIndex]._id,
        newFields
    );
    for (key of Object.keys(newFields)) {
        expect(updatedUser.tiles[0].list[itemIndex][key]).toBe(newFields[key]);
    }
});
test("Update tile list item (bad userId)", async () => {
    const updatedUser = await userServices.updateTileListItem(
        fakeId,
        userRagavan.tiles[0]._id,
        userRagavan.tiles[0].list[0]._id,
        {}
    );
    expect(updatedUser).toBeUndefined();
});
test("Update tile list item (bad tileId)", async () => {
    const updatedUser = await userServices.updateTileListItem(
        userRagavan._id,
        fakeId,
        userRagavan.tiles[0].list[0]._id,
        {}
    );
    expect(updatedUser).toBeUndefined();
});
test("Update tile list item (bad itemId)", async () => {
    const updatedUser = await userServices.updateTileListItem(
        userRagavan._id,
        userRagavan.tiles[0]._id,
        fakeId,
        {}
    );
    expect(updatedUser).toBeUndefined();
});

//getTileListItem()
test("Get tile list item", async () => {
    const newItem = { text: "I'm a new item!", status: 200 };
    const updatedUser = await userServices.addTileListItem(
        userRagavan._id,
        userRagavan.tiles[0]._id,
        newItem
    );
    const addedItem = await userServices.getTileListItem(
        updatedUser,
        updatedUser.tiles[0]._id,
        newItem
    );
    for (key of Object.keys(newItem)) {
        expect(addedItem[key]).toBe(newItem[key]);
    }
    expect(addedItem._id).toBeDefined();
});
test("Get tile list item (bad input)", async () => {
    const foundItem = await userServices.getTileListItem(
        userRagavan,
        fakeId,
        {}
    );
    expect(foundItem).toBeUndefined();
});

//deleteAllTiles()
test("Delete all tiles", async () => {
    await userServices.deleteAllTiles(userRagavan._id);
    const updatedUser = await userServices.getUserById(userRagavan._id);
    expect(updatedUser.tiles.length).toBe(0);
});


//moveTileMobile()
test("Move tile up", async () => {
    const updatedUser = await userServices.moveTileMobile(userBolas._id, userBolas.tiles, userBolas.tiles[2]._id, "up");
    expect(updatedUser.tiles.length).toBe(userBolas.tiles.length);
    expect(updatedUser.tiles[2]._id.toString()).toBe(userBolas.tiles[1]._id.toString());
    expect(updatedUser.tiles[1]._id.toString()).toBe(userBolas.tiles[2]._id.toString());
});
test("Move tile down", async () => {
    const updatedUser = await userServices.moveTileMobile(userBolas._id, userBolas.tiles, userBolas.tiles[2]._id, "down");
    expect(updatedUser.tiles.length).toBe(userBolas.tiles.length);
    expect(updatedUser.tiles[2]._id.toString()).toBe(userBolas.tiles[3]._id.toString());
    expect(updatedUser.tiles[3]._id.toString()).toBe(userBolas.tiles[2]._id.toString());
});
test("Move tile top", async () => {
    const updatedUser = await userServices.moveTileMobile(userBolas._id, userBolas.tiles, userBolas.tiles[2]._id, "top");
    expect(updatedUser.tiles.length).toBe(userBolas.tiles.length);
    expect(updatedUser.tiles[0]._id.toString()).toBe(userBolas.tiles[2]._id.toString());
    expect(updatedUser.tiles[1]._id.toString()).toBe(userBolas.tiles[0]._id.toString());
});
test("Move tile bottom", async () => {
    const updatedUser = await userServices.moveTileMobile(userBolas._id, userBolas.tiles, userBolas.tiles[2]._id, "bottom");
    expect(updatedUser.tiles.length).toBe(userBolas.tiles.length);
    expect(updatedUser.tiles[4]._id.toString()).toBe(userBolas.tiles[2]._id.toString());
    expect(updatedUser.tiles[3]._id.toString()).toBe(userBolas.tiles[4]._id.toString());
});
test("Move tile impossible", async () => {
    const updatedUser = await userServices.moveTileMobile(userBolas._id, userBolas.tiles, userBolas.tiles[0]._id, "up");
    expect(updatedUser).toBeUndefined();
});