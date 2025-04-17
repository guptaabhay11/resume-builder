"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ResumeSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    template: {
        type: String,
    },
    personalInfo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "PersonalInfo",
    },
    education: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Education",
        },
    ],
    experience: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Experience",
        },
    ],
    skills: [String],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Resume", ResumeSchema);
