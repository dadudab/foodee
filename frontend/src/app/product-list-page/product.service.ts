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
import { NewProduct } from './new-product';
import { Product } from './product';
import { UpdatedProduct } from './updated-product';

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

  createProduct(product: NewProduct): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products/new`, product).pipe(
      catchError((error) => {
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }

  deleteProduct(productId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/products/${productId}/delete`)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error('Something went wrong'));
        })
      );
  }

  updateProduct(product: UpdatedProduct): Observable<Product> {
    return this.http
      .put<Product>(`${this.apiUrl}/products/${product._id}/update`, product)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error('Something went wrong'));
        })
      );
  }
}
