import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../../interfaces/users.interface';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule]
})
export class LoginComponent {

  @Output()
  emitirUsuario = new EventEmitter<Usuario>();

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Inicializa el formulario reactivo
    this.loginForm = this.formBuilder.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  usuarioService = inject(UsuarioService);

  IniciarSesion() {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;
    this.usuarioService.authenticate(username, password).subscribe({
      next: (usuario) => {
        if (usuario) {
          console.log('Usuario autenticado:', usuario);
          this.verificarEstadoSubscripcion(usuario); 
        } else {
          console.log("Credenciales incorrectas");
        }
      },
      error: (error) => {
        console.error('Error en la autenticación:', error);
      }
    });
  }

  verificarEstadoSubscripcion(usuario: Usuario) {
    if (usuario.role !== 'premium' || !usuario.dateSubscripcion) {
      this.Redireccion(usuario);
      return;
    }

    const dateString = String(usuario.dateSubscripcion);
    let fechaSubscripcion: Date;
    
    try {
      fechaSubscripcion = new Date(dateString);
      const [year, month, day] = dateString.split('-').map(part => parseInt(part, 10));
      fechaSubscripcion = new Date(year, month - 1, day);

      const fechaActual = new Date();
      
      const diferenciaEnMilisegundos = fechaActual.getTime() - fechaSubscripcion.getTime();
      const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / (1000 * 3600 * 24));
  
      console.log('Días desde suscripción:', diferenciaEnDias);
  
      if (diferenciaEnDias > 30) {
        this.usuarioService.updateUser(usuario.id, { ...usuario, dateSubscripcion: undefined, role: 'basic' }).subscribe({
          next: (usuarioActualizado) => {
            alert(`Hola ${usuario.nombre} tu subscripción PREMIUM ha expirado.
                        Dias desde ultimo pago: ${diferenciaEnDias}
                      Has sido cambiado al plan Basic`)
            console.log(`Rol actualizado a básico para usuario ${usuario.id}`);
            this.Redireccion(usuarioActualizado);
          },
          error: (error) => {
            console.error('Error al actualizar el rol:', error);
            this.Redireccion(usuario);
          }
        });
      } else {
        this.Redireccion(usuario);
      }
    } catch (error) {
      console.error('Error procesando fecha de suscripción:', error);
      this.Redireccion(usuario);
    }
  }

  Redireccion(usuario: Usuario) {
    if (usuario.role === 'basic') {
      this.router.navigate(['/user/basic']);
    } else if (usuario.role === 'premium') {
      this.router.navigate(['/user/premium']);
    } else if (usuario.role === 'admin') {
      this.router.navigate(['/user/admin']);
    }
  }

  toRegister()
  {
    this.router.navigate(['log/register']);
  }
}







