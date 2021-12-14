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
        /**string */
        textChannelID: string;
        /**
         * Custom log header to print along with the logger instantiated with this option
         */
        customHeader?: string;
    }
}
//# sourceMappingURL=logger.d.ts.map