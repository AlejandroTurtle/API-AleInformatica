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
exports.authenticateUser = exports.getAllUsers = exports.createRegister = void 0;
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createRegister = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield UserModel_1.default.findOne({
            where: { email: userData.email },
        });
        if (existingUser) {
            throw new Error(`Já existe um usuário cadastrado com esse email ${userData.email}`);
        }
        const user = yield UserModel_1.default.create(userData);
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.createRegister = createRegister;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel_1.default.findAll({
        attributes: ['id', 'name', 'email'],
    });
    return users;
});
exports.getAllUsers = getAllUsers;
const authenticateUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.findOne({
            where: { email: userData.email },
        });
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        const passwordMatch = yield bcryptjs_1.default.compare(userData.password, user.password);
        if (!passwordMatch) {
            throw new Error('Senha incorreta');
        }
        // Remove a senha antes de retornar
        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.password;
        return userWithoutPassword;
    }
    catch (error) {
        throw error;
    }
});
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=UserRepository.js.map