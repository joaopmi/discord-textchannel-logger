"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.initLogger = void 0;
const discord_js_1 = require("discord.js");
const invalid_text_channel_1 = require("./errors/invalid-text-channel");
const no_client_error_1 = require("./errors/no-client-error");
const text_channel_not_found_1 = require("./errors/text-channel-not-found");
let CLIENT;
function initLogger(client) {
    CLIENT = client;
}
exports.initLogger = initLogger;
class Logger {
    /**impl */
    _options;
    constructor(options) {
        this._options = options;
    }
    /**
     * @param value Value to print on textChannel/console. Ignored if undefined
     */
    log(value) {
        if (!CLIENT)
            console.log(new no_client_error_1.NoClientError("CLIENT NOT CONNECTED"));
        if (!this._options || !this._options.textChannelID)
            this._logError(new text_channel_not_found_1.TextChannelNotFound("TEXT CHANNEL INVALID/NOT INFORMED"));
        if (value === undefined)
            return;
        CLIENT.channels.fetch(this._options.textChannelID).then((channel) => {
            if (!channel)
                this._logError(new text_channel_not_found_1.TextChannelNotFound("TEXT CHANNEL NOT FOUND"));
            else if (!(channel instanceof discord_js_1.TextChannel))
                this._logError(new invalid_text_channel_1.InvalidTextChannel("NOT A TEXT CHANNEL"));
            const textChannel = channel;
            let msgChannel = this._options.customHeader ? this._options.customHeader + '\n' : '';
            let msgConsole = this._options.customHeaderConsole ? this._options.customHeaderConsole + '\n' : '';
            msgConsole += this._options.printCurrentTimeConsole ? new Date().toLocaleString() + ' ' : '';
            let valueToPrint = value;
            if ('object' === typeof value) {
                if (!(value instanceof Error)) {
                    try {
                        valueToPrint = JSON.stringify(value);
                    }
                    catch (e) {
                        valueToPrint += value.toString();
                    }
                }
                else
                    valueToPrint += value.stack || value.toString();
            }
            textChannel.send(msgChannel + valueToPrint);
            if (this._options.consoleLog)
                console.log(msgConsole, valueToPrint);
        })
            .catch((reason) => {
            this._logError(new text_channel_not_found_1.TextChannelNotFound(reason));
        });
    }
    _logError(error) {
        error.message += ` |||| TextChannel -> ${this._options.textChannelID}`;
        console.log(error);
    }
}
exports.Logger = Logger;
;
//# sourceMappingURL=logger.js.map