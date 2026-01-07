import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrdersService } from '../../../services/orders.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-success',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './order-success.html',
  styleUrl: './order-success.scss',
})
export class OrderSuccessComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private ordersService = inject(OrdersService);
  public message = "Se proceseaza confirmarea platii...";

  ngOnInit() {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');
    
    if (sessionId) {
      this.ordersService.confirmPayment(sessionId).subscribe({
        next: () => this.message = "Plata a fost confirmata cu succes!",
        error: () => this.message = "Eroare la confirmarea platii."
      });
    } else {
      this.message = "Comanda a fost plasata cu succes (Plata Ramburs).";
    }
  }
}
