import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCategoryService } from 'src/app/product-list-page/product-category-list/product-category.service';

@Component({
  selector: 'app-new-product-category',
  templateUrl: './new-product-category.component.html',
  styleUrls: ['./new-product-category.component.scss'],
})
export class NewProductCategoryComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productCategoryService: ProductCategoryService
  ) {}

  newCategoryForm = this.fb.group({
    name: ['', Validators.required],
  });

  get name() {
    return this.newCategoryForm.controls.name;
  }

  onSubmit(): void {
    if (!this.newCategoryForm.valid) return;
    const catName = this.newCategoryForm.value.name;
    if (catName) {
      this.productCategoryService.createCategory(catName).subscribe((res) => {
        console.log(res);
        if (res.ok) this.newCategoryForm.reset();
      });
    }
  }

  onNavigateBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
