import { Component, OnInit } from '@angular/core';
import { MercadoPagoService } from '../services/mercado-pago.service';

declare var MercadoPago: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  constructor(private mercadoPagoService: MercadoPagoService) {}

  ngOnInit() {

    this.mercadoPagoService.crearPreferencia().subscribe(
      (response) => {
        const preferenceId = response.id;


        const mp = new MercadoPago('TEST-422997de-286a-4e28-b1b1-3a92eb9f1ffa');


        mp.bricks().create("wallet", "wallet_container", {
          initialization: {
            preferenceId: preferenceId,
          },
          customization: {
            texts: {
              valueProp: 'smart_option',
            },
          },
        });
      },
      (error) => {
        console.error("Error al crear la preferencia:", error);
      }
    );
  }

}
