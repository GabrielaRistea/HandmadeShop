import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ArtistDto } from '../../../DTOs/ArtistDto';
import { Category } from '../../../DTOs/Category';
import { ArtistsService } from '../../../services/artists.service';
import { CategoriesService } from '../../../services/categories.service';
import { ProductDto } from '../../../DTOs/ProductDto';
import { MatFormField, MatLabel, MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-edit',
  imports: [ReactiveFormsModule, MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  CommonModule, RouterLink],
  templateUrl: './product-edit.html',
  styleUrls: ['./product-edit.scss'],
})
export class ProductEdit implements OnInit {
  @Input({transform: numberAttribute})
  id!: number;

  ProductsService = inject(ProductsService);
  products?: ProductDto;

  private readonly formBuilder = inject(FormBuilder);
  categoryService = inject(CategoriesService);
  artistService = inject(ArtistsService);
  router = inject(Router);
  selectedFile: File | null = null;

  categories: Category[] = [];
  artists: ArtistDto[] = [];
  
  constructor( private productService: ProductsService) 
  {}
  

  form = this.formBuilder.group({
    Name: ['', Validators.required],
    Description: ['', Validators.required],
    Price: ['', Validators.required],
    Stock: ['', Validators.required],
    CategoryName: ['', Validators.required],
    ArtistName: [[], Validators.required],
  })

  ngOnInit(): void {
    this.categoryService.get().subscribe(c => this.categories = c);
    this.artistService.get().subscribe(a => this.artists = a);

    this.productService.getById(this.id).subscribe(products => {
      this.products = products;
      this.form.patchValue({
        Name: products.name,
        Description: products.description,
        Price: products.price,
        Stock: products.stock,
        CategoryName: products.category,    
        ArtistName: products.artists,   
      });
    });

  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  saveChanges() {
    const formData = new FormData();

    formData.append('Id', this.id.toString());
    formData.append('Name', this.form.value.Name!);
    formData.append('Description', this.form.value.Description!);
    formData.append('Price', this.form.value.Price!.toString());
    formData.append('Stock', this.form.value.Stock!.toString());
    formData.append('Category', this.form.value.CategoryName!.toString());

    (this.form.value.ArtistName ?? []).forEach((artistID: number) =>
      formData.append('Artists', artistID.toString())
    );

    if (this.selectedFile) {
      formData.append('ImageFile', this.selectedFile, this.selectedFile.name);
    }

    this.productService.updateFormData(this.id, formData).subscribe( {
    
        next: () => this.router.navigate(['/product']),
      
    });
  }

}
