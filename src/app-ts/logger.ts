import { Channel, Client, TextChannel } from "discord.js";
import { InvalidTextChannel } from "./errors/invalid-text-channel";
import { NoClientError } from "./errors/no-client-error";
import { TextChannelNotFound } from "./errors/text-channel-not-found";

let CLIENT: Client;

export function initLogger(client: Client) {
    CLIENT = client;
}

export class Logger {

    /**impl */
    private _options: Logger.InitOptions;

    constructor(options: Logger.InitOptions) {
        this._options = options;
    }

    /**
     * @param value Value to print on textChannel/console. Ignored if undefined
     */
    log(value: any): void {
        if (!CLIENT) console.log(new NoClientError("CLIENT NOT CONNECTED"));
        if (!this._options || !this._options.textChannelID) this._logError(new TextChannelNotFound("TEXT CHANNEL INVALID/NOT INFORMED"));
        if (value === undefined) return;
        CLIENT.channels.fetch(this._options.textChannelID).then((channel: Channel | null) => {
            if (!channel) this._logError(new TextChannelNotFound("TEXT CHANNEL NOT FOUND"));
            else if (!(channel instanceof TextChannel)) this._logError(new InvalidTextChannel("NOT A TEXT CHANNEL"));
            let textChannel: TextChannel = channel as TextChannel;
            let msg: string = this._options.customHeader ? this._options.customHeader + '\n' : '';
            textChannel.send(msg + value);
            if (this._options.consoleLog) console.log(msg, value);
        })
            .catch((reason: any) => {
                this._logError(new TextChannelNotFound(reason));
            });
    }

    private _logError<E extends Error>(error: E): void {
        error.message += ` |||| TextChannel -> ${this._options.textChannelID}`;
        console.log(error);
    }
}

export declare namespace Logger {
    interface InitOptions {
        /**boolean */
        /**
         * If should print log on console
         */
        consoleLog?: boolean;
        /**string */
        textChannelID: string;
        /**
         * Custom log header to print along with the logger instantiated with this option
         */
        customHeader?: string;
    }
};