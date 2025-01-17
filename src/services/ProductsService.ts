import ProductModel from '../Models/ProductModel';
import * as ProductRepository from '../Repositories/ProductRepository';
import * as HttpResponse from '../utils/http-helper';

export const getProductService = async () => {
  const data = await ProductRepository.findAllProducts();
  let response = null;
  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }

  return response;
};

export const getProductByIdService = async (id: number) => {
  const data = await ProductRepository.findProductById(id);
  let response = null;
  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }

  return response;
};

export const createProductService = async (product: ProductModel) => {
  let response = null;
  if (Object.keys(product).length === 0) {
    return await HttpResponse.badRequest(new Error('Insira os dados corretamente e tente novamente'));
  }

  try {
    await ProductRepository.createProduct(product);
    response = HttpResponse.created('Produto criado com sucesso');
  } catch (error) {
    response = await HttpResponse.badRequest(error);
  }
  return response;
};

export const deleteProductService = async (id: number) => {
  let response = null;
  try {
    await ProductRepository.deleteProduct(id);
    response = await HttpResponse.ok('Produto deletado com sucesso');
  } catch (error) {
    response = await HttpResponse.badRequest(error);
  }
  return response;
};

export const updateProductService = async (id: number, product: ProductModel) => {
  let response = null;
  try {
    await ProductRepository.updateProduct(id, product);
    response = await HttpResponse.ok('Produto atualizado com sucesso');
  } catch (error) {
    response = await HttpResponse.badRequest(error);
  }
  return response;
};
