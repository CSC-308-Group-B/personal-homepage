const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/u/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID: "${userId}"`);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});