import { Message, TextChannel } from "discord.js";
import { adminLinks } from "../../core/links";
import { client } from "../discordClient";

export default {
    name: "move",
    description: "Přesune referencovanou zprávu a smaže ji v původním kanálu",
    run: async (message: Message) => {
        if(!message.reference) {
            return message.reply("Musíš odpovědět na zprávu, kterou chceš přesunout.");
        }

        const targetMessage = await message.fetchReference();
        if(!targetMessage) {
            return message.reply("Zpráva na kterou jsi odpovídal je smazaná.");
        }

        const serverId = message.guildId;
        const args = message.content.split(" ");
        const targetChannelName = args[1].replace(/[<#>]/g, "");
        if(!targetChannelName) {
            return message.reply("Chybí argument pro cílový kanál.");
        }

        const targetChannel = client.channels.cache.get(targetChannelName) as TextChannel;

        const files = targetMessage.attachments.map(a => ({
            attachment: a.url,
            name: a.name
        }));

        await targetChannel.send({
            content: `Od ${targetMessage.author.displayName} z ${targetMessage.channel}:\n${targetMessage.content}`,
            embeds: targetMessage.embeds,
            files
        });

        targetMessage.delete();
        message.delete();

        const link = adminLinks.find(
            (l) => l.discordGuildId === serverId
        );
        if(!link) return;

        const outputChannel = client.channels.cache.get(link.discordChannelId) as TextChannel;
        outputChannel.send(`Zpráva od ${targetMessage.author} byla smazána v ${targetMessage.channel} a přesunuta do ${targetChannel}`);
    }
}