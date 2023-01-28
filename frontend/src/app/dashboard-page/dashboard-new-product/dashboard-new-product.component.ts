import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewProduct } from 'src/app/product-list-page/new-product';
import { Product } from 'src/app/product-list-page/product';
import { ProductCategoryService } from 'src/app/product-list-page/product-category-list/product-category.service';
import { ProductCategory } from 'src/app/product-list-page/product-category-list/productCategory';
import { ProductService } from 'src/app/product-list-page/product.service';

@Component({
  selector: 'app-dashboard-new-product',
  templateUrl: './dashboard-new-product.component.html',
  styleUrls: ['./dashboard-new-product.component.scss'],
})
export class DashboardNewProductComponent implements OnInit {
  productCategories!: ProductCategory[];
  ingredients: string[] = [];
  ingredient: string = '';
  imagePath!: Blob;
  imageUrl?: any;

  newProductForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    category: [{}, Validators.required],
    price: ['', [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]],
    basicIngredients: [[''], Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productCategory: ProductCategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productCategory.getCategories().subscribe((categories) => {
      this.productCategories = categories;
      this.category.setValue(this.productCategories[0]);
    });
  }

  get name() {
    return this.newProductForm.controls.name;
  }

  get description() {
    return this.newProductForm.controls.description;
  }

  get category() {
    return this.newProductForm.controls.category;
  }

  get price() {
    return this.newProductForm.controls.price;
  }

  get basicIngredients() {
    return this.newProductForm.controls.basicIngredients;
  }

  onNavigateBack(): void {
    this.router.navigate(['/dashboard']);
  }

  onChangeCategory(event: any): void {
    const selectedCategory = this.productCategories[Number(event.target.value)];
    this.category.setValue(selectedCategory);
  }

  onInputChange(event: any): void {
    this.ingredient = event.target.value;
    const ingredients = this.ingredient.split(',');
    this.basicIngredients.setValue(ingredients);
  }

  onFileUpload(event: any): void {
    this.imagePath = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.imagePath);
    reader.onload = (event) => {
      this.imageUrl = reader.result;
    };
  }

  onSubmit() {
    if (!this.newProductForm.valid) return;

    const newProductData: NewProduct = this.getNewProductData(
      this.newProductForm
    );
    this.productService.createProduct(newProductData).subscribe((res) => {
      this.imagePath = new Blob();
      this.imageUrl = '';
      this.router.navigate(['/dashboard/products']);
    });
  }

  private getNewProductData(form: any): NewProduct {
    return {
      name: form.get('name').value,
      price: Number(form.get('price').value),
      description: form.get('description').value,
      imageData: {
        imageString: this.imageUrl,
      },
      basicIngredients: form.get('basicIngredients').value,
      productCategory: form.get('category').value,
    };
  }
}
