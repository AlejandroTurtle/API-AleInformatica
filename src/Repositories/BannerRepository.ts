import Banner from '../Models/BannerModel';

export const createBanner = async (bannerData: Banner): Promise<Banner> => {
  return await Banner.create(bannerData as any);
};

export const getProductsBanner = async (): Promise<Banner[]> => {
  return Banner.findAll();
};
