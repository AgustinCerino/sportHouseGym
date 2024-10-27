import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../interfaces/users.interface';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]  
    },
    {
      validator: this.passwordMatchValidator
    }
  );
  }

  onSubmit(): void {
    if (this.registerForm.hasError('errorConfirmPassword')) {
      alert('Las contraseñas no coinciden');
    }
    else if (this.registerForm.valid) {
      const formValues = this.registerForm.value;

      // Crea el objeto usuario incluyendo el rol "------ERROR EN LA CARGA DEL ID------"
      const usuario: Omit<Usuario, 'id'> = {
        username: formValues.username,
        password: formValues.password,
        role: formValues.role
      };

      console.log(usuario);
      // Llama a postUsuarios para agregar el usuario
      this.usuarioService.postUsuarios(usuario).subscribe({
        next: (response) => {
          console.log('Usuario agregado:', response);
          alert('Usuario registrado con éxito');
          
          // Redirección según el rol del usuario
          if (response.role === 'basic') {
            this.router.navigate(['/basic-client']);
          } else if (response.role === 'premium') {
            this.router.navigate(['/premium-client']);
          } else if (response.role === 'admin') {
            this.router.navigate(['/admin']);
          }
        },
        error: (error) => {
          console.error('Error al agregar el usuario:', error);
          alert('Hubo un error al registrar el usuario');
        }
      });
    } else {
      console.error('Formulario inválido');
    }
  }


  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { errorConfirmPassword: true };
  }


}





/*

import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule]
})


export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]

  });


}

onSubmit(): void {
  if (this.registerForm.valid) {
    const formValues = this.registerForm.value;
    // Crea el objeto usuario que se enviará al json-server
    const usuario: Usuario = {
      email: formValues.email,
      username: formValues.username,
      password: formValues.password,
    };

    // Llama a postUsuarios para agregar el usuario al json-server
    this.usuarioService.postUsuarios(usuario).subscribe({
      next: (response) => {
        console.log('Usuario agregado:', response);
        alert('Usuario registrado con éxito');
      },
      error: (error) => {
        console.error('Error al agregar el usuario:', error);
        alert('Hubo un error al registrar el usuario');
      }
    });
  } else {
    console.error('Formulario inválido');
  }
}


onSubmit(): void {
  if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      console.log('Form Values:', formValues);
      // Aquí puedes manejar el envío del formulario
  } else {
      console.error('Formulario inválido');
  }
}
*/

