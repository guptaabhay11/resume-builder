"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResume = void 0;
const express_validator_1 = require("express-validator");
exports.createResume = [
    (0, express_validator_1.body)("title")
        .notEmpty()
        .withMessage("title is required")
        .isString()
        .withMessage("title must be a string"),
];
