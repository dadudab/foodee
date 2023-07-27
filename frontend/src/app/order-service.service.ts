import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from './dashboard-page/orders/order';

@Injectable({
  providedIn: 'root',
})
export class OrderServiceService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  createOrder(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/orders/new`, {});
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`).pipe(
      map((orders: Order[]) => {
        return orders;
      })
    );
  }

  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/my-orders`).pipe(
      map((orders: Order[]) => {
        return orders;
      })
    );
  }
}
