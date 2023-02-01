import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class OrderServiceService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  createOrder(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/orders/new`, {});
  }
}
