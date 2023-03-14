import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';
import { ProductCategory } from './product-category-list/productCategory';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(
    products: Product[],
    selectedCategories: ProductCategory[]
  ): Product[] {
    const filteredProducts: Product[] = [];

    if (!selectedCategories || selectedCategories.length === 0) return products;
    for (let product of products) {
      for (let category of selectedCategories) {
        if (product.productCategory._id === category._id)
          filteredProducts.push(product);
      }
    }
    return filteredProducts;
  }
}
