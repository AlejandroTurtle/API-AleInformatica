import { Request, Response } from 'express';
import { uploadSinglePhoto } from '../utils/uploadConfig';
import * as BannerService from '../services/BannerService';
export const createBanner = async (req: Request, res: Response) => {
  try {
    uploadSinglePhoto(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const productData = {
        ...req.body,
        photo: req.file?.path || null, // Cloudinary retorna a URL em req.file.path
      };

      const HttpResponse = await BannerService.createBannerService(productData);
      res.status(HttpResponse.statusCode).json(HttpResponse.body);
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

export const getProductsBanner = async (req: Request, res: Response) => {
  const HttpResponse = await BannerService.getProductsBannerService();
  res.status(HttpResponse.statusCode).json(HttpResponse.body);
};
