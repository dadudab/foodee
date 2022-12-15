import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  user?: User | null;

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.authService.user.subscribe((user: User | null) => {
      this.user = user;
    });
    if (this.user) {
      const authRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${this.user.token}`
        ),
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
