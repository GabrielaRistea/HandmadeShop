import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar {
  public authService = inject(AuthService);

  searchTerm: string = '';

  constructor(private searchService: SearchService, private router: Router) {}

  resetSearch() {
    
    this.searchService.updateSearchTerm(''); 
    this.router.navigate(['/product']);
    this.searchTerm = ''; 
    
  }

  
  onSearch() {
    //this.searchService.updateSearchTerm(this.searchTerm);

    this.router.navigate(['/product']).then(() => {
      console.log(this.searchTerm);
      this.searchService.updateSearchTerm(this.searchTerm);
    });
  }

  onLogout() {
    this.authService.logout(); 
  }

}
