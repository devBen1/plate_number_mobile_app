"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forLoop = void 0;
const forLoop = (el, count) => {
    let arr = [];
    let i = 0;
    for (i; i < count; i++) {
        arr.push(el);
    }
    return arr;
};
exports.forLoop = forLoop;
