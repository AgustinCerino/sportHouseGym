
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true, // Marca el componente como standalone
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [ReactiveFormsModule] // Importa ReactiveFormsModule aquí
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        // Inicializa el formulario reactivo
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required], // Campo requerido
            password: ['', Validators.required]  // Campo requerido
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            const formValues = this.loginForm.value;
            console.log('Form Values:', formValues);
            // Aquí puedes manejar el envío del formulario
        } else {
            console.error('Formulario inválido');
        }
    }
}

 



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