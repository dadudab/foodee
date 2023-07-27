import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { CartPageComponent } from './cart/cart-page/cart-page.component';
import { DashboardNewProductComponent } from './dashboard-page/dashboard-new-product/dashboard-new-product.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DashboardProductsComponent } from './dashboard-page/dashboard-products/dashboard-products.component';
import { DashboardUpdateProductComponent } from './dashboard-page/dashboard-update-product/dashboard-update-product.component';
import { NewProductCategoryComponent } from './dashboard-page/new-product-category/new-product-category.component';
import { ProductCategoriesComponent } from './dashboard-page/product-categories/product-categories.component';
import { UpdateProductCategoryComponent } from './dashboard-page/update-product-category/update-product-category.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { ProductListPageComponent } from './product-list-page/product-list-page.component';
import { FavouritesPageComponent } from './favourites-page/favourites-page.component';
import { OrdersComponent } from './dashboard-page/orders/orders.component';
import { MyOrdersComponent } from './dashboard-page/my-orders/my-orders.component';

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
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/my-orders',
    component: MyOrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/products',
    component: DashboardProductsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'dashboard/products/new',
    component: DashboardNewProductComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'dashboard/product-categories',
    component: ProductCategoriesComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'dashboard/product-categories/new',
    component: NewProductCategoryComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'dashboard/products/:productId/update',
    component: DashboardUpdateProductComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'dashboard/product-categories/:categoryId/update',
    component: UpdateProductCategoryComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'favourites',
    component: FavouritesPageComponent,
  },
  {
    path: '**',
    redirectTo: '/menu',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminGuard, AuthGuard],
})
export class AppRoutingModule {}
