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
exports.cheaperProduct = exports.getProductByCategory = exports.updateProduct = exports.deleteProduct = exports.createProduct = exports.findProductById = exports.findAllProducts = void 0;
const ProductModel_1 = __importDefault(require("../Models/ProductModel"));
const sequelize_1 = require("sequelize");
const findAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ProductModel_1.default.findAll();
});
exports.findAllProducts = findAllProducts;
const findProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ProductModel_1.default.findByPk(id);
});
exports.findProductById = findProductById;
const createProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ProductModel_1.default.create(productData);
});
exports.createProduct = createProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield ProductModel_1.default.findByPk(id);
    if (!product) {
        throw new Error(`Produto com ID ${id} não encontrado.`);
    }
    yield product.destroy();
});
exports.deleteProduct = deleteProduct;
const updateProduct = (id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield ProductModel_1.default.findByPk(id);
    if (!product) {
        throw new Error(`Produto com ID ${id} não encontrado.`);
    }
    return yield product.update(productData);
});
exports.updateProduct = updateProduct;
const getProductByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    if (category === 'Tudo') {
        return yield ProductModel_1.default.findAll();
    }
    else {
        return yield ProductModel_1.default.findAll({
            where: {
                category: category,
            },
        });
    }
});
exports.getProductByCategory = getProductByCategory;
const cheaperProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ProductModel_1.default.findAll({
        where: {
            price: {
                [sequelize_1.Op.lt]: 300,
            },
        },
    });
});
exports.cheaperProduct = cheaperProduct;
//# sourceMappingURL=ProductRepository.js.map