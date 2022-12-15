import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { Product } from '../product-list-page/product';
import { ProductService } from '../product-list-page/product.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss'],
})
export class ProductDetailPageComponent implements OnInit {
  product?: Product;
  error?: string;
  productId!: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('productId');
    if (!id) return;
    this.productId = id;

    this.productService
      .getProductById(id)
      .pipe(
        map((product: Product) => {
          this.error = '';
          this.product = product;
          console.log(this.product);
        }),
        catchError((error) => {
          this.error = error;
          return of();
        })
      )
      .subscribe();
  }

  onAddToCart(): void {
    this.cartService
      .addProductToUserCart(this.productId)
      .pipe(
        catchError((error) => {
          // console.log(error);
          this.error = error;
          return of();
        })
      )
      .subscribe();
  }
}
