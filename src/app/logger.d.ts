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
    private _logError;
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
}
//# sourceMappingURL=logger.d.ts.map