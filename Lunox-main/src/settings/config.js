const { VoicePlugin } = require("rainlink-voice");
require("dotenv").config({ path: "./.env", quiet: true });

module.exports = {
    // GENERAL DETAILS
    token: process.env.TOKEN || "",
    prefix: process.env.PREFIX || "!",
    dev: [" "],
    embedColor: process.env.EMBED_COLOR || "5865F2",
    leaveTimeout: parseInt(process.env.LEAVE_TIMEOUT) || 60000,
    defaultVolume: parseInt(process.env.DEFAULT_VOLUME) || 100,
    minVolume: parseInt(process.env.MIN_VOLUME) || 1,
    maxVolume: parseInt(process.env.MAX_VOLUME) || 100,
    mongoUri: process.env.MONGO_URI || "",
    supportServerUrl: process.env.SUPPORT_SERVER_URL || "",

    // LAVALINK
    lavalinkSource: "youtube",

    rainlinkOptions: {
        defaultSearchEngine: "ytsearch",

        searchFallback: {
            enable: true,
            engine: "ytsearch",
        },
    },

    rainlinkPlugins: [new VoicePlugin()],

    rainlinkNodes: [
        {
            name: process.env.LAVALINK_NAME || "Lunox",
            host: process.env.LAVALINK_HOST,
            port: parseInt(process.env.LAVALINK_PORT) || 2333,
            auth: process.env.LAVALINK_PASSWORD,
            secure: parseBoolean(process.env.LAVALINK_SECURE || "true"),
            driver: "lavalink/v4",
        },
    ],
};

function parseBoolean(value) {
    if (typeof value === "string") value = value.trim().toLowerCase();
    return value === "true";
}
