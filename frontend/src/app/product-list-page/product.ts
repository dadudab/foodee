import { ProductCategory } from './product-category-list/productCategory';

export interface Product {
  _id: string;
  name: string;
  price: number;
  basicIngredients: string[];
  timestamp: Date;
  description: string;
  imageData: {
    imageUrl: string;
    imageString: string;
    imagePublicId: string;
  };
  productCategory: ProductCategory;
}
