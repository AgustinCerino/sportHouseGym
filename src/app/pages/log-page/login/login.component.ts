import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
    // Redirección según el rol del usuario
    if (usuario.role === 'basic') {
      this.router.navigate(['/user/basic']);
    } else if (usuario.role === 'premium') {
      this.router.navigate(['/user/premium']);
    } else if (usuario.role === 'admin') {
      this.router.navigate(['/user/admin']);
    }
  }
}









/// COMENTO ESTO PARA PEGAR CODIGO lOGiN DE SANTI-------------------------------------------------------------
/*import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [ReactiveFormsModule]
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        // Inicializa el formulario reactivo
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            const formValues = this.loginForm.value;
            console.log('Form Values:', formValues);
        } else {
            console.error('Formulario inválido');
        }
    }
} */


///ESTO YA ESTABA ACA -------------------------------------------------------------------------
/*import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../interfaces/users.interface';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppModule } from '../app.module';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
 imports:[ReactiveFormsModule,CommonModule]
})



export class LoginComponent implements OnInit {
  errorMessage: string = '';
  loginForm!: FormGroup;


  constructor(private router: Router, private usuarioService: UsuarioService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Ahora inicializamos loginForm aquí en ngOnInit
    this.loginForm = this.formBuilder.group({
      username: ['email@yahoo.com'],
      password: ['']
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;  // Extraemos los valores del formulario

      this.usuarioService.getUsuarios().pipe(
        tap((usuarios: Usuario[]) => {
          const user = usuarios.find(u => u.username === username && u.password === password);

          if (user) {
            if (user.role === 'admin') {
              this.router.navigate(['/admin-dashboard']);
            } else if (user.role === 'basic') {
              this.router.navigate(['/basic-client']);
            } else if (user.role === 'premium') {
              this.router.navigate(['/premium-client']);
            }
          } else {
            this.errorMessage = 'Credenciales incorrectas';
          }
        })
      ).subscribe();
    } else {
      this.errorMessage = 'Por favor, complete todos los campos';
    }
  }


  onSubmit(): void {
    this.usuarioService.getUsuarios().pipe(
      tap((usuarios: Usuario[]) => {
        const user = usuarios.find(u => u.username === username && u.password === password);

        if (user) {
          if (user.role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (user.role === 'basic') {
            this.router.navigate(['/basic-client']);
          } else if (user.role === 'premium') {
            this.router.navigate(['/premium-client']);
          }
        } else {
          this.errorMessage = 'Credenciales incorrectas';
        }
      })
    ).subscribe();
  }
}
*/
