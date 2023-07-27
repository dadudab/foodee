import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '../product-list-page/product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FavouriteServiceService } from './favourite-service.service';

@Component({
  selector: 'app-favourites-page',
  templateUrl: './favourites-page.component.html',
  styleUrls: ['./favourites-page.component.scss'],
})
export class FavouritesPageComponent implements OnInit {
  favProducts!: Product[] | [];

  constructor(private favService: FavouriteServiceService) {}

  ngOnInit(): void {
    this.favService.favProducts.subscribe((products: Product[] | []) => {
      this.favProducts = products;
      console.log(this.favProducts);
    });
  }
}
