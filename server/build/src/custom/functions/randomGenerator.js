"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuid4 = exports.randomNumberOfLength = exports.randomString = void 0;
const crypto_1 = __importDefault(require("crypto"));
const uuid_1 = require("uuid");
function randomString(length = 64, specialCharacters = true) {
    let randomString = crypto_1.default.randomBytes(length).toString("base64");
    if (specialCharacters === false)
        randomString = randomString.replace(/[^\w]/g, "");
    randomString = randomString.slice(0, length).padEnd(length, "0");
    return randomString;
}
exports.randomString = randomString;
function randomNumberOfLength(length = 10) {
    if (length > 15 || length < 1)
        return false;
    let random = Math.random().toString().slice(2);
    random = random.slice(0, length).padEnd(length, "0");
    random = parseInt(random);
    return random;
}
exports.randomNumberOfLength = randomNumberOfLength;
function uuid4() {
    return (0, uuid_1.v4)();
}
exports.uuid4 = uuid4;
