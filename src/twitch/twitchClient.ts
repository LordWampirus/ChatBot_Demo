import tmi from "tmi.js";
import { handleTwitchMessage } from "./handlers/messageHandler";

const client = new tmi.Client({
    options: { debug: true },
    connection: { reconnect: true },
    identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_TOKEN,
    },
    channels: [process.env.TWITCH_CHANNEL || ""],
});

export function startTwitch() {
    client.connect().catch(console.error);

    client.on("connected", () => {
        console.log(`✅ Připojeno k Twitch kanálu: ${client.getChannels().join(", ")}`);
    });

    client.on("message", (channel, user, message, self) => {
        if (self) return;
        handleTwitchMessage({client, channel, user, message});
    });
}