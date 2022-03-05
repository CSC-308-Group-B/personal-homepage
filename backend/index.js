//requirements
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const userServices = require('./model/userServices');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//create app
const app = express();
//misc config
const port = 5001;
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(express.json());

/*

    SESSIONS / USER AUTHENTICATION

*/
app.use(
    session({
        secret: process.env.LOGIN_SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
)
app.use(passport.initialize());
app.use(passport.session());
//I'll have to do more research to fully understand the serialization here
passport.serializeUser((user, done) => {
    return done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
    const user = await userServices.getUserById(id);
    return done(null, user);
});
//Configure passport to use google's oauth2
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
},
async function(accessToken, refreshToken, profile, callback) {
    //2) on successful auth, try and find user...
    const user = await userServices.getUserByEmail(profile._json.email);
    if (user) {
        //If they exist, return them
        callback(null, user);
    } else {
        //Otherwise, create a new user and return them
        const newUser = await userServices.addUser({
            name: profile.displayName,
            email: profile._json.email,
            tiles: []
        });
        if (newUser) {
            callback(null, newUser);
        } else {
            //And if for some reason the creation fails, return null
            callback(null, null);
        }
    }
}));
//1) User makes a get request to sign in, so we try to authenticate via passport (See above for step "2")
app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
//3) on success/error, return to our homepage. Now that the session is initialized, the user will be signed in immediately
app.get("/api/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    res.redirect('http://localhost:3000');
})
//If the get request on the frontend sends the session cookie, passport will automatically add a "user" field to "req", via the serialization methods (above)
app.get('/getUser', async (req, res) => {
    res.send(req.user);
});

/*

    OTHER ENDPOINTS

*/
//We'll eventually update these to require credentials

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

app.post('/u/moveTile', async (req, res) => {
    const result = await userServices.updateTileFields(req.body.userId, req.body.tileId, {x:req.body.x, y:req.body.y});
    if (result) {
        res.status(200).send('Updated tile.');
    } else {
        res.status(500).send('Unable to update tile.');
    }
});

app.post('/u/addToDoItem', async (req, res) => {
    const result = await userServices.addTileListItem(req.body.userId, req.body.tileId, req.body.tile);
    const addedItem = await userServices.getTileListItem(result, req.body.tileId, req.body.tile);
    if (addedItem) {
        res.status(200).send(addedItem);
    } else {
        res.status(500).send();
    }
});

app.delete('/u/removeToDoItem', async (req, res) => {
    console.log("REMOVE");
    res.status(404).send();
    // console.log(req.body.userId, req.body.tileId, req.body.itemId);
    // res.status(404).send();
    // return;
    // const result = await userServices.deleteTileListItem(req.body.userId, req.body.tileId, req.body.itemId);
    // if (result) {
    //     res.status(204).send('Delete item.');
    // } else {
    //     res.status(404).send();
    // }
});

app.post('/u/updateToDoItem', async (req, res) => {
    const result = await userServices.updateTileListItem(req.body.userId, req.body.tileId, req.body.itemId, req.body.status);
    if (result) {
        res.status(200).send('Updated item.');
    } else {
        res.status(500).send();
    }
});

//Begin listening
app.listen(port, () => {
    console.log(`Now listening at http://localhost:${port}`);
});