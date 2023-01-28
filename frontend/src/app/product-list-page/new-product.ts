import { ProductCategory } from './product-category-list/productCategory';

export interface NewProduct {
  name: string;
  price: number;
  description: string;
  imageData: {
    imageString: Blob;
  };
  productCategory: ProductCategory;
  basicIngredients: string[];
}
