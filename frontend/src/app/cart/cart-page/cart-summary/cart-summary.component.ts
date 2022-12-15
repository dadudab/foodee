import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../../cart';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit {
  @Input() cart!: Cart;

  constructor() {}

  ngOnInit(): void {}
}
