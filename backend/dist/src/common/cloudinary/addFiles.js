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
exports.uploadToCloudinary = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const user_schema_1 = __importDefault(require("../../users/user.schema"));
require('dotenv').config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage });
const uploadToCloudinary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const file = req.file;
        if (!file)
            res.status(400).json({ success: false, message: 'No file provided' });
        const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'User not authenticated' });
            return;
        }
        if (file.mimetype !== 'application/pdf') {
            res.status(400).json({ success: false, message: 'Only PDF files are allowed' });
            return;
        }
        // 1) upload to Cloudinary
        const uploadPdfToCloudinary = (fileBuffer, userId) => __awaiter(void 0, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                    resource_type: 'raw', // raw for non-image files like PDFs
                    folder: `resumeBuilder/${userId || 'temp'}`,
                }, (error, result) => {
                    if (error || !result) {
                        console.error('Cloudinary upload error:', error);
                        return reject(error || new Error('Upload failed'));
                    }
                    resolve(result.secure_url);
                });
                uploadStream.end(fileBuffer);
            });
        });
        // 2) PUSH THE CLOUDINARY URL (not file.path)
        const updatedUser = yield user_schema_1.default.findByIdAndUpdate(userId, { $push: { pdf: uploadPdfToCloudinary } }, // ← here!
        { new: true }).select('-password');
        if (!updatedUser)
            res.status(404).json({ success: false, message: 'User not found' });
        return;
        res.status(200).json({
            success: true,
            message: 'PDF uploaded to Cloudinary and user updated',
            data: updatedUser,
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Upload failed', error: error.message });
        return;
    }
});
exports.uploadToCloudinary = uploadToCloudinary;
