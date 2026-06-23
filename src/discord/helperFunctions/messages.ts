import { TextChannel, Message, Collection } from "discord.js";

export async function fetchAllMessagesCollection(
    channel: TextChannel
): Promise<Collection<string, Message>> {
    const allMessages = new Collection<string, Message>();
    let lastId: string | undefined = undefined;

    while (true) {
        const options: { limit: number; before?: string } = { limit: 100 };
        if (lastId) {
            options.before = lastId;
        };

        const messages = await channel.messages.fetch(options);

        if (messages.size === 0) break;

        messages.forEach((msg) => {
            allMessages.set(msg.id, msg);
        });

        lastId = messages.last()?.id;
    }

    console.log("Načteno " + allMessages.size + " zpráv");
    return allMessages;
}
