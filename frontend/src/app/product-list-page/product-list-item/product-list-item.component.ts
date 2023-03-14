import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss'],
})
export class ProductListItemComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService, private router: Router) {}

  onAddProductToCart(): void {
    this.cartService
      .addProductToUserCart(this.product._id)
      .pipe(
        catchError((error) => {
          this.router.navigate(['/login']);
          return of();
        })
      )
      .subscribe();
  }
}
