"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextChannelNotFound = void 0;
class TextChannelNotFound extends Error {
    constructor(message) {
        if (message && typeof message === 'object')
            super(JSON.stringify(message));
        else
            super(message);
    }
}
exports.TextChannelNotFound = TextChannelNotFound;
//# sourceMappingURL=text-channel-not-found.js.map