import "dotenv/config"

import { startDiscord } from "./discord/discordClient";
import { startTwitch } from "./twitch/twitchClient";


async function startApp() {
    await startDiscord();
    startTwitch();
}

startApp();