import { Request, Response } from 'express';
import * as ProductService from '../services/ProductsService';
import { upload } from '../utils/uploadConfig';

export const getProduct = async (req: Request, res: Response) => {
  const HttpResponse = await ProductService.getProductService();
  res.status(HttpResponse.statusCode).json(HttpResponse.body);
};

export const getProductsBanner = async (req: Request, res: Response) => {
  const HttpResponse = await ProductService.getProductsBannerService();
  res.status(HttpResponse.statusCode).json(HttpResponse.body);
};

export const getProductById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const HttpResponse = await ProductService.getProductByIdService(id);
  res.status(HttpResponse.statusCode).json(HttpResponse.body);
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    upload.single('photo')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const productData = {
        ...req.body,
        photo: req.file?.path || null, // Cloudinary retorna a URL em req.file.path
      };

      const HttpResponse = await ProductService.createProductService(productData);
      res.status(HttpResponse.statusCode).json(HttpResponse.body);
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const HttpResponse = await ProductService.deleteProductService(id);
  res.status(HttpResponse.statusCode).json(HttpResponse.body);
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    upload.single('photo')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const id = parseInt(req.params.id);
      const productData = {
        ...req.body,
        photo: req.file?.path || req.body.photo, // Mantém a foto antiga se não enviar uma nova
      };

      const HttpResponse = await ProductService.updateProductService(id, productData);
      res.status(HttpResponse.statusCode).json(HttpResponse.body);
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};
