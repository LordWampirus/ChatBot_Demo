import { CooldownTime } from "../config";

// Discord sender

export type DiscordPayload = {
    discordChannelId: string;
    message: string;
};

// Command Loader

export type DiscordCommand = {
    name: string;
    description?: string;
    cooldown?: CooldownTime;
    adminOnly?: boolean;
    run: (message: any, args: string[]) => Promise<any> | any;
};