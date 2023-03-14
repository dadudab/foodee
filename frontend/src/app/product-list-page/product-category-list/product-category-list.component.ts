import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ProductCategoryService } from './product-category.service';
import { ProductCategory } from './productCategory';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss'],
})
export class ProductCategoryListComponent implements OnInit {
  productCategories!: ProductCategory[];
  selectedProductCategories: ProductCategory[] = [];
  error?: string;
  @Output() selectedProductCategoriesEvent = new EventEmitter<
    ProductCategory[]
  >();

  constructor(private productCategoryService: ProductCategoryService) {}

  ngOnInit(): void {
    this.productCategoryService
      .getCategories()
      .pipe(
        map((productCategories: ProductCategory[]) => {
          this.productCategories = productCategories;
          console.log(this.productCategories);
        }),
        catchError((error) => {
          this.error = error;
          return of([]);
        })
      )
      .subscribe();
  }

  onCategoryChange(category: ProductCategory): void {
    const foundCategoryIndex = this.selectedProductCategories.findIndex(
      (existingCategory) => existingCategory._id === category._id
    );

    if (foundCategoryIndex === -1) {
      this.selectedProductCategories.push(category);
    } else {
      this.selectedProductCategories = this.selectedProductCategories.filter(
        (foundCategory) => foundCategory._id !== category._id
      );
    }

    // console.log(this.selectedProductCategories);
    this.selectedProductCategoriesEvent.emit(this.selectedProductCategories);
  }
}
