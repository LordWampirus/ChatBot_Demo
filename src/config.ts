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
    MY_DiscordServer = "611967911896154263",
}

export enum DiscordChannelID {
    STREAMCHAT = "1453854083755675710",
    ADMIN = "636237324136480797",
}