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
exports.getResumeByUserId = exports.getResumeById = exports.deleteResume = exports.updateResume = exports.createResume = exports.getAllResume = void 0;
const ResumeService = __importStar(require("./resume.service"));
const response_helper_1 = require("../common/helper/response.helper");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
/**
 * Fetches all resumes.
 * @route GET /resumes
 * @access public
 * @returns A list of all resumes.
 */
exports.getAllResume = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ResumeService.getAllResume();
    res.send((0, response_helper_1.createResponse)(result, "Resume Fetched Successfully"));
}));
/**
 * Creates a new resume.
 * @route POST /resumes
 * @access private
 * @param req.body - The resume data to create.
 * @returns The created resume.
 */
exports.createResume = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const result = yield ResumeService.createResume(req.body, userId);
    res.send((0, response_helper_1.createResponse)(result, "Resume Created Successfully"));
}));
/**
 * Updates an existing resume.
 * @route PATCH /resumes/:id
 * @access private
 * @param req.params.id - The ID of the resume to update.
 * @param req.body - The updated resume data.
 * @returns The updated resume.
 */
exports.updateResume = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield ResumeService.updateResume(id, req.body);
    res.send((0, response_helper_1.createResponse)(result, "Resume Updated Successfully"));
}));
/**
 * Deletes a resume.
 * @route DELETE /resumes/:id
 * @access private
 * @param req.params.id - The ID of the resume to delete.
 * @returns The deleted resume.
 */
exports.deleteResume = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield ResumeService.deleteResume(id);
    res.send((0, response_helper_1.createResponse)(result, "Resume Deleted Successfully"));
}));
/**
 * Fetches a specific resume by ID.
 * @route GET /resumes/:id
 * @access public
 * @param req.params.id - The ID of the resume to fetch.
 * @returns The resume with the specified ID.
 */
exports.getResumeById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield ResumeService.getResumeById(id);
    res.send((0, response_helper_1.createResponse)(result, "Resume Fetched Successfully"));
}));
/**
 * Fetches resumes of the current user.
 * @route GET /resumes/my
 * @access private
 * @returns The resumes of the current user.
 */
exports.getResumeByUserId = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const result = yield ResumeService.getResumeByUserId(id);
    res.send((0, response_helper_1.createResponse)(result, "Resume Fetched Successfully"));
}));
