import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardProductsComponent } from './dashboard-products/dashboard-products.component';
import { DashboardNewProductComponent } from './dashboard-new-product/dashboard-new-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { NewProductCategoryComponent } from './new-product-category/new-product-category.component';
import { DashboardUpdateProductComponent } from './dashboard-update-product/dashboard-update-product.component';
import { UpdateProductCategoryComponent } from './update-product-category/update-product-category.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderListItemComponent } from './orders/order-list/order-list-item/order-list-item.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    DashboardProductsComponent,
    DashboardNewProductComponent,
    ProductCategoriesComponent,
    NewProductCategoryComponent,
    DashboardUpdateProductComponent,
    UpdateProductCategoryComponent,
    OrdersComponent,
    OrderListComponent,
    OrderListItemComponent,
    MyOrdersComponent,
  ],
  imports: [CommonModule, AppRoutingModule, ReactiveFormsModule],
})
export class DashboardPageModule {}
