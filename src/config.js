require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "TOKEN_BOT",
    clientID: process.env.CLIENT_ID || "CLIENT_ID",
    prefix: process.env.PREFIX || "?",
    ownerID: process.env.OWNERID || "OWNER_ID"
}