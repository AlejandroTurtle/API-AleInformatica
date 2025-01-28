import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

interface CloudinaryStorageParams {
  cloudinary: typeof cloudinary;
  params: {
    folder: string;
    allowed_formats?: string[];
    transformation?: Array<{
      width?: number;
      height?: number;
      crop?: string;
    }>;
  };
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }], // opcional
  },
} as CloudinaryStorageParams);

export const uploadSinglePhoto = multer({ storage }).single('photo'); // Um único arquivo no campo "photo"

export const uploadMultiplePhotos = multer({ storage }).array('photos', 5); // Até 5 arquivos no campo "photos"
