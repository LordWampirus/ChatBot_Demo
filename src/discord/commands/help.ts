import { Message } from "discord.js";
import { prefix } from "../../config";
import { commands } from "../handlers/commandLoader";

export default {
    name: "help",
    description: "Zobrazí seznam dostupných příkazů.",
    run: (message: Message) => {
        const commandList = Array.from(commands.values())
        .map(cmd => `• **${prefix}${cmd.name}** - ${cmd.description || "bez popisu"}`)
        .join("\n");

        message.reply({
            content: `📜 Dostupné příkazy:\n${commandList}`,
        });
    },
};