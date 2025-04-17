"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFile = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Basic send email function
// Function to send email with file attachment
const sendFile = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, subject, html, filePath, fileName, }) {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject,
            html,
            attachments: [
                {
                    filename: fileName, // The file name as shown in the email
                    path: filePath, // Path to the file
                },
            ],
        };
        yield transporter.sendMail(mailOptions);
        return true;
    }
    catch (err) {
        console.log("Error sending email with attachment:", err);
        return false;
    }
});
exports.sendFile = sendFile;
