import { Component, inject } from '@angular/core';
import { ArtistsService } from '../../services/artists.service';

@Component({
  selector: 'app-artist',
  imports: [],
  templateUrl: './artist.html',
  styleUrl: './artist.scss',
})
export class ArtistComponent {
  artists: any[] = [];

  ArtistsService = inject(ArtistsService);

  constructor(){
    this.ArtistsService.get().subscribe( artists => {
      console.log(artists)
      this.artists = artists;
    });
  }

}
