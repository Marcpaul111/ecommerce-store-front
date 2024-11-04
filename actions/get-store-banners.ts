import { StoreImage } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const getStoreBanners = async (): Promise<StoreImage[]> => {
  const response = await fetch(`${URL}`);
  if (!response.ok) {
    throw new Error("Failed to fetch store banners");
  }
  return response.json();
};

export default getStoreBanners;
