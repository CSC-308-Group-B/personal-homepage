//requirements
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const userServices = require('./model/userServices');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//create app
const app = express();
//misc config
const port = 5000;
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(express.json());
//Sessions / auth config
app.use(
    session({
        secret: "secretkeystringorwhatever",
        resave: true,
        saveUninitialized: true,
    })
)
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
    return done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
    const user = await userServices.getUserById(id);
    return done(null, user);
});
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
//1) Make a get request
app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
//3) on success/error, run the callback
app.get("/api/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    res.redirect('http://localhost:3000');
})
app.get('/getUser', async (req, res) => {
    res.send(req.user);
});


// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(process.env.CLIENT_ID);

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
// app.post('/api/auth/google', async (req, res) => {
//     try {
//         const { token } = req.body;
//         const ticket = await client.verifyIdToken({
//             idToken: token,
//             audience: process.env.CLIENT_ID
//         });
//         const payload = ticket.getPayload();
//         const user = await userServices.getUserByEmail(payload.email)
//         if (user) {
//             res.status(201).send({ user: user });
//         } else {
//             const newUser = await userServices.addUser({
//                 name: payload.name,
//                 email: payload.email,
//                 tiles: []
//             });
//             if (newUser) {
//                 res.status(201).send({ user: newUser });
//             } else {
//                 res.status(500).send(`Unable to add new user.`);
//             }
//         }
//     } catch {
//         res.status(404).send(`Authentication failed.`);
//     }
// });

//Begin listening
app.listen(port, () => {
    console.log(`Now listening at http://localhost:${port}`);
});