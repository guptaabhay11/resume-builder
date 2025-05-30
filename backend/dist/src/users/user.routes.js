"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const catch_error_middleware_1 = require("../common/middleware/catch-error.middleware");
const role_auth_middleware_1 = require("../common/middleware/role-auth.middleware");
const sendFile_1 = require("../common/helper/sendFile");
const userController = __importStar(require("./user.controller"));
const response_helper_1 = require("../common/helper/response.helper");
const userValidator = __importStar(require("./user.validation"));
const multer_1 = __importDefault(require("../common/middleware/multer"));
const router = (0, express_1.Router)();
router
    .post("/register", userValidator.createUser, catch_error_middleware_1.catchError, userController.createUser)
    .post("/login", userValidator.login, catch_error_middleware_1.catchError, passport_1.default.authenticate('login', { session: false }), userController.login)
    .get("/me", (0, role_auth_middleware_1.roleAuth)(['USER']), userController.getUserInfo);
// .post("/upload-pdf", authenticateUser,upload.single('pdf'), userController.uploadPdf)
router.post("/send-email", multer_1.default.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, subject, html } = req.body;
    const file = req.file;
    console.log(req.body);
    console.log(file);
    if (!file) {
        throw new Error("Failed to file not found");
    }
    const filePath = file.path;
    const fileName = file.originalname;
    const result = yield (0, sendFile_1.sendFile)({
        email,
        subject,
        html,
        filePath,
        fileName,
    });
    if (result) {
        res.send((0, response_helper_1.createResponse)(result, "File Sent Successfully"));
    }
    else {
        throw new Error("Failed to send file");
    }
}));
exports.default = router;
