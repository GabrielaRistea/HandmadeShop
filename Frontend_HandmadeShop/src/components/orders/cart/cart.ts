import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../../../services/orders.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, MatIcon],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartComponent implements OnInit {
  private ordersService = inject(OrdersService);
  private router = inject(Router);
  
  cart: any = null;

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.ordersService.getCart().subscribe(data => this.cart = data);
  }

  changeQuantity(productId: number, increase: boolean) {
    this.ordersService.updateQuantity(productId, increase).subscribe(() => this.loadCart());
  }

  clear() {
    this.ordersService.clearCart().subscribe(() => this.loadCart());
  }

  goToCheckOut() {
    this.router.navigate(['/checkout']);
  }
}
