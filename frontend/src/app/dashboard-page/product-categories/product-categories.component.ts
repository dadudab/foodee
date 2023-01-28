import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { ProductCategoryService } from 'src/app/product-list-page/product-category-list/product-category.service';
import { ProductCategory } from 'src/app/product-list-page/product-category-list/productCategory';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
})
export class ProductCategoriesComponent implements OnInit {
  productCategories!: ProductCategory[];

  constructor(
    private productCategoryService: ProductCategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productCategoryService.getCategories().subscribe((res) => {
      this.productCategories = res;
      console.log(res);
    });
  }

  onNavigateBack(): void {
    this.router.navigate(['/dashboard']);
  }

  onDelete(categoryId: string): void {
    this.productCategoryService
      .deleteCategory(categoryId)
      .pipe(
        mergeMap(() => {
          return this.productCategoryService.getCategories();
        }),
        map((categories) => {
          this.productCategories = categories;
        })
      )
      .subscribe();
  }

  onUpdate(categoryId: string): void {
    this.router.navigate([
      '/dashboard/product-categories',
      categoryId,
      'update',
    ]);
  }
}
