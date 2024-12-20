import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MercadoPagoService {
  private apiUrl = 'https://api.mercadopago.com/checkout/preferences';
  private accessToken = 'TEST-3085844630566140-111212-2f35b7544ee66d7f6e49f4c8c776a540-580689131';

  constructor(private http: HttpClient) {}

  crearPreferencia(): Observable<any> {
    const items = [
      {
        title: 'Plan Premium',
        quantity: 1,
        unit_price: 1,
        currency_id: 'ARS',
      }
    ];

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });

    const body = {
      items,
      back_urls: {
        success: 'http://localhost:4200/paymentControl/pago-exitoso', // Página de éxito
        failure: 'http://localhost:4200/pago-fallido', // Página de error
        pending: 'http://localhost:4200/pago-pendiente', // Página de pago pendiente
      },
      auto_return: 'approved', // Esto redirige automáticamente al success si el pago es aprobado
    };

    return this.http.post(this.apiUrl, body, { headers });
  }


}
