import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailPageComponent } from './product-detail-page.component';
import { ErrorMessageModule } from '../error-message/error-message.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [ProductDetailPageComponent],
  imports: [CommonModule, ErrorMessageModule, AppRoutingModule],
})
export class ProductDetailPageModule {}
