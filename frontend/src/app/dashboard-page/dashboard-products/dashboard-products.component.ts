import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, mergeMap, switchMap } from 'rxjs';
import { Product } from 'src/app/product-list-page/product';
import { ProductService } from 'src/app/product-list-page/product.service';

@Component({
  selector: 'app-dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrls: ['./dashboard-products.component.scss'],
})
export class DashboardProductsComponent implements OnInit {
  products!: Product[];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(products);
    });
  }

  onNavigateBack(): void {
    this.router.navigate(['/dashboard']);
  }

  onDelete(productId: string): void {
    this.productService
      .deleteProduct(productId)
      .pipe(
        mergeMap(() => {
          return this.productService.getProducts();
        }),
        map((products: Product[]) => {
          this.products = products;
        })
      )
      .subscribe();
  }

  onUpdate(productId: string): void {
    this.router.navigate(['/dashboard/products', productId, 'update']);
  }
}
