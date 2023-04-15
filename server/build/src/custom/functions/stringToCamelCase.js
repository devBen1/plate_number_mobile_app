"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stringToCamelCase(string, capitalize = false) {
    let regexPattern = capitalize ? "^(.)|" : "";
    regexPattern += "[\\s-](.)";
    let regex = new RegExp(regexPattern, "g");
    return string.replace(regex, (match) => match[1] !== undefined ? match[1].toUpperCase() : match[0].toUpperCase());
}
exports.default = stringToCamelCase;
