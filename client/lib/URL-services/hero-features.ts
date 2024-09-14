import { request } from "../axios";

export const getHeroFeatures = async () => {
  return await request({
    url: "/hero-features",
    method: "GET",
  });
};

export const getHeroFeaturesQueryKey = ["hero-features"];

// --------------update-hero-features.ts--------------

export const updateHeroFeatures = async (features: string[]) => {
  return await request({
    url: "/hero-features",
    method: "PUT",
    data: {
      features,
    },
    withCredentials: true,
  });
};
