import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderServiceService } from 'src/app/order-service.service';
import { Order } from './order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders!: Order[];

  constructor(
    private router: Router,
    private orderService: OrderServiceService
  ) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  onNavigateBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
