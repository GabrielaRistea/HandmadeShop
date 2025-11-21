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

constructor(
  private artistService: ArtistsService
) {}

  ngOnInit() {
    this.artistService.get().subscribe(artists => {
      this.artists = artists.map(a => ({
        ...a,
        // imageSrc 'data:image/png;base64,' + artist.artistImage;

        imageSrc: a.artistImage ? 'data:image/png;base64,' + a.artistImage : null
      }));
    });
  }

}
