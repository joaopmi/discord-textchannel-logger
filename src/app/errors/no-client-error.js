"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoClientError = void 0;
class NoClientError extends Error {
    constructor(message) {
        if (message && typeof message === 'object')
            super(JSON.stringify(message));
        else
            super(message);
    }
}
exports.NoClientError = NoClientError;
//# sourceMappingURL=no-client-error.js.map