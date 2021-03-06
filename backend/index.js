//requirements
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const userServices = require("./model/userServices");
const axios = require("axios");
const path = require("path");

//External APIs
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const canvasAPI = require("node-canvas-api");

const canvasAxios = process.env.CANVAS_API_TOKEN
    ? axios.create({
          withCredentials: true,
          baseURL: process.env.CANVAS_API_DOMAIN,
          headers: {
              Authorization: `Bearer ${process.env.CANVAS_API_TOKEN}`,
          },
      })
    : null;

//create app
const app = express();
//misc config
app.use(
    cors({
        origin: [process.env.FE_URL],
        credentials: true,
    })
);
app.use(express.json());

/*

    SESSIONS / USER AUTHENTICATION

*/
app.set("trust proxy", 1);
app.use(
    session({
        secret: process.env.LOGIN_SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            sameSite: process.env.NODE_ENV === "production" ? "none" : "none", //"lax", // must be 'none' to enable cross-site delivery
            secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
            maxAge: 2678400000,
        },
    })
);
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
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
            userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
        },
        async function (accessToken, refreshToken, profile, callback) {
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
                    tiles: [],
                });
                if (newUser) {
                    callback(null, newUser);
                } else {
                    //And if for some reason the creation fails, return null
                    callback(null, null);
                }
            }
        }
    )
);
//1) User makes a get request to sign in, so we try to authenticate via passport (See above for step "2")
app.get(
    "/api/auth/google",
    passport.authenticate("google", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ],
    })
);
//3) on success/error, return to our homepage. Now that the session is initialized, the user will be signed in immediately
app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/failure" }),
    (req, res) => {
        console.log("successful session creation");
        res.redirect(process.env.FE_URL);
    }
);

app.get("/logout", function (req, res) {
    req.session.destroy(function (e) {
        req.logout();
        res.redirect("/");
    });
});

//If the get request on the frontend sends the session cookie, passport will automatically add a "user" field to "req", via the serialization methods (above)
app.get("/getUser", async (req, res) => {
    console.log(await getUser(req));
    res.send(await getUser(req));
});

/*
 *
 * Canvas API
 *
 */

//For a valid result, it should return an id and name
app.get("/canvas/self", async (req, res, next) => {
    if (!canvasAxios) {
        res.status(404).send();
        return;
    }
    canvasAPI.getSelf().then((self) => res.send(self));
});

app.get("/canvas/activecourses", async (req, res) => {
    if (!canvasAxios) {
        res.status(404).send();
        return;
    }
    canvasAxios
        .get(`/users/self/favorites/courses?include=total_scores`)
        .then((response) => res.send(response.data))
        .catch((err) => next(err));
});

app.get("/canvas/enrollments", async (req, res) => {
    if (!canvasAxios) {
        res.status(404).send();
        return;
    }
    canvasAxios
        .get(`users/self/enrollments?include=uuid`)
        .then((response) => res.send(response.data))
        .catch((err) => next(err));
});

app.get("/canvas/upcomingassignments", async (req, res) => {
    if (!canvasAxios) {
        res.status(404).send();
        return;
    }
    canvasAxios
        .get(`users/self/todo`)
        .then((response) => res.send(response.data))
        .catch((err) => next(err));
});

/*

    GOOGLE VERIFICATION

*/
app.get("/googlecf8bbac0c83fafc7.html", async (req, res) => {
    res.sendFile(path.join(__dirname, "/googlecf8bbac0c83fafc7.html"));
});

/*

    OTHER ENDPOINTS

*/
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.get("/u", async (req, res) => {
    try {
        const result = await userServices.getUsers();
        res.send(result);
    } catch {
        res.status(404).send("No users found");
    }
});

app.get("/u/:id", async (req, res) => {
    const result = await userServices.getUserById(req.params.id);
    if (result) {
        res.send(result);
    } else {
        res.status(404).send(`User with id "${req.params.id}" not found`);
    }
});

app.post("/u", async (req, res) => {
    const user = req.body;
    const newUser = await userServices.addUser(user);
    if (newUser) {
        res.status(201).send(newUser);
    } else {
        res.status(500).send(`Unable to add new user.`);
    }
});

app.delete("/u/:id", async (req, res) => {
    const result = await userServices.deleteUserById(req.params.id);
    if (result) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

app.post("/u/:id/tiles", async (req, res) => {
    const result = await userServices.addTileToUserById(
        (
            await getUser(req)
        )._id,
        req.body
    );
    if (result) {
        res.status(201).send(result);
    } else {
        res.status(500).send(`Unable to add tile to user.`);
    }
});

app.delete("/u/:id/:tileid", async (req, res) => {
    const result = await userServices.removeTileFromUserByIds(
        (
            await getUser(req)
        )._id,
        req.params.tileid
    );
    if (result) {
        res.status(204).send(result);
    } else {
        res.status(404).send();
    }
});

app.delete("/deleteAllTiles", async (req, res) => {
    const result = await userServices.deleteAllTiles((await getUser(req))._id);
    if (result) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

app.post("/setBackgroundColor", async (req, res) => {
    const result = await userServices.setUserFields((await getUser(req))._id, {
        backgroundColor: req.body.backgroundColor,
    });
    if (result) {
        res.status(200).send("Updated color.");
    } else {
        res.status(500).send("Unable to update color.");
    }
});

app.post("/setBackgroundImage", async (req, res) => {
    const result = await userServices.setUserFields((await getUser(req))._id, {
        backgroundImage: req.body.backgroundImage,
    });
    if (result) {
        res.status(200).send("Updated Background.");
    } else {
        res.status(500).send("Unable to update Background.");
    }
});

app.post("/setStreamerName", async (req, res) => {
    const result = await userServices.updateTileDataFields(
        (
            await getUser(req)
        )._id,
        req.body.tileId,
        {
            streamerName: req.body.streamerName,
        }
    );
    if (result) {
        res.status(200).send("Updated Streamer Name");
    } else {
        res.status(500).send("Unable to update Streamer Name.");
    }
});

app.post("/u/moveTile", async (req, res) => {
    const result = await userServices.updateTileFields(
        (
            await getUser(req)
        )._id,
        req.body.tileId,
        { x: req.body.x, y: req.body.y }
    );
    if (result) {
        res.status(200).send("Updated tile.");
    } else {
        res.status(500).send("Unable to update tile.");
    }
});

app.post("/setTileWidth", async (req, res) => {
    const result = await userServices.updateTileFields(
        (
            await getUser(req)
        )._id,
        req.body.tileId,
        { width: req.body.width }
    );
    if (result) {
        res.status(200).send("Updated tile.");
    } else {
        res.status(500).send("Unable to update tile.");
    }
});

app.post("/u/setTileFields", async (req, res) => {
    const result = await userServices.updateTileFields(
        (
            await getUser(req)
        )._id,
        req.body.tileId,
        req.body
    );
    if (result) {
        res.status(200).send("Updated tile.");
    } else {
        res.status(500).send("Unable to update tile.");
    }
});

app.post("/applyBackgroundColorToAllTiles", async (req, res) => {
    let result = true;
    for (let tile of (await getUser(req)).tiles) {
        result =
            result &&
            (await userServices.updateTileFields(
                (
                    await getUser(req)
                )._id,
                tile._id,
                req.body
            ));
    }
    if (result) {
        res.status(200).send("Updated tiles.");
    } else {
        res.status(500).send("Unable to update tiles.");
    }
});

app.post("/addToDoItem", async (req, res) => {
    const result = await userServices.addTileListItem(
        (
            await getUser(req)
        )._id,
        req.body.tileId,
        req.body.tile
    );
    const addedItem = await userServices.getTileListItem(
        result,
        req.body.tileId,
        req.body.tile
    );
    if (addedItem) {
        res.status(200).send(addedItem);
    } else {
        res.status(500).send();
    }
});

app.delete("/removeToDoItem", async (req, res) => {
    const result = await userServices.deleteTileListItem(
        (
            await getUser(req)
        )._id,
        req.body.tileId,
        req.body.itemId
    );
    if (result) {
        res.status(204).send("Deleted item.");
    } else {
        res.status(404).send();
    }
});

app.post("/updateToDoItem", async (req, res) => {
    const result = await userServices.updateTileListItem(
        (
            await getUser(req)
        )._id,
        req.body.tileId,
        req.body.itemId,
        { status: req.body.status }
    );
    if (result) {
        res.status(200).send("Updated item.");
    } else {
        res.status(500).send();
    }
});

app.post("/addBookmark", async (req, res) => {
    const result = await userServices.addTileListItem(
        (
            await getUser(req)
        )._id,
        req.body.tileId,
        req.body.tile
    );
    const addedItem = await userServices.getTileListItem(
        result,
        req.body.tileId,
        req.body.tile
    );
    if (addedItem) {
        res.status(200).send(addedItem);
    } else {
        res.status(500).send();
    }
});

app.delete("/removeBookmark", async (req, res) => {
    const result = await userServices.deleteTileListItem(
        (
            await getUser(req)
        )._id,
        req.body.tileId,
        req.body.itemId
    );
    if (result) {
        res.status(204).send("Deleted item.");
    } else {
        res.status(404).send();
    }
});

app.post("/updateNoteText", async (req, res) => {
    const result = await userServices.updateTileDataFields(
        (
            await getUser(req)
        )._id,
        req.body.tileId,
        { text: req.body.text } //passes to user services
    );
    if (result) {
        res.status(200).send("Updated note.");
    } else {
        res.status(500).send("Unable to update note.");
    }
});

app.post("/moveTileMobile", async (req, res) => {
    const result = await userServices.moveTileMobile(
        (
            await getUser(req)
        )._id,
        req.body.tiles,
        req.body.tileId,
        req.body.direction
    );
    if (result) {
        res.status(200).send(result);
    } else if (result == undefined) {
        res.status(201).send();
    } else {
        res.status(500).send();
    }
});

//config testing environment
if (process.env.TESTING) {
    testingEnvironment.init();
}

//Begin listening
app.listen(process.env.PORT, () => {
    console.log(`Now listening at port ${process.env.PORT}`);
});

//static dev user
getUser = async (request) => {
    return (
        request.user ||
        (process.env.DEV_USER_EMAIL
            ? await userServices.getUserByEmail(process.env.DEV_USER_EMAIL)
            : null)
    );
};
