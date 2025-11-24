import { Routes } from '@angular/router';
import { ArtistComponent } from '../components/artist/artist';
import { HomeComponent } from '../components/home/home.component';
import { ArtistCreate } from '../components/artist/artist-create/artist-create';
import { ArtistEdit } from '../components/artist/artist-edit/artist-edit';
import { CategoryComponent } from '../components/category/category';
import { CategoryCreate } from '../components/category/category-create/category-create';
import { CategoryEdit } from '../components/category/category-edit/category-edit';
import { ProductComponent } from '../components/product/product';
import { ProductCreate } from '../components/product/product-create/product-create';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'artist', component: ArtistComponent},
    {path:'artist-create', component: ArtistCreate},
    {path:'artist-edit/:id', component: ArtistEdit},
    {path:'category', component: CategoryComponent},
    {path:'category-create', component: CategoryCreate},
    {path:'category-edit/:id', component: CategoryEdit},
    {path:'product', component: ProductComponent},
    {path:'product-create', component: ProductCreate},

];
