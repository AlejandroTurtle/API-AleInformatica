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
exports.cheaperProductService = exports.getProductByCategoryService = exports.updateProductService = exports.deleteProductService = exports.createProductService = exports.getProductByIdService = exports.getProductService = void 0;
const ProductRepository = __importStar(require("../Repositories/ProductRepository"));
const HttpResponse = __importStar(require("../utils/http-helper"));
const getProductService = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield ProductRepository.findAllProducts();
    let response = null;
    if (data) {
        response = yield HttpResponse.ok(data);
    }
    else {
        response = yield HttpResponse.noContent();
    }
    return response;
});
exports.getProductService = getProductService;
const getProductByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield ProductRepository.findProductById(id);
    let response = null;
    if (data) {
        response = yield HttpResponse.ok(data);
    }
    else {
        response = yield HttpResponse.noContent();
    }
    return response;
});
exports.getProductByIdService = getProductByIdService;
const createProductService = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const missingFields = [];
    if (!product.name)
        missingFields.push('name');
    if (!product.price)
        missingFields.push('price');
    if (!product.description)
        missingFields.push('description');
    if (!product.photos)
        missingFields.push('photos');
    if (!product.category)
        missingFields.push('category');
    if (missingFields.length > 0) {
        return yield HttpResponse.badRequest(new Error(`Os seguintes campos estão faltando: ${missingFields.join(', ')}. Por favor, insira todos os dados e tente novamente.`));
    }
    let response = null;
    try {
        yield ProductRepository.createProduct(product);
        response = HttpResponse.created('Produto criado com sucesso');
    }
    catch (error) {
        response = yield HttpResponse.badRequest(error);
    }
    return response;
});
exports.createProductService = createProductService;
const deleteProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let response = null;
    try {
        yield ProductRepository.deleteProduct(id);
        response = yield HttpResponse.ok('Produto deletado com sucesso');
    }
    catch (error) {
        response = yield HttpResponse.badRequest(error);
    }
    return response;
});
exports.deleteProductService = deleteProductService;
const updateProductService = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    let response = null;
    try {
        yield ProductRepository.updateProduct(id, product);
        response = yield HttpResponse.ok('Produto atualizado com sucesso');
    }
    catch (error) {
        response = yield HttpResponse.badRequest(error);
    }
    return response;
});
exports.updateProductService = updateProductService;
const getProductByCategoryService = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield ProductRepository.getProductByCategory(category);
    let response = null;
    if (data) {
        response = yield HttpResponse.ok(data);
    }
    else {
        response = yield HttpResponse.noContent();
    }
    return response;
});
exports.getProductByCategoryService = getProductByCategoryService;
const cheaperProductService = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield ProductRepository.cheaperProduct();
    let response = null;
    if (data) {
        response = yield HttpResponse.ok(data);
    }
    else {
        response = yield HttpResponse.noContent();
    }
    return response;
});
exports.cheaperProductService = cheaperProductService;
//# sourceMappingURL=ProductsService.js.map