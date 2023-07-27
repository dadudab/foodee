import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderServiceService } from 'src/app/order-service.service';
import { Order } from '../orders/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  orders!: Order[];

  constructor(
    private router: Router,
    private orderService: OrderServiceService
  ) {}

  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
    });
  }

  onNavigateBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
