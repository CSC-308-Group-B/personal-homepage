//requirements
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const userServices = require('./model/userServices');
//create app
const app = express();
//misc config
const port = 5000;
app.use(cors());
app.use(express.json());
//auth config
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

//endpoints
app.get('/', (req, res) => {
    res.send("Hello, world!");
});

app.get('/u', async (req, res) => {
    try {
        const result = await userServices.getUsers();
        res.send(result);
    } catch {
        res.status(404).send("No users found");
    }
});

app.get('/u/:id', async (req, res) => {
    const result = await userServices.getUserById(req.params.id);
    if (result) {
        res.send(result);
    } else {
        res.status(404).send(`User with id "${req.params.id}" not found`);
    }
});

app.post('/u', async (req, res) => {
    const user = req.body;
    const newUser = await userServices.addUser(user);
    if (newUser) {
        res.status(201).send(newUser);
    } else {
        res.status(500).send(`Unable to add new user.`);
    }
});

app.delete('/u/:id', async (req, res) => {
    const result = await userServices.deleteUserById(req.params.id);
    if (result) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

app.post('/u/:id/tiles', async (req, res) => {
    const result = await userServices.addTileToUserById(req.params.id, req.body);
    if (result) {
        res.status(201).send(result);
    } else {
        res.status(500).send(`Unable to add tile to user.`);
    }
});

app.delete('/u/:id/:tileid', async (req, res) => {
    const result = await userServices.removeTileFromUserByIds(req.params.id, req.params.tileid);
    if (result) {
        res.status(204).send(result);
    } else {
        res.status(404).send();
    }
});

//auth endpoints
app.post('/auth', async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });
        const payload = ticket.getPayload();
        const user = await userServices.getUserByEmail(payload.email)
        if (user) {
            res.status(201).send({ user: user });
        } else {
            const newUser = await userServices.addUser({
                name: payload.name,
                email: payload.email,
                tiles: []
            });
            if (newUser) {
                res.status(201).send({ user: newUser });
            } else {
                res.status(500).send(`Unable to add new user.`);
            }
        }
    } catch {
        res.status(404).send(`Authentication failed.`);
    }
});

//Begin listening
app.listen(port, () => {
    console.log(`Now listening at http://localhost:${port}`);
});