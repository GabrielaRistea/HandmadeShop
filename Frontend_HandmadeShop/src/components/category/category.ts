import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Category } from '../../DTOs/Category';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-category',
  imports: [MatButtonModule, RouterLink, MatTableModule],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class CategoryComponent {
  categoriesService = inject(CategoriesService);
  public authService = inject(AuthService);

  constructor(private categoryService: CategoriesService) 
  {}

  categories?: Category[];
  //columnsToDisplay = ['name', 'actions'];
  columnsToDisplay = computed(() => {
    if (this.authService.isAdmin()) {
      return ['name', 'actions']; 
    }
    return ['name']; 
  });

  ngOnInit() {
    this.categoryService.get().subscribe(categories => {
       console.log(categories);
      this.categories = categories;
      
    });
  }

  loadProducts(){
    this.categoriesService.get().subscribe(categories => {
      this.categories = categories.map(a => ({
        ...a,
      }));
    });
  }

  delete(categoryId: number){
    this.categoriesService.delete(categoryId).subscribe(() => {
      this.loadProducts();
    });
  }

}
