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
exports.getResumeByUserId = exports.getResumeById = exports.deleteResume = exports.updateResume = exports.createResume = exports.getAllResume = void 0;
const resume_schema_1 = __importDefault(require("./resume.schema"));
/**
 * @file Contains functions for interacting with the Resume model
 */
/**
 * Retrieves all resumes
 * @returns {Promise<IResume[]>} An array of all resumes
 */
const getAllResume = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield resume_schema_1.default.find().lean();
    return result;
});
exports.getAllResume = getAllResume;
/**
 * Creates a new resume
 * @param {IResume} data - Data to be inserted into the database
 * @param {string} userId - The id of the user creating the resume
 * @returns {Promise<IResume>} The newly created resume
 */
const createResume = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield resume_schema_1.default.create(Object.assign(Object.assign({}, data), { userId }));
    return result;
});
exports.createResume = createResume;
/**
 * Updates a resume
 * @param {string} id - The id of the resume to be updated
 * @param {IResume} data - Data to be inserted into the database
 * @returns {Promise<IResume>} The updated resume
 */
const updateResume = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield resume_schema_1.default.findByIdAndUpdate(id, Object.assign({}, data), { new: true, runValidators: true }).lean();
    if (!result) {
        throw new Error("Resume not found");
    }
    return result;
});
exports.updateResume = updateResume;
/**
 * Deletes a resume
 * @param {string} id - The id of the resume to be deleted
 * @returns {Promise<IResume>} The deleted resume
 */
const deleteResume = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield resume_schema_1.default.findByIdAndDelete(id).lean();
    if (!result) {
        throw new Error("Resume not found");
    }
    return result;
});
exports.deleteResume = deleteResume;
/**
 * Retrieves a resume by id
 * @param {string} id - The id of the resume
 * @returns {Promise<IResume>} The resume
 */
const getResumeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const result = yield ((_c = (_b = (_a = resume_schema_1.default.findById(id)) === null || _a === void 0 ? void 0 : _a.populate("experience")) === null || _b === void 0 ? void 0 : _b.populate("personalInfo")) === null || _c === void 0 ? void 0 : _c.populate("education").lean());
    return result;
});
exports.getResumeById = getResumeById;
/**
 * Retrieves all resumes by user id
 * @param {string} userId - The id of the user
 * @returns {Promise<IResume[]>} An array of all resumes of the user
 */
const getResumeByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const result = yield ((_c = (_b = (_a = resume_schema_1.default.find({ userId: userId })) === null || _a === void 0 ? void 0 : _a.populate("experience")) === null || _b === void 0 ? void 0 : _b.populate("personalInfo")) === null || _c === void 0 ? void 0 : _c.populate("education").lean());
    return result;
});
exports.getResumeByUserId = getResumeByUserId;
