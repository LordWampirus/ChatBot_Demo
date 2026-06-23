import { Message, TextChannel } from "discord.js";
import { client } from "../discordClient";
import { adminLinks } from "../../core/links";

export default {
    name: "delete",
    description: "Smaže referencovanou zprávu a udělá výpis do admin roomky.",
    run: async (message: Message) => {
        if (!message.reference) {
            message.reply("⚠️ Tento příkaz musí být použit jako odpověď na zprávu, kterou chcete smazat.");
            return;
        }

        const targetMessage = await message.fetchReference();
        if (!targetMessage) {
            message.reply("⚠️ Nepodařilo se najít referencovanou zprávu.");
            return;
        }
        targetMessage.delete();

        const serverId = message.guildId;
        const link = adminLinks.find(
            (l) => l.discordGuildId === serverId
        );
        if(!link) return;

        const outputChannel = client.channels.cache.get(link.discordChannelId) as TextChannel;
        outputChannel.send(`🗑️ Zpráva smazána od ${targetMessage.author} byla smazána v ${targetMessage.channel}`);
        message.delete();
    }
};