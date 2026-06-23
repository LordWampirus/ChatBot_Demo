import { Message } from "discord.js";

export default {
    name: "info",
    description: "Zobrazí informace o botovi.",
    run: (message: Message) => {
        message.reply({
            content: "🤖 Jsem ChatBot, který vám odpoví na vaše zprávy a příkazy!"
        });
    }
};