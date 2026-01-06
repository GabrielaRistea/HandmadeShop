import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-myorders',
  imports: [DatePipe, CommonModule, MatIcon],
  templateUrl: './myorders.html',
  styleUrl: './myorders.scss',
})
export class MyOrdersComponent implements OnInit {
  private ordersService = inject(OrdersService);
  public orders: any[] = [];
  public isLoading = true;

  ngOnInit(): void {
    this.loadMyOrders();
  }

  loadMyOrders() {
    this.ordersService.getMyOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        console.error("Nu s-au putut incarca comenzile.");
      }
    });
  }
}
