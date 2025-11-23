import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, CategoryCreation } from '../../../DTOs/Category';
import { CategoriesService } from '../../../services/categories.service';
import { Router, RouterLink } from '@angular/router';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-category-edit',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, RouterLink,
    MatCard, MatCardContent, CommonModule,
    MatInput],
  templateUrl: './category-edit.html',
  styleUrl: './category-edit.scss',
})
export class CategoryEdit implements OnInit{

  @Input({transform: numberAttribute})
  id!: number;

  

  categoriesService = inject(CategoriesService);
  router = inject(Router);

  private readonly formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
      Name: ['', Validators.required]
    })
  Category?: Category;
  ngOnInit(): void {
    this.categoriesService.getById(this.id).subscribe( Category => {
      console.log('Category from service:', Category);
      this.Category = Category;
      this.form.patchValue({
        Name: Category.name
      });
    });
   
  }

  saveChanges (){
    if (!this.Category) return;
    const category: Category = {
       ...this.Category, 
      Name: this.form.value.Name!            
    };
    this.categoriesService.update(this.id.toString(), category).subscribe(() => {
        this.router.navigate(['/category']);
      });
     
  }
}
