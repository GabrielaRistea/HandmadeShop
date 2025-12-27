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
  selector: 'app-login',
  imports: [CommonModule, 
  FormsModule, 
  RouterLink, 
  MatCardModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginModel = { email: '', password: '' };
  errorMessage = '';

  onLogin() {
    this.authService.login(this.loginModel).subscribe({
      next: () => {
        this.router.navigate(['']); 
      },
      error: (err) => {
        this.errorMessage = 'Email sau parola incorecte.';
      }
    });
  }

}
