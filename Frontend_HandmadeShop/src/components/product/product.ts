import { Component, inject } from '@angular/core';
import { ArtistsService } from '../../services/artists.service';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardActions, MatCardContent, MatCardTitle, MatCard, MatCardHeader } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { AuthService } from '../../services/auth.service';
import { WishlistService } from '../../services/wishlist.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product',
  imports: [MatButtonModule, MatTableModule,
      MatCardContent, MatCard, CommonModule, RouterLink, MatCardActions, MatIconModule],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class ProductComponent {
  ProductsService = inject(ProductsService);
  products: any[] = [];
  private route = inject(ActivatedRoute);
  public authService = inject(AuthService);
  private wishlistService = inject(WishlistService);
  
  constructor( private productService: ProductsService, 
    private searchService: SearchService) 
  {
    //this.loadProducts();
  }

  addToWishlist(productId: number) {
    this.wishlistService.add(productId).subscribe({
      next: (response) => {
        alert(response.message); 
      },
      error: (err) => {
        alert(err.error.message || 'A apărut o eroare.');
      }
    });
  }

  ngOnInit() {

    this.categoryFilter();
    this.searchProduct();
    this.artistFilter();
    

  }

  private categoryFilter() {
    this.route.params.subscribe(params => {
      const catId = params['id'];
      if (catId) {
        this.productService.getByCategoryId(catId).subscribe(products => {
          this.products = products.map(a => ({
                ...a,
                CategoryName: a.CategoryName, 
                ArtistName: a.ArtistName ? a.ArtistName.join(', ') : "Unknown",
                imageSrc: a.productImage ? 'data:image/png;base64,' + a.productImage : null
            }));
        });
      } else {
        this.loadProducts();
      }
    });
  }

  private artistFilter() {
    this.route.params.subscribe(params => {
      const artistId = params['id'];
      if (artistId) {
        this.productService.getByArtistId(artistId).subscribe(products => {
          this.products = products.map(a => ({
                ...a,
                CategoryName: a.CategoryName, 
                ArtistName: a.ArtistName ? a.ArtistName.join(', ') : "Unknown",
                imageSrc: a.productImage ? 'data:image/png;base64,' + a.productImage : null
            }));
        });
      } else {
        this.loadProducts();
      }
    });
  }

  private searchProduct() {
    this.searchService.searchObservable.subscribe(text => {
      if (text && text.trim().length > 0) {
        this.searchService.searchProductsApi(text).subscribe(products => {
          this.products = products.map(a => ({
                ...a,
                CategoryName: a.CategoryName, 
                ArtistName: a.ArtistName ? a.ArtistName.join(', ') : "Unknown",
                imageSrc: a.productImage ? 'data:image/png;base64,' + a.productImage : null
            }));
        });
      } 
      
    });
  }

  loadProducts(){
    this.productService.get().subscribe(products => {
      this.products = products.map(a => ({
        ...a,
        // imageSrc 'data:image/png;base64,' + artist.artistImage;

        imageSrc: a.productImage ? 'data:image/png;base64,' + a.productImage : null
      }));
    });
  }

  delete(productId: number){
    this.productService.delete(productId).subscribe(() => {
      this.loadProducts();
    });
  }

}
