import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user';
import { Cart } from '../cart/cart';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isSidebarOpen: boolean = false;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  userSub?: Subscription;
  cartSub?: Subscription;
  cartTotalQuantity: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.user
      .pipe(
        switchMap((user: User | null) => {
          if (user) {
            this.isLoggedIn = !!user;
            if (user.isAdmin) this.isAdmin = true;
          } else {
            this.isLoggedIn = false;
          }
          return this.cartService.cart;
        }),
        map((cart) => {
          this.cartTotalQuantity = cart.totalQuantity;
        })
      )
      .subscribe();
  }

  onToggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onNavigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  onLogout(): void {
    this.authService.logoutUser();
  }

  onNavigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
    if (this.cartSub) this.cartSub.unsubscribe();
  }
}
