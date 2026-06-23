export const prefix = ";";

export enum CooldownTime {
    NONE = 0,
    SHORT = 15 * 1000,
    MINUTE = 1 * 60 * 1000,
    TWO_MINUTES = 2 * 60 * 1000,
    FIVE_MINUTES = 5 * 60 * 1000,
    FIFTEEN_MINUTES = 15 * 60 * 1000,
    DEFAULT = 2 * 60 * 1000,
}

export enum DiscordServerID {
    MY_DiscordServer = "serverId",
}

export enum DiscordChannelID {
    STREAMCHAT = "channelId_for_messages_from_twitch",
    ADMIN = "adminRoomId",
}