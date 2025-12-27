import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  imports: [CommonModule, 
  FormsModule,
  RouterLink, 
  MatCardModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatButtonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  registerModel = { email: '', password: '' };
  successMessage = '';
  errorMessages: string[] = [];

  onRegister() {
    this.successMessage = '';
    this.errorMessages = [];
    this.authService.register(this.registerModel).subscribe({
      next: () => {
        this.successMessage = 'Cont creat!';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        if (err.error && err.error.errors) {
          this.errorMessages = err.error.errors; 
        } else {
          this.errorMessages = ['A aparut o eroare. Incearca din nou.'];
        }
      }
    });
  }

}
