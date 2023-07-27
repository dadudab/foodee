import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../order';

@Component({
  selector: 'app-order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.scss'],
})
export class OrderListItemComponent implements OnInit {
  @Input() order!: Order;

  constructor() {}

  ngOnInit(): void {
    console.log(this.order);
  }
}
