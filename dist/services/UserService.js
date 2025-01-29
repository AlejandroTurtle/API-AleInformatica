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
exports.authenticateUserService = exports.getAllUsersService = exports.createRegisterService = exports.hashPassword = void 0;
const UserRepository = __importStar(require("../Repositories/UserRepository"));
const HttpResponse = __importStar(require("../utils/http-helper"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!password) {
        throw new Error('A senha não pode estar vazia.');
    }
    return yield bcryptjs_1.default.hash(password, 10);
});
exports.hashPassword = hashPassword;
const createRegisterService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let response = null;
    if (Object.keys(user).length === 0) {
        return yield HttpResponse.badRequest(new Error('Insira os dados corretamente e tente novamente'));
    }
    try {
        user.password = yield (0, exports.hashPassword)(user.password);
        yield UserRepository.createRegister(user);
        response = HttpResponse.created('Usuário cadastrado com sucesso');
    }
    catch (error) {
        response = yield HttpResponse.badRequest(error);
    }
    return response;
});
exports.createRegisterService = createRegisterService;
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield UserRepository.getAllUsers();
    let response = null;
    if (data) {
        response = yield HttpResponse.ok(data);
    }
    else {
        response = yield HttpResponse.noContent();
    }
    return response;
});
exports.getAllUsersService = getAllUsersService;
const authenticateUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let response = null;
    const token = jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    if (Object.keys(user).length === 0) {
        return yield HttpResponse.badRequest(new Error('Insira os dados corretamente e tente novamente'));
    }
    try {
        yield UserRepository.authenticateUser(user);
        response = HttpResponse.ok({
            message: 'Login realizado com sucesso',
            token: token,
        });
    }
    catch (error) {
        response = yield HttpResponse.badRequest(error);
    }
    return response;
});
exports.authenticateUserService = authenticateUserService;
//# sourceMappingURL=UserService.js.map