import { Component, OnInit, inject } from '@angular/core';
import { MercadoPagoService } from '../../../services/mercado-pago.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../interfaces/users.interface';
import { Router } from '@angular/router';  // Asegúrate de inyectar el Router

declare var MercadoPago: any;

@Component({
  selector: 'app-payment',
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  constructor(
    private mercadoPagoService: MercadoPagoService,
    private usuarioservice: UsuarioService,
    private router: Router  // Inyección del router
  ) {}

  actual!: Usuario;
  ngOnInit() {
    this.mercadoPagoService.crearPreferencia().subscribe(
      (response) => {
        const preferenceId = response.id;

        const mp = new MercadoPago('TEST-422997de-286a-4e28-b1b1-3a92eb9f1ffa');
        mp.bricks().create('wallet', 'wallet_container', {
          initialization: {
            preferenceId: preferenceId,
          },
          customization: {
            texts: {
              valueProp: 'smart_option',
            },
          },
          callbacks: {
            onSuccess: () => {
              // Aquí actualizamos el rol a 'premium'
              this.usuarioservice.updateUser(this.actual.id, { ...this.actual, role: 'premium' })
                .subscribe({
                  next: () => {
                    alert('Suscrito a premium correctamente');
                    // Redirigimos a la página premium solo después de actualizar el rol
                    this.router.navigate(['/user/premium']);
                  },
                  error: (error) => {
                    console.error('Error al suscribirse como premium: ', error);
                  }
                });
            },
            onError: (error:Error) => {
              console.error("Error en el pago:", error);
              alert("Hubo un problema con el pago. Intenta de nuevo.");
            },
            onPending: () => {
              alert("El pago está pendiente. Serás notificado una vez aprobado.");
            }
          }
        });
      },
      (error) => {
        console.error('Error al crear la preferencia:', error);
      }
    );
  }


}
