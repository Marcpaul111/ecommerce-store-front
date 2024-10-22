
import { Banner } from "@/types"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/banners`;

const getBanners = async (id:string): Promise<Banner> => {
    const response = await fetch(`${URL}/${id}`);

    return response.json();
}

export default getBanners