import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  mergeMap,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user';
import { Cart } from './cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  apiUrl = environment.apiUrl;
  emptyCart: Cart = {
    products: [],
    totalPrice: 0,
    totalQuantity: 0,
  };
  cart: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.emptyCart);

  constructor(private http: HttpClient) {}

  getUserCart(): void {
    this.http
      .get<Cart>(`${this.apiUrl}/cart`)
      .pipe(
        map((cart: Cart) => {
          this.cart.next(cart);
          return cart;
        }),
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      )
      .subscribe();
  }

  addProductToUserCart(productId: string): Observable<Cart> {
    return this.http
      .post<Cart>(`${this.apiUrl}/cart/add/product/${productId}`, null)
      .pipe(
        map((cart: Cart) => {
          this.cart.next(cart);
          return cart;
        }),
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  removeProductFromCart(productId: string): Observable<Cart> {
    return this.http
      .delete<Cart>(
        `${this.apiUrl}/cart/remove/product/${productId}?quantity=1`
      )
      .pipe(
        map((cart: Cart) => {
          this.cart.next(cart);
          return cart;
        }),
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  setEmptyCart(): void {
    this.cart.next(this.emptyCart);
  }
}
