import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-admin-orders',
  imports: [CommonModule, MatIcon],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.scss',
})
export class AdminOrdersComponent implements OnInit {
  private ordersService = inject(OrdersService);
  orders: any[] = [];

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.ordersService.getAllOrdersAdmin().subscribe(data => this.orders = data);
  }

  updateStatus(id: number, event: any) {
    const status = event.target.value;
    this.ordersService.updateOrderStatus(id, status).subscribe(() => {
      alert("Status actualizat!");
      this.loadOrders();
    });
  }
}
