const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
    DiscordUsername: {
        type: String,
        default: null,
    },
    DiscordId: {
        type: String,
        default: null,
    },
    Key: {
        type: String,
        default: null,
    },
    Blacklisted: {
        type: String,
        default: "false",
    },
    Hwid: {
        type: String,
        default: null,
    },
})
module.exports = mongoose.model("Data", DataSchema)