import { Component, OnInit } from '@angular/core';
import { ProductCategory } from './product-category-list/productCategory';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
})
export class ProductListPageComponent implements OnInit {
  selectedCategories!: ProductCategory[];

  constructor() {}

  ngOnInit(): void {}

  receiveSelectedProductCategories($event: any): void {
    this.selectedCategories = $event;
  }
}
