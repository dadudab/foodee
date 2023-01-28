import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategoryService } from 'src/app/product-list-page/product-category-list/product-category.service';
import { ProductCategory } from 'src/app/product-list-page/product-category-list/productCategory';
import { UpdatedCategory } from 'src/app/product-list-page/product-category-list/updated-category';

@Component({
  selector: 'app-update-product-category',
  templateUrl: './update-product-category.component.html',
  styleUrls: ['./update-product-category.component.scss'],
})
export class UpdateProductCategoryComponent implements OnInit {
  category!: ProductCategory;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productCategoryService: ProductCategoryService,
    private route: ActivatedRoute
  ) {}

  updatedCategoryForm = this.fb.group({
    name: ['', Validators.required],
  });

  get name() {
    return this.updatedCategoryForm.controls.name;
  }

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');
    if (!categoryId) return;
    this.productCategoryService
      .getCategoryById(categoryId)
      .subscribe((category) => {
        this.category = category;
        this.name.setValue(this.category.name);
      });
  }

  onNavigateBack(): void {
    this.router.navigate(['/dashboard']);
  }

  onSubmit(): void {
    if (!this.updatedCategoryForm.valid) return;
    this.productCategoryService
      .updateCategory(this.createUpdatedCategoryData(this.updatedCategoryForm))
      .subscribe(() => {
        this.router.navigate(['/dashboard/product-categories']);
      });
  }

  createUpdatedCategoryData(form: any): UpdatedCategory {
    return {
      _id: this.category._id,
      name: form.get('name').value,
    };
  }
}
