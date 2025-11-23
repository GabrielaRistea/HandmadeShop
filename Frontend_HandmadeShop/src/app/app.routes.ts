import { Routes } from '@angular/router';
import { ArtistComponent } from '../components/artist/artist';
import { HomeComponent } from '../components/home/home.component';
import { ArtistCreate } from '../components/artist/artist-create/artist-create';
import { ArtistEdit } from '../components/artist/artist-edit/artist-edit';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'artist', component: ArtistComponent},
    {path:'artist-create', component: ArtistCreate},
    {path:'artist-edit/:id', component: ArtistEdit}
];
