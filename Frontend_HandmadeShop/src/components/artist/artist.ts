import { Component, inject } from '@angular/core';
import { ArtistsService } from '../../services/artists.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artist',
  imports: [MatButtonModule, RouterLink, MatTableModule, MatCardActions, 
    MatCardContent, MatCardTitle, MatCard, MatCardHeader, CommonModule],
  templateUrl: './artist.html',
  styleUrls: ['./artist.scss'],
})
export class ArtistComponent {
 
  ArtistsService = inject(ArtistsService);
  artists: any[] = [];
  

constructor(
  private artistService: ArtistsService
) {
  this.loadProducts();
}

  ngOnInit() {
    this.artistService.get().subscribe(artists => {
      this.artists = artists.map(a => ({
        ...a,
        // imageSrc 'data:image/png;base64,' + artist.artistImage;

        imageSrc: a.artistImage ? 'data:image/png;base64,' + a.artistImage : null
      }));
    });
  }

  loadProducts(){
    this.artistService.get().subscribe(artists => {
      this.artists = artists.map(a => ({
        ...a,
        // imageSrc 'data:image/png;base64,' + artist.artistImage;

        imageSrc: a.artistImage ? 'data:image/png;base64,' + a.artistImage : null
      }));
    });
  }

  delete(artistId: number){
    this.artistService.delete(artistId).subscribe(() => {
      this.loadProducts();
    });
  }

}
