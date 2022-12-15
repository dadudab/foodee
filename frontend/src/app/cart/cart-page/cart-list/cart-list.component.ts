import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CartItem } from '../../cart-item';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent {
  @Input() cartProducts!: CartItem[];

  constructor() {}
}
