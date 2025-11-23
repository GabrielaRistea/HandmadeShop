import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Category } from '../../DTOs/Category';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-category',
  imports: [MatButtonModule, RouterLink, MatTableModule],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class CategoryComponent {
  categoriesService = inject(CategoriesService);

  constructor(private categoryService: CategoriesService) 
  {}

  categories?: Category[];
  columnsToDisplay = ['name', 'actions'];

  ngOnInit() {
    this.categoryService.get().subscribe(categories => {
       console.log(categories);
      this.categories = categories;
      
    });
  }
}
