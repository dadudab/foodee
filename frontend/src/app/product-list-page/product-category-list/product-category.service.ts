import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductCategory } from './productCategory';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`${this.apiUrl}/product-category`)
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error.error.message));
        })
      )
  }
}
