import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListPageComponent } from './product-list-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    ProductListPageComponent,
    ProductListComponent,
    ProductListItemComponent,
    ProductCategoryListComponent,
  ],
  imports: [CommonModule, HttpClientModule, AppRoutingModule],
  exports: [ProductListPageComponent, ProductListComponent],
})
export class ProductListPageModule {}
