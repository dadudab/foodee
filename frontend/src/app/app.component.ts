import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { CartService } from './cart/cart.service';
import { FavouriteServiceService } from './favourites-page/favourite-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private favService: FavouriteServiceService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    // this.cartService.getUserCart();
    this.favService.getFavouriteProducts();
  }
}
