import { Message, TextChannel } from "discord.js";
import { Archiver } from "../archiver/archiver";
import { fetchAllMessagesCollection } from "../helperFunctions/messages";

export default {
    name: "archive",
    description: "Archivuje všechny zprávy v kanálu do souboru",
    run: async (message: Message) => {
        if (!message.guild) {
            return message.reply("Tento příkaz lze použít pouze na serveru.")
        };

        const channel = message.channel as TextChannel;
        const messages = await fetchAllMessagesCollection(channel);
        const messagesSorted = messages
            .sort((a,b) => a.createdTimestamp - b.createdTimestamp);
        
        let archivedNumber = 0;
        console.log("Načteno " + messages.size + " zpráv");

        for(const msg of messagesSorted) {
            if(msg[1].content) {
                Archiver.archive(msg[1]);
                archivedNumber++;
            }
        };

        return message.reply({
            content: `Archivováno: ${archivedNumber} zpráv.`
        });
    }
}