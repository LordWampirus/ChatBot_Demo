import { TwitchCommand } from "../../types/twitch";

export default {
    name: "ping",
    description: "Odpoví Pong!",
    run(client, channel, user) {
        client.say(channel, `Pong! @${user["display-name"]}`);
    },
} as TwitchCommand;