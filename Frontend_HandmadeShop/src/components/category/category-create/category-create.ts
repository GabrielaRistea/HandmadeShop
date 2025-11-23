import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Category, CategoryCreation } from '../../../DTOs/Category';
import { CategoriesService } from '../../../services/categories.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-create',
  imports: [ReactiveFormsModule, MatFormField, MatInput, MatButtonModule, RouterLink, MatLabel],
  templateUrl: './category-create.html',
  styleUrl: './category-create.scss',
})
export class CategoryCreate {
  private readonly formBuilder = inject(FormBuilder);
  categoryService = inject(CategoriesService);
  router = inject(Router);

  form = this.formBuilder.group ({
    Name: ['']
  });

  saveChanges (){
    const category = this.form.value as CategoryCreation;
    this.categoryService.create(category).subscribe(() => {
      this.router.navigate(['/category']);
    });
  }

}
