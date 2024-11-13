import { Component, OnInit ,inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-pago-exitoso',
  standalone:true,
  templateUrl: './pago-exitoso.component.html',
  styleUrls: ['./pago-exitoso.component.css']
})
export class PagoExitosoComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}
  private snackBar = inject(MatSnackBar);
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const paymentId = params['payment_id'];
      if (paymentId) {
        this.usuarioService.getUsuarioActual().subscribe((data) => {
          const usuario = { ...data, role: 'premium' };

          this.usuarioService.updateUser(usuario.id, { ...usuario, role: 'premium' }).subscribe({
            next: () => {
              this.snackBar.open('Te has suscrito al plan Premium!', 'Cerrar', {
                duration: 3000,
                panelClass: 'custom-snackbar',
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
              this.router.navigate(['/user/premium']);
            },
            error: (error) => {
              console.error('Error al actualizar el rol del usuario:', error);
            }
          });
        });
      }
    });
  }
}
