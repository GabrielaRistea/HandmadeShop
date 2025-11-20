import { Routes } from '@angular/router';
import { ArtistComponent } from '../components/artist/artist';
import { HomeComponent } from '../components/home/home.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'artist', component: ArtistComponent}
];
