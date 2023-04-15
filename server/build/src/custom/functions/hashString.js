"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashString = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
function hashString(string, algorithm = "sha512") {
    return node_crypto_1.default.createHash(algorithm).update(string, "utf8").digest("base64");
}
exports.hashString = hashString;
