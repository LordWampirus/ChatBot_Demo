import * as fs from "fs";
import * as path from "path";
import { Guild, Message, TextChannel } from "discord.js";

export class Archiver {
    private static archiveDir = path.join(process.cwd(), "archives");

    static archive(entry: Message): void {
        this.ensureArchiveDir();

        const messageTime = entry.createdAt;

        const year = messageTime.getFullYear();
        const month = String(messageTime.getMonth() + 1).padStart(2, "0");
        const day = String(messageTime.getDate()).padStart(2, "0");

        const channel = entry.channel as TextChannel;
        const channelName = channel.name;
        const guild = entry.guild as Guild;
        const guildName = guild.name;

        const fileName = `${guildName}_${channelName}.log`;
        const filePath = path.join(this.archiveDir, fileName);

        this.ensureDayHeader(filePath, `${year}-${month}-${day}`);

        const user = entry.author.displayName;
        const timestamp = messageTime.toTimeString().slice(0, 8);
        const message = entry.content;

        const line = 
            `[${timestamp}] ` +
            `${user}: ` +
            `${message} ` +
            "\n";

        fs.appendFileSync(filePath, line, "utf8");
    }

    private static ensureArchiveDir(): void {
        if(!fs.existsSync(this.archiveDir)) {
            fs.mkdirSync(this.archiveDir, { recursive: true });
        }
    }

    private static ensureDayHeader(filePath: string, day: string): void {
        if(!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, `===== ${day} =====\n`, "utf8");
            return;
        }

        const content = fs.readFileSync(filePath, "utf8");
        if(!content.includes(`===== ${day} =====`)) {
            fs.appendFileSync(filePath, `\n===== ${day} =====\n`, "utf8");
        }
    }
}