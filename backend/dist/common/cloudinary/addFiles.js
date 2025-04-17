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
const sharp_1 = __importDefault(require("sharp"));
const user_schema_1 = __importDefault(require("../../users/user.schema")); // Import your User model
require('dotenv').config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log(process.env.CLOUDINARY_API_KEY);
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage });
const uploadToCloudinary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            res.status(400).json({ error: 'No files provided' });
            return;
        }
        const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ error: 'User not authenticated' });
            return;
        }
        const uploadPromises = files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const resizedBuffer = yield (0, sharp_1.default)(file.buffer)
                .resize({ width: 800, height: 600 })
                .toBuffer();
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                    resource_type: 'raw',
                    folder: `resumeBuilder/${userId}`,
                }, (err, result) => {
                    if (err || !result) {
                        console.error('Cloudinary upload error:', err);
                        return reject(err || new Error('Upload failed'));
                    }
                    resolve({
                        url: result.secure_url,
                        uploadedAt: new Date(),
                    });
                });
                uploadStream.end(resizedBuffer);
            });
        }));
        const uploadedImages = yield Promise.all(uploadPromises);
        // Push all images into the user's KYC images array
        const updatedUser = yield user_schema_1.default.findByIdAndUpdate(userId, {
            $push: {
                'pdf': {
                    $each: uploadedImages,
                },
            },
        }, { new: true }).select('-password');
        res.status(200).json({
            success: true,
            message: 'PDF documents uploaded and user record updated successfully',
            data: updatedUser,
        });
        next(); // Proceed to the next middleware/controller if needed
    }
    catch (error) {
        console.error('Error in uploadToCloudinary middleware:', error);
        res.status(500).json({ error: 'Image upload failed', details: error.message });
    }
});
exports.uploadToCloudinary = uploadToCloudinary;
