import { Component, inject, OnInit } from '@angular/core';
import { ProductDto } from '../../DTOs/ProductDto';
import { WishlistService } from '../../services/wishlist.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export class WishlistComponent implements OnInit {
  private wishlistService = inject(WishlistService);
  products: any[] = [];

  ngOnInit() {
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlistService.get().subscribe({
      next: (data) => {
        this.products = data.map(p => ({
          ...p,
          imageSrc: p.productImage ? 'data:image/png;base64,' + p.productImage : 'assets/no-image.png'
        }));
      },
      error: (err) => console.error('Eroare la încărcare:', err)
    });
  }

  removeFromWishlist(productId: number) {
    this.wishlistService.remove(productId).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== productId);
      }
    });
  }

}
