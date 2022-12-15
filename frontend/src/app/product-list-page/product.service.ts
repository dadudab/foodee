import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.error.message));
      })
    );
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${productId}`).pipe(
      map((product: Product) => {
        return product;
      }),
      catchError((error) => {
        return throwError(() => new Error('Product not found'));
      })
    );
  }
}
