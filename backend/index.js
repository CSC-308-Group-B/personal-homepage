const express = require('express');
const cors = require('cors');
const userServices = require('./model/userServices');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

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
        res.status(500).end();
    }
})

app.delete('/u/:id', async (req, res) => {
    const result = await userServices.deleteUserById(req.params.id);
    if (result) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

app.listen(port, () => {
    console.log(`Now listening at http://localhost:${port}`);
});