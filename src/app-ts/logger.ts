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
            const textChannel: TextChannel = channel as TextChannel;
            let msgChannel: string = this._options.customHeader ? this._options.customHeader + '\n' : '';
            let msgConsole:string = this._options.customHeaderConsole ? this._options.customHeaderConsole + '\n' : '';
            msgConsole += this._options.printCurrentTimeConsole ? new Date().toLocaleString() + ' ==> ' : '';
            let valueToPrint: any = value;
            if ('object' === typeof value) {
                if (!(value instanceof Error)) {
                    try {
                        valueToPrint = JSON.stringify(value);
                    } catch (e: any) {
                        valueToPrint += value.toString();
                    }
                }else valueToPrint += value.stack || value.toString()
            }
            textChannel.send(msgChannel + valueToPrint);
            if (this._options.consoleLog) console.log(msgConsole, valueToPrint);
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
        /**
         * If should print the current time as toLocaleString() on console.
         * If it exists, prints after the custom headers
         * @example 14/12/2021 10:39:54 ==> 'message'
         */
        printCurrentTimeConsole?: boolean;
        /**string */
        textChannelID: string;
        /**
         * Custom log header to print along with the message
         */
        customHeader?: string;
        /**
         * Custom log header to print on console along with the message
         */
        customHeaderConsole?: string;
    }
};