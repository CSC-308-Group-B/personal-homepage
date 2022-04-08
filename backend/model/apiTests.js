const UserSchema = require("./userSchema");
const userServices = require("./userServices");
const axios = require("axios");

let validAxios, invalidTokenAxios;

beforeEach(async () => {

    //Valid User
    validAxios = axios.create({
        withCredentials: true,
        baseURL: process.env.CANVAS_API_DOMAIN,
        headers: {
            'Authorization': `Bearer ${process.env.CANVAS_API_TOKEN}`
        },
    })

    //Invalid User
    invalidTokenAxios = axios.create({
        withCredentials: true,
        baseURL: process.env.CANVAS_API_DOMAIN,
        headers: {
            'Authorization': `Bearer of_bad_news`
        },
    })

});

//CANVAS TESTS

test("Trying to get valid canvas user", async () => {
    //const user = await validAxios.
});
