import { Request, Response } from 'express';
import * as ProductService from '../services/ProductsService';
import ProductModel from '../Models/ProductModel';

export const getProduct = async (req: Request, res: Response) => {
  const HttpResponse = await ProductService.getProductService();
  res.status(HttpResponse.statusCode).json(HttpResponse.body);
};

export const getProductById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const HttpResponse = await ProductService.getProductByIdService(id);
  res.status(HttpResponse.statusCode).json(HttpResponse.body);
};

export const createProduct = async (req: Request, res: Response) => {
  const bodyValue = req.body;
  const HttpResponse = await ProductService.createProductService(bodyValue);
  res.status(HttpResponse.statusCode).json(HttpResponse.body);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const HttpResponse = await ProductService.deleteProductService(id);
  res.status(HttpResponse.statusCode).json(HttpResponse.body);
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const bodyValue: ProductModel = req.body;
  const HttpResponse = await ProductService.updateProductService(id, bodyValue);
  res.status(HttpResponse.statusCode).json(HttpResponse.body);
};
