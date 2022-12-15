import { Component, Input, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { CartItem } from '../../cart-item';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem!: CartItem;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    console.log(this.cartItem);
  }

  onAddProductToCart(): void {
    this.cartService
      .addProductToUserCart(this.cartItem.productId)
      .pipe(
        catchError((error) => {
          return of();
        })
      )
      .subscribe();
  }

  onRemoveProductFromCart(): void {
    this.cartService
      .removeProductFromCart(this.cartItem.productId)
      .pipe(
        catchError((error) => {
          return of();
        })
      )
      .subscribe();
  }
}
