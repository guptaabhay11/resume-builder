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
exports.getExperienceById = exports.deleteExperience = exports.updateExperience = exports.createExperience = exports.getAllExperience = void 0;
const experience_schema_1 = __importDefault(require("./experience.schema"));
/**
 * @function getAllExperience
 * @description Retrieves all experience records.
 * @returns {Promise<IExperience[]>} An array of experience records.
 */
const getAllExperience = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_schema_1.default.find().lean();
    return result;
});
exports.getAllExperience = getAllExperience;
/**
 * @function createExperience
 * @description Creates new experience records.
 * @param {IExperience[]} data - An array of experience records.
 * @returns {Promise<IExperience[]>} The created experience records.
 */
const createExperience = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_schema_1.default.insertMany(data);
    return result;
});
exports.createExperience = createExperience;
/**
 * @function updateExperience
 * @description Updates an existing experience record.
 * @param {string} id - The ID of the experience record to update.
 * @param {IExperience} data - The updated experience record.
 * @returns {Promise<IExperience>} The updated experience record.
 */
const updateExperience = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_schema_1.default.findByIdAndUpdate(id, Object.assign({}, data), { new: true, runValidators: true }).lean();
    if (!result) {
        throw new Error("Experience not found");
    }
    return result;
});
exports.updateExperience = updateExperience;
/**
 * @function deleteExperience
 * @description Deletes an existing experience record.
 * @param {string} id - The ID of the experience record to delete.
 * @returns {Promise<IExperience>} The deleted experience record.
 */
const deleteExperience = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_schema_1.default.findByIdAndDelete(id).lean();
    if (!result) {
        throw new Error("Experience not found");
    }
    return result;
});
exports.deleteExperience = deleteExperience;
/**
 * @function getExperienceById
 * @description Retrieves an existing experience record by ID.
 * @param {string} id - The ID of the experience record to retrieve.
 * @returns {Promise<IExperience>} The retrieved experience record.
 */
const getExperienceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_schema_1.default.findById(id).lean();
    return result;
});
exports.getExperienceById = getExperienceById;
