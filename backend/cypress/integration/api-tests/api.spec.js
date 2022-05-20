/// <reference types="cypress" />

const mongoose = require("mongoose");
const UserSchema = require("../../../model/userSchema");
const userServices = require("../../../model/userServices");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let userModel;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  };
  conn = await mongoose.createConnection(uri, mongooseOpts);
  userModel = conn.model("User", UserSchema);
  userServices.setDbConnection(conn);
})

describe('first api test', () => {
  context('getting a user', () => {
    it('GIVEN the backend is running', () => {})
    
    it('WHEN I visit the getUser endpoint', () => {
      cy.request(`${process.env.BE_URL}/getUser`).then((response) => {
        assert.isNotNull(response.body, 'THEN it gets a response');
        assert.equal(response.body.name, 'Kyle Burton', 'AND returns a user');
        assert.equal(response.status, 200, 'AND the response code is 200');
    });
    })
  })
})

after(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
})
