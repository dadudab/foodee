import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, map, mergeMap, switchMap } from 'rxjs';
import { Product } from 'src/app/product-list-page/product';
import { ProductCategoryService } from 'src/app/product-list-page/product-category-list/product-category.service';
import { ProductCategory } from 'src/app/product-list-page/product-category-list/productCategory';
import { ProductService } from 'src/app/product-list-page/product.service';
import { UpdatedProduct } from 'src/app/product-list-page/updated-product';

@Component({
  selector: 'app-dashboard-update-product',
  templateUrl: './dashboard-update-product.component.html',
  styleUrls: ['./dashboard-update-product.component.scss'],
})
export class DashboardUpdateProductComponent implements OnInit {
  productCategories!: ProductCategory[];
  ingredients: string[] = [];
  ingredient: string = '';
  imagePath!: any;
  imageUrl?: any;
  product!: Product;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  updateProductForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    category: [{}, Validators.required],
    price: ['', [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]],
    basicIngredients: [[''], Validators.required],
  });

  ngOnInit(): void {
    // this.productCategoryService.getCategories().subscribe((categories) => {
    //   this.productCategories = categories;
    //   this.category.setValue(this.productCategories[0]);
    // });
    const productId = this.route.snapshot.paramMap.get('productId');
    if (!productId) return;
    this.productService
      .getProductById(productId)
      .pipe(
        map((product: Product | null) => {
          if (product) {
            this.product = product;
            this.name.setValue(product.name);
            this.price.setValue(product.price.toString());
            this.description.setValue(product.description);
            this.category.setValue(product.productCategory);
            this.basicIngredients.setValue(
              this.convertIngredients(product.basicIngredients)
            );
            console.log(product);
            this.imageUrl = product.imageData.imageUrl;
          }
        }),
        mergeMap(() => {
          return this.productCategoryService.getCategories();
        }),
        map((categories: ProductCategory[]) => {
          this.productCategories = categories;
        })
      )
      .subscribe();
  }

  onNavigateBack(): void {
    this.router.navigate(['/dashboard']);
  }

  get name() {
    return this.updateProductForm.controls.name;
  }

  get description() {
    return this.updateProductForm.controls.description;
  }

  get category() {
    return this.updateProductForm.controls.category;
  }

  get price() {
    return this.updateProductForm.controls.price;
  }

  get basicIngredients() {
    return this.updateProductForm.controls.basicIngredients;
  }

  onChangeCategory(event: any): void {
    const selectedCategory = this.productCategories[Number(event.target.value)];
    this.category.setValue(selectedCategory);
  }

  onInputChange(event: any): void {
    this.ingredient = event.target.value;
    this.basicIngredients.setValue(this.ingredient.split(','));
  }

  onFileUpload(event: any): void {
    this.imagePath = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.imagePath);
    reader.onload = (event) => {
      this.imageUrl = reader.result;
    };
  }

  convertIngredients(ingredients: string[]): string[] {
    const convertedIngredients: string[] = [];
    // for (let ingredient of ingredients) {
    //   if (ingredient[0]) convertedIngredients.push(' ' + ingredient);
    // }
    ingredients.map((ingredient) => convertedIngredients.push(ingredient));
    return convertedIngredients;
  }

  onSubmit(): void {
    if (!this.updateProductForm.valid) return;
    this.productService
      .updateProduct(this.getUpdatedProductData(this.updateProductForm))
      .subscribe((res) => {
        this.router.navigate(['/dashboard/products']);
      });
  }

  private getUpdatedProductData(form: any): UpdatedProduct {
    let imageData;
    if (this.imagePath) {
      imageData = {
        imageString: this.imageUrl,
        imageUrl: '',
        imagePublicId: this.product.imageData.imagePublicId,
      };
    } else {
      imageData = {
        imageString: '',
        imageUrl: this.product.imageData.imageUrl,
        imagePublicId: this.product.imageData.imagePublicId,
      };
    }

    return {
      _id: this.product._id,
      name: form.get('name').value,
      price: Number(form.get('price').value),
      description: form.get('description').value,
      imageData: imageData,
      basicIngredients: form.get('basicIngredients').value,
      productCategory: form.get('category').value,
    };
  }
}
