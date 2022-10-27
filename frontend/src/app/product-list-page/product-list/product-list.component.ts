import { Component, OnInit } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  error?: string;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().pipe(
      map(data => {
        console.log(data);
        this.products = data;
      }),
      catchError(error => {
        this.error = error;
        return of([]);
      })
    ).subscribe();
  }
}
