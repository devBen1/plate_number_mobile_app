"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isObjectEmpty(obj) {
    return obj.constructor === Object && Object.keys(obj).length === 0;
}
exports.default = isObjectEmpty;
