import { StoreImage, MobileBanner, ApiResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL environment variable is not defined");
}

const isValidUrl = (url: string | undefined | null): url is string => {
  if (!url) return false;
  try {
    return Boolean(new URL(url));
  } catch {
    return false;
  }
};

const getStoreBanners = async (): Promise<{
  desktopBanners: StoreImage[];
  mobileBanners: MobileBanner[];
}> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch store banners");
  }
  
  const data = (await response.json()) as ApiResponse;

  const desktopBanners: StoreImage[] = data.images
    .filter((image) => isValidUrl(image.url))
    .map((image) => ({
      id: image.id,
      url: image.url,
      logoUrl: isValidUrl(data.logoUrl) ? data.logoUrl : null,
      name: data.name,
      facebookUrl: isValidUrl(data.facebookUrl) ? data.facebookUrl : null,
      twitterUrl: isValidUrl(data.twitterUrl) ? data.twitterUrl : null,
      instagramUrl: isValidUrl(data.instagramUrl) ? data.instagramUrl : null,
      images: { url: image.url },
      mobileImages: { mobileUrl: null },
    }));

  const mobileBanners: MobileBanner[] = data.mobileImages
    .filter((image) => isValidUrl(image.mobileUrl))
    .map((image) => ({
      id: image.id,
      mobileUrl: image.mobileUrl,
    }));

  return { desktopBanners, mobileBanners };
};

export default getStoreBanners;