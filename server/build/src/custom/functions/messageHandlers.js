"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSuccess = exports.handleError = void 0;
const handleError = (res, output, statusCode) => {
    return res.status(statusCode).json({
        statusCode,
        output,
    });
};
exports.handleError = handleError;
const handleSuccess = (res, message, output) => {
    return res.status(200).json({
        statusCode: 200,
        message,
        output,
    });
};
exports.handleSuccess = handleSuccess;
