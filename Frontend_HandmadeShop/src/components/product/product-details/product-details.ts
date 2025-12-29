import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewCreateDto, ReviewReadDto } from '../../../DTOs/ReviewDto';
import { ReviewsService } from '../../../services/reviews.service';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, 
    MatButtonModule,
    FormsModule,
  MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetailsComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private reviewsService = inject(ReviewsService);
  private productsService = inject(ProductsService);
  public authService = inject(AuthService);

  product: any;
  reviews: ReviewReadDto[] = [];
  productId!: number;

  newReview: ReviewCreateDto = {
    comm: '',
    rating: 5,
    productId: 0
  };

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.productsService.getById(this.productId).subscribe(data => {
      this.product = {
        ...data,
        imageSrc: data.productImage ? 'data:image/png;base64,' + data.productImage : null
      };
    });

    this.loadReviews();
  }

  loadReviews() {
    this.reviewsService.getByProductId(this.productId).subscribe(data => {
      this.reviews = data;
    });
  }

  submitReview() {
    this.newReview.productId = this.productId;
    console.log("Date trimise catre server:", this.newReview);

    if (!this.newReview.comm || this.newReview.comm.trim() === '') {
      alert("Te rugam sa scrii un comentariu.");
      return;
    }

    this.reviewsService.post(this.newReview).subscribe({
      next: (res) => {
        alert('Review adaugat cu succes!');
        this.reviews.unshift(res); 
        this.newReview.comm = ''; 
      },
      error: (err) => {
        console.error("Eroare la server:", err);
        alert('A apărut o eroare la salvarea review-ului.');
      }
    });
  }
}
