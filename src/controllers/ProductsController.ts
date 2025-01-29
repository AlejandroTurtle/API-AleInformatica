import { Request, Response } from 'express';
import * as ProductService from '../services/ProductsService';
import { uploadMultiplePhotos } from '../utils/uploadConfig';

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
  try {
    // O middleware de upload precisa ser invocado dessa forma
    uploadMultiplePhotos(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // Acessando os arquivos com o nome correto (photos)
      const photoUrls = (req.files as Express.Multer.File[] | undefined)?.map((file) => file.path) || [];

      const productData = {
        ...req.body,
        photos: photoUrls, // Array de URLs
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
    uploadMultiplePhotos(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const id = parseInt(req.params.id);
      const productData = {
        ...req.body,
        photo: req.file?.path || req.body.photos,
      };

      const HttpResponse = await ProductService.updateProductService(id, productData);
      res.status(HttpResponse.statusCode).json(HttpResponse.body);
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

export const getProductByCategory = async (req: Request, res: Response) => {
  const { category } = req.body;
  const HttpResponse = await ProductService.getProductByCategoryService(category);
  res.status(HttpResponse.statusCode).json(HttpResponse.body);
};

export const cheaperProduct = async (req: Request, res: Response) => {
  const HttpResponse = await ProductService.cheaperProductService();
  res.status(HttpResponse.statusCode).json(HttpResponse.body);
};
