"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTextChannel = void 0;
class InvalidTextChannel extends Error {
    constructor(message) {
        if (message && typeof message === 'object')
            super(JSON.stringify(message));
        else
            super(message);
    }
}
exports.InvalidTextChannel = InvalidTextChannel;
//# sourceMappingURL=invalid-text-channel.js.map