import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../../../DTOs/Category';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { Artist, ArtistDto } from '../../../DTOs/ArtistDto';
import { MatSelectModule } from '@angular/material/select';
import { CategoriesService } from '../../../services/categories.service';
import { ArtistsService } from '../../../services/artists.service';

// interface Category {
//   id: number;
//   categoryName: string;
// }

// interface Artist {
//   id: number;
//   artistName: string;
// }

@Component({
  selector: 'app-product-create',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule,
    MatSelectModule, MatInputModule, FormsModule
  ],
  templateUrl: './product-create.html',
  styleUrls: ['./product-create.scss'],
})
export class ProductCreate implements OnInit {

  private readonly formBuilder = inject(FormBuilder);
  productService = inject(ProductsService);
  categoryService = inject(CategoriesService);
  artistService = inject(ArtistsService);
  router = inject(Router);
  selectedFile: File | null = null;

  categories: Category[] = [];
  artists: ArtistDto[] = [];

  form = this.formBuilder.group({
    Name: ['', Validators.required],
    Description: ['', Validators.required],
    Price: ['', Validators.required],
    Stock: ['', Validators.required],
    CategoryName: ['', Validators.required],
    ArtistName: [[], Validators.required],
  })

  ngOnInit(): void {
    this.categoryService.get().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Failed to load categories', err)
    });

    this.artistService.get().subscribe({
      next: (data) => this.artists = data,
      error: (err) => console.error('Failed to load artists', err),
    });
  }

  saveChanges() {
    const formData = new FormData();
    formData.append('Name', this.form.value.Name || '');
    formData.append('Description', this.form.value.Description || '');
    formData.append('Price', this.form.value.Price?.toString() || '');
    formData.append('Stock', this.form.value.Stock?.toString() || '');
    formData.append('Category', this.form.value.CategoryName || '');
     (this.form.value.ArtistName ?? []).forEach((artistID: number) => {
      formData.append('Artists', artistID.toString());

     });
    console.log(this.form.value, formData)


    if (this.selectedFile) {
      formData.append('ImageFile', this.selectedFile, this.selectedFile.name);
    }

    this.productService.postFormData(formData).subscribe({

      next: () => this.router.navigate(['/product']),
      error: err => console.error(err),

    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

}
