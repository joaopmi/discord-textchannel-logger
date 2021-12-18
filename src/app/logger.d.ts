import { Client } from "discord.js";
export declare function initLogger(client: Client): void;
export declare class Logger {
    /**impl */
    private _options;
    constructor(options: Logger.InitOptions);
    /**
     * @param value Value to print on textChannel/console. Ignored if undefined
     */
    log(value: any): void;
    private _tryStringify;
    private _logError;
}
export declare namespace Logger {
    interface InitOptions {
        /**boolean */
        /**
         * If should print the value on console
         */
        consoleLog?: boolean;
        /**
         * If should print the current time as toLocaleString() on console.
         * If it's true, prints after the custom headers
         * @example 'customHeaderIfExists\n' + 14/12/2021 10:39:54 ==> 'message'
         */
        printCurrentTimeConsole?: boolean;
        /**number */
        /**The space indent of JSON.stringify
         * @default 2
         */
        jsonSpace?: number;
        /**string */
        /**(Obligatory) ID of the textChannel to print on */
        textChannelID: string;
        /**
         * Custom log header to print along before the message
         */
        customHeader?: string;
        /**
         * Custom log header to print on console before the message
         */
        customHeaderConsole?: string;
    }
}
//# sourceMappingURL=logger.d.ts.map