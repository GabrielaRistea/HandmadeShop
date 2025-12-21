import { Component, inject } from '@angular/core';
import { ArtistsService } from '../../services/artists.service';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardActions, MatCardContent, MatCardTitle, MatCard, MatCardHeader } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-product',
  imports: [MatButtonModule, MatTableModule,
      MatCardContent, MatCard, CommonModule, RouterLink, MatCardActions],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class ProductComponent {
  ProductsService = inject(ProductsService);
  products: any[] = [];
  
  constructor( private productService: ProductsService, 
    private searchService: SearchService) 
  {
    this.loadProducts();
  }

  // ngOnInit() {
  //   this.productService.get().subscribe(products => {
  //     this.products = products.map(a => ({
  //       ...a,
  //       // imageSrc 'data:image/png;base64,' + artist.artistImage;
  //       CategoryName: a.CategoryName, 
  //       ArtistName: a.ArtistName ? a.ArtistName.join(', ') : "Unknown",
  //       imageSrc: a.productImage ? 'data:image/png;base64,' + a.productImage : null
  //     }));
  //   });
  // }

  ngOnInit() {
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
      else {
        //this.loadProducts();
        this.productService.get().subscribe(products => {
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
