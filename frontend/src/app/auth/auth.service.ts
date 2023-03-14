import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserRegistrationData } from './user';
import jwtDecode from 'jwt-decode';
import { CartService } from '../cart/cart.service';

export interface AuthResponse {
  token: string;
}

export interface DecodedToken {
  user: User;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  logoutTimer?: ReturnType<typeof setTimeout>;

  constructor(private http: HttpClient, private cartService: CartService) {}

  loginUser(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/auth/login`,
        { email, password },
        {
          headers: new HttpHeaders(),
        }
      )
      .pipe(
        map((res: AuthResponse) => {
          // console.log(res.token);
          this.handleAuthentication(res.token);
          return res;
        }),
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  handleAuthentication(token: string): void {
    const decodedToken: DecodedToken = jwtDecode(token);
    const user = this.getUserFromDecodedToken(decodedToken, token);

    const currentTime: number = new Date().getTime();
    const tokenExpiresIn: number = (decodedToken.exp - decodedToken.iat) * 1000;
    console.log(tokenExpiresIn);
    const tokenExpiresAt: number = currentTime + tokenExpiresIn;

    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('expiresAt', JSON.stringify(tokenExpiresAt));
    // localStorage.setItem('expiresIn', JSON.stringify(tokenExpiresIn));

    this.user.next(user);
    this.cartService.getUserCart();
    this.autoLogout(tokenExpiresIn);
  }

  autoLogin(): void {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token);
    const tokenExpiresAt = localStorage.getItem('expiresAt');
    const currentTime = new Date().getTime();

    // console.log(currentTime);
    // console.log(tokenExpiresAt);
    // console.log(tokenExpiresIn);

    if (
      !token ||
      !tokenExpiresAt ||
      // !tokenExpiresIn ||
      currentTime >= +tokenExpiresAt
    ) {
      return;
    }

    const tokenExpiresIn = +tokenExpiresAt - currentTime;
    // console.log(tokenExpiresIn);
    const decodedToken: DecodedToken = jwtDecode(token);
    const user = this.getUserFromDecodedToken(decodedToken, token);
    // console.log(decodedToken);
    this.user.next(user);
    this.cartService.getUserCart();
    this.autoLogout(tokenExpiresIn);
  }

  getUserFromDecodedToken(decodedToken: DecodedToken, token: string): User {
    const loggedUser: User = {
      _id: decodedToken.user._id,
      firstName: decodedToken.user.firstName,
      lastName: decodedToken.user.lastName,
      email: decodedToken.user.email,
      city: decodedToken.user.city,
      address: decodedToken.user.address,
      postalCode: decodedToken.user.postalCode,
      phoneNumber: decodedToken.user.phoneNumber,
      timestamp: decodedToken.user.timestamp,
      isAdmin: decodedToken.user.isAdmin,
      token: token,
    };
    return loggedUser;
  }

  autoLogout(tokenExpiresIn: number): void {
    this.logoutTimer = setTimeout(() => {
      this.logoutUser();
    }, tokenExpiresIn);
  }

  logoutUser(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    this.user.next(null);
    this.cartService.setEmptyCart();
    if (this.logoutTimer) clearTimeout(this.logoutTimer);
    console.log('logged user');
  }

  // getToken(): string {
  //   this.user.subscribe(user => {
  //     return user?.token;
  //   })
  // }
  registerUser(
    user: UserRegistrationData
  ): Observable<HttpResponse<AuthResponse>> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/register`, user, {
        observe: 'response',
      })
      .pipe(
        map((res: HttpResponse<AuthResponse>) => {
          if (res.body) this.handleAuthentication(res.body.token);
          return res;
        }),
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }
}
