import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { DashboardPageModule } from './dashboard-page/dashboard-page.module';
import { ErrorMessageModule } from './error-message/error-message.module';
import { HeaderComponent } from './header/header.component';
import { ProductDetailPageModule } from './product-detail-page/product-detail-page.module';
import { ProductListPageModule } from './product-list-page/product-list-page.module';
import { FavouritesPageComponent } from './favourites-page/favourites-page.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FavouritesPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductListPageModule,
    AuthModule,
    ErrorMessageModule,
    CartModule,
    ProductDetailPageModule,
    DashboardPageModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
