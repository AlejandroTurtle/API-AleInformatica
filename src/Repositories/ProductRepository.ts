import Banner from '../Models/BannerModel';
import ProductModel from '../Models/ProductModel';
import Product from '../Models/ProductModel';
import { Op, Sequelize } from 'sequelize';

export const findAllProducts = async (): Promise<ProductModel[]> => {
  return await Product.findAll();
};
export const findProductById = async (id: number): Promise<ProductModel | null> => {
  return await Product.findByPk(id);
};

export const createProduct = async (productData: ProductModel): Promise<ProductModel> => {
  return await Product.create(productData as any);
};

export const deleteProduct = async (id: number) => {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error(`Produto com ID ${id} não encontrado.`);
  }

  await product.destroy();
};

export const updateProduct = async (id: number, productData: ProductModel): Promise<ProductModel> => {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error(`Produto com ID ${id} não encontrado.`);
  }

  return await product.update(productData);
};

export const getProductByCategory = async (category: string): Promise<ProductModel[]> => {
  if (category === 'Tudo') {
    return await Product.findAll();
  } else {
    return await Product.findAll({
      where: {
        category: category,
      },
    });
  }
};

export const cheaperProduct = async (): Promise<ProductModel[]> => {
  return await Product.findAll({
    where: {
      price: {
        [Op.lt]: 300,
      },
    },
  });
};
