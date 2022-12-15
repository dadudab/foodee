import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { CartPageComponent } from './cart/cart-page/cart-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { ProductListPageComponent } from './product-list-page/product-list-page.component';

const routes: Routes = [
  {
    path: 'menu',
    component: ProductListPageComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'product/:productId',
    component: ProductDetailPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
