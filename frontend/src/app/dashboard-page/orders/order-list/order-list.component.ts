import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  @Input() orders!: Order[];

  constructor() {}

  ngOnInit(): void {
    console.log(this.orders);
  }
}
