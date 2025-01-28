import Banner from '../Models/BannerModel';
import * as BannerRepository from '../Repositories/BannerRepository';
import * as HttpResponse from '../utils/http-helper';

export const createBannerService = async (banner: Banner) => {
  const missingFields: string[] = [];

  if (!banner.photo) missingFields.push('name');
  if (!banner.category) missingFields.push('category');

  if (missingFields.length > 0) {
    return await HttpResponse.badRequest(
      new Error(
        `Os seguintes campos estão faltando: ${missingFields.join(
          ', '
        )}. Por favor, insira todos os dados e tente novamente.`
      )
    );
  }
  let response = null;

  try {
    await BannerRepository.createBanner(banner);
    response = HttpResponse.created('Banner criado com sucesso');
  } catch (error) {
    response = await HttpResponse.badRequest(error);
  }

  return response;
};

export const getProductsBannerService = async () => {
  const data = await BannerRepository.getProductsBanner();
  let response = null;
  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }

  return response;
};
