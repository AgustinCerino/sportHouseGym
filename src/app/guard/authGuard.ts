import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable} from 'rxjs';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  canActivate(route: any): Observable<boolean> | Promise<boolean> | boolean {
    return this.usuarioService.getUsuarioActual().pipe(
      map(usuario => {
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
  }))
}

}
