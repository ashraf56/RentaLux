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
exports.Userservices = void 0;
const trhowErrorHandller_1 = __importDefault(require("../../utills/trhowErrorHandller"));
const user_model_1 = __importDefault(require("./user.model"));
const createUserDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserexist = yield user_model_1.default.findOne({ email: payload.email });
    if (isUserexist) {
        (0, trhowErrorHandller_1.default)('User already found');
    }
    const result = yield user_model_1.default.create(payload);
    return result;
});
const LogInUserDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.findOne({ email: payload.email });
    if (!users || !(users === null || users === void 0 ? void 0 : users.password)) {
        (0, trhowErrorHandller_1.default)('User not found');
    }
    const passwordMatcher = yield user_model_1.default.isPasswordmatch(payload.password, users === null || users === void 0 ? void 0 : users.password);
    if (!passwordMatcher) {
        (0, trhowErrorHandller_1.default)('password not match');
    }
    return users;
});
exports.Userservices = {
    createUserDB,
    LogInUserDB
};
