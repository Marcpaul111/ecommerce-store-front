export interface Banner {
    id: string;
    label: string;
    imageUrl: string;
}

export interface Category {
    id: string;
    name: string;
    banner: Banner;
}

export interface Product{
    id:string;
    name:string;
    category: Category;
    price:string;
    isFeatured: string;
    isArchived: string;
    size: Size;
    color: Color;
    images: Image[];
}

export interface Image{
    id:string;
    url:string;
}


export interface Size {
    id: string;
    name:string;    
    value:string;
}

export interface Color {
    id: string;
    name:string;
    value:string;
}
