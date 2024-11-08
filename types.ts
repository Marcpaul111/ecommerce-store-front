export interface Banner {
  id: string;
  label: string;
  imageUrl: string;
}

export interface StoreImage {
  id: string;
  url: string;
  logoUrl: string | null;
  name: string;
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  images: {
    url: string;
  };
  mobileImages: {
    mobileUrl: string | null;
  };
}

export interface MobileBanner {
  mobileUrl: string;
  id: string;
}

export interface ApiResponse {
  id: string;
  name: string;
  userId: string;
  logoUrl: string;
  twitterUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  createdAt: string;
  updatedAt: string;
  images: Array<{
    id: string;
    storeId: string;
    url: string;
    createdAt: string;
    updatedAt: string;
  }>;
  mobileImages: Array<{
    id: string;
    storeId: string;
    mobileUrl: string;
    createdAt: string;
    updatedAt: string;
  }>;
}
export interface Category {
  id: string;
  name: string;
  banner: Banner;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: string;
  description: string;
  isFeatured: string;
  isNew: string;
  isArchived: string;
  size: Size;
  color: Color;
  images: Image[];
}

export interface Image {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}
