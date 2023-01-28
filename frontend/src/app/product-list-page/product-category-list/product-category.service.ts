import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductCategory } from './productCategory';
import { UpdatedCategory } from './updated-category';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ProductCategory[]> {
    return this.http
      .get<ProductCategory[]>(`${this.apiUrl}/product-category`)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  createCategory(name: string): Observable<HttpResponse<any>> {
    return this.http.post(
      `${this.apiUrl}/product-category/new`,
      {
        name: name,
      },
      { observe: 'response' }
    );
  }

  deleteCategory(categoryId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/product-category/${categoryId}/delete`)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error('Something went wrong'));
        })
      );
  }

  getCategoryById(categoryId: string): Observable<ProductCategory> {
    return this.http
      .get<ProductCategory>(`${this.apiUrl}/product-category/${categoryId}`)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error('Category not found'));
        })
      );
  }

  updateCategory(category: UpdatedCategory): Observable<ProductCategory> {
    return this.http
      .put<ProductCategory>(
        `${this.apiUrl}/product-category/${category._id}/update`,
        category
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error('Something went wrong'));
        })
      );
  }
}
