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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController = __importStar(require("./controllers/ProductsController"));
const UserController = __importStar(require("./controllers/UserController"));
const BannerController = __importStar(require("./controllers/BannerController"));
const router = (0, express_1.Router)();
router.get('/products', ProductController.getProduct);
router.get('/product/:id', ProductController.getProductById);
router.post('/product', ProductController.createProduct);
router.delete('/product/:id', ProductController.deleteProduct);
router.put('/product/:id', ProductController.updateProduct);
router.post('/product/category', ProductController.getProductByCategory);
router.get('/products/cheaper', ProductController.cheaperProduct);
router.get('/products/banner', BannerController.getProductsBanner);
router.post('/products/banner', BannerController.createBanner);
router.post('/user', UserController.createRegister);
router.get('/user', UserController.getUsers);
router.post('/user/login', UserController.authenticateUser);
exports.default = router;
//# sourceMappingURL=routes.js.map