import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
import { Product } from '../product';
import { AuthService } from 'src/app/auth/auth.service';
import { FavouriteServiceService } from 'src/app/favourites-page/favourite-service.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss'],
})
export class ProductListItemComponent implements OnInit {
  @Input() product!: Product;
  isFavourite: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private favService: FavouriteServiceService
  ) {}

  ngOnInit(): void {
    this.favService.favProducts.subscribe((products: Product[] | []) => {
      if (products.length > 0) {
        for (let product of products) {
          if (product._id === this.product._id) this.isFavourite = true;
        }
      }
    });
  }

  onAddProductToCart(): void {
    this.cartService
      .addProductToUserCart(this.product._id)
      .pipe(
        catchError((error) => {
          this.router.navigate(['/login']);
          return of();
        })
      )
      .subscribe();
  }

  onRemoveFromFavourite() {
    this.favService
      .removeFromFavouriteProducts(this.product._id)
      .subscribe(() => {
        this.isFavourite = false;
      });
  }

  onAddToFavourite() {
    this.favService.addToFavouriteProducts(this.product._id).subscribe(() => {
      this.isFavourite = true;
    });
  }
}
