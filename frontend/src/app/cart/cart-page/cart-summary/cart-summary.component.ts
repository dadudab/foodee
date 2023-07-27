import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { OrderServiceService } from 'src/app/order-service.service';
import { Cart } from '../../cart';
import { CartService } from '../../cart.service';

declare var paypal: any;

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit {
  @Input() cart!: Cart;
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;

  constructor(
    private orderService: OrderServiceService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: this.cart.totalPrice.toFixed(2),
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          this.orderService.createOrder().subscribe();
          this.cartService.cart.next({
            products: [],
            totalPrice: 0,
            totalQuantity: 0,
          });
          // this.router.navigate(['/']);
          return actions.order.capture();
        },
        onError: (err: any) => {
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }

  onTestOrder(): void {
    this.orderService.createOrder().subscribe();
    this.cartService.cart.next({
      products: [],
      totalPrice: 0,
      totalQuantity: 0,
    });
  }
}
