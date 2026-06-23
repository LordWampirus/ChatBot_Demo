import { TwitchCommand } from "../../types/twitch";
import { commands } from "../handlers/commandLoader";
import { CooldownTime, prefix } from "../../config";

export default {
    name: "help",
    description: "Zobrazí seznam dostupných příkazů.",
    cooldown: CooldownTime.SHORT,
    run(client, channel) {
        const commandList = Array.from(commands.values())
            .map(cmd => `${prefix}${cmd.name}`)
            .join(", ");

        client.say(channel, `📜 Dostupné příkazy: ${commandList}`);
    }
} as TwitchCommand;