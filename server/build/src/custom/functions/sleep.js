"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sleep(ms = 1000) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.default = sleep;
