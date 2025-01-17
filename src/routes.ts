import { Router } from 'express';
import * as ProductController from './controllers/ProductsController';
import * as UserController from './controllers/UserController';

const router = Router();

router.get('/product', ProductController.getProduct);
router.get('/product/:id', ProductController.getProductById);
router.post('/product', ProductController.createProduct);
router.delete('/product/:id', ProductController.deleteProduct);
router.put('/product/:id', ProductController.updateProduct);

router.post('/user', UserController.createRegister);
router.get('/user', UserController.getUsers);
router.post('/user/login', UserController.authenticateUser);

export default router;
