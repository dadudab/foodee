import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ErrorMessageModule } from '../error-message/error-message.module';
import { CartListComponent } from './cart-page/cart-list/cart-list.component';
import { CartItemComponent } from './cart-page/cart-item/cart-item.component';
import { CartSummaryComponent } from './cart-page/cart-summary/cart-summary.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CartPageComponent,
    CartListComponent,
    CartItemComponent,
    CartSummaryComponent,
  ],
  imports: [
    CommonModule,
    ErrorMessageModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CartModule {}
