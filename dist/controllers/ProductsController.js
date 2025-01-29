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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cheaperProduct = exports.getProductByCategory = exports.updateProduct = exports.deleteProduct = exports.createProduct = exports.getProductById = exports.getProduct = void 0;
const ProductService = __importStar(require("../services/ProductsService"));
const uploadConfig_1 = require("../utils/uploadConfig");
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const HttpResponse = yield ProductService.getProductService();
    res.status(HttpResponse.statusCode).json(HttpResponse.body);
});
exports.getProduct = getProduct;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const HttpResponse = yield ProductService.getProductByIdService(id);
    res.status(HttpResponse.statusCode).json(HttpResponse.body);
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // O middleware de upload precisa ser invocado dessa forma
        (0, uploadConfig_1.uploadMultiplePhotos)(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            // Acessando os arquivos com o nome correto (photos)
            const photoUrls = ((_a = req.files) === null || _a === void 0 ? void 0 : _a.map((file) => file.path)) || [];
            const productData = Object.assign(Object.assign({}, req.body), { photos: photoUrls });
            const HttpResponse = yield ProductService.createProductService(productData);
            res.status(HttpResponse.statusCode).json(HttpResponse.body);
        }));
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
});
exports.createProduct = createProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const HttpResponse = yield ProductService.deleteProductService(id);
    res.status(HttpResponse.statusCode).json(HttpResponse.body);
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, uploadConfig_1.uploadMultiplePhotos)(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            const id = parseInt(req.params.id);
            const productData = Object.assign(Object.assign({}, req.body), { photo: ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || req.body.photos });
            const HttpResponse = yield ProductService.updateProductService(id, productData);
            res.status(HttpResponse.statusCode).json(HttpResponse.body);
        }));
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
});
exports.updateProduct = updateProduct;
const getProductByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.body;
    const HttpResponse = yield ProductService.getProductByCategoryService(category);
    res.status(HttpResponse.statusCode).json(HttpResponse.body);
});
exports.getProductByCategory = getProductByCategory;
const cheaperProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const HttpResponse = yield ProductService.cheaperProductService();
    res.status(HttpResponse.statusCode).json(HttpResponse.body);
});
exports.cheaperProduct = cheaperProduct;
//# sourceMappingURL=ProductsController.js.map