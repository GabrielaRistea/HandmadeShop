import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../../services/orders.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule,
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  private ordersService = inject(OrdersService);

  checkoutForm = this.fb.group({
    shippingAddress: ['', [Validators.required, Validators.minLength(10)]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    paymentMethod: ['Ramburs', Validators.required]
  });

  submit() {
    if (this.checkoutForm.valid) {
      this.ordersService.checkout(this.checkoutForm.value).subscribe({next: (res: any) => {
        if (res.redirectToStripe) {
          window.location.href = res.stripeUrl;
        } else {
          window.location.href = '/order-success'; 
        }
      },
      error: (err) => {
        const errorMessage = err.error?.message || "A aparut o eroare neprevazuta.";
        alert(errorMessage);
      }
      });
    }
  }
}
