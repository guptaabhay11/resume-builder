"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExperience = void 0;
const express_validator_1 = require("express-validator");
exports.createExperience = [
    (0, express_validator_1.body)("experience.*.company")
        .notEmpty()
        .withMessage("company is required")
        .isString()
        .withMessage("company must be a string"),
    (0, express_validator_1.body)("experience.*.position")
        .notEmpty()
        .withMessage("position is required")
        .isString()
        .withMessage("position must be a string"),
    (0, express_validator_1.body)("experience.*.startDate")
        .notEmpty()
        .withMessage("startDate is required")
        .isString()
        .withMessage("startDate must be a string"),
    (0, express_validator_1.body)("experience.*.endDate")
        .notEmpty()
        .withMessage("endDate is required")
        .isString()
        .withMessage("endDate must be a string"),
    (0, express_validator_1.body)("experience.*.description")
        .notEmpty()
        .withMessage("description is required")
        .isString()
        .withMessage("description must be a string"),
];
