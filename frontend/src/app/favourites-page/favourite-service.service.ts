import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../product-list-page/product';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FavouriteServiceService {
  private apiUrl: string = environment.apiUrl;
  favProducts = new BehaviorSubject<Product[] | []>([]);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  getFavouriteProducts(): void {
    this.http
      .get<Product[]>(`${this.apiUrl}/favourite-products`)
      .pipe(
        map((products: Product[]) => {
          console.log(products);
          this.favProducts.next(products);
        })
      )
      .subscribe();
  }

  removeFromFavouriteProducts(productId: string): Observable<Product[]> {
    this.authService.user.subscribe((user) => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    });

    return this.http
      .delete<Product[]>(
        `${this.apiUrl}/favourite-products/${productId}/remove`
      )
      .pipe(
        map((products: Product[]) => {
          this.favProducts.next(products);
          return products;
        })
      );
  }

  addToFavouriteProducts(productId: string): Observable<Product[]> {
    this.authService.user.subscribe((user) => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    });

    return this.http
      .post<Product[]>(
        `${this.apiUrl}/favourite-products/${productId}/add`,
        null
      )
      .pipe(
        map((products: Product[]) => {
          this.favProducts.next(products);
          return products;
        })
      );
  }
}
