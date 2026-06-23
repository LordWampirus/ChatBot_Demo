import { CooldownTime } from "../config";
import tmi, { ChatUserstate, Client} from "tmi.js";

// Command Loader

export type TwitchCommand = {
    name: string;
    description?: string;
    cooldown?: CooldownTime;
    permissions?: ("broadcaster" | "moderator" | "viewer")[];
    run: (client: Client, channel: string, user: ChatUserstate, args: string[]) => void;
};

// Message Handler

export type TwitchMessageInput = {
    client: tmi.Client;
    channel: string;
    user: ChatUserstate;
    message: string;
};

// Unknown Command

export type TwitchDestination = {
    client: Client;
    channel: string;
};

// Bridge

export type TwitchMessage = {
    twitchChannel: string;
    username: string;
    message: string;
};