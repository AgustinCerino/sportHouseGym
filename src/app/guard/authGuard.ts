import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  canActivate(route: any): boolean {
    const usuario = this.usuarioService.getUsuarioActual();

    if (usuario) {
      const expectedRole = route.data['role'];

      if (!expectedRole || usuario.role === expectedRole) {
        return true;
      } else {
        this.snackBar.open('Acceso denegado: rol insuficiente', 'Cerrar', {
          duration: 3000,
          panelClass: 'custom-snackbar',
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        this.router.navigate(['/home']);
        return false;
      }
    } else {
      this.snackBar.open('Acceso denegado: inicia sesión', 'Cerrar', {
        duration: 3000,
        panelClass: 'custom-snackbar',
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      this.router.navigate(['/home']);
      return false;
    }
  }
}
