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
          this.Redireccion(usuario); // Redirige según el rol
        } else {
          console.log("Credenciales incorrectas");
        }
      },
      error: (error) => {
        console.error('Error en la autenticación:', error);
      }
    });
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







