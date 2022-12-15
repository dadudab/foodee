import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss'],
})
export class ProductListItemComponent implements OnInit {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    console.log(this.product);
  }

  onAddProductToCart(): void {
    this.cartService.addProductToUserCart(this.product._id).subscribe();
  }
}
