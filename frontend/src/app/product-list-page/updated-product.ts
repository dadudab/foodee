import { ProductCategory } from './product-category-list/productCategory';

export interface UpdatedProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageData: {
    imageString: Blob | string;
    imageUrl: string;
    imagePublicId: string;
  };
  productCategory: ProductCategory;
  basicIngredients: string[];
}
