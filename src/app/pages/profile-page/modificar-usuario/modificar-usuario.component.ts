import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../interfaces/users.interface';

@Component({
  selector: 'app-modificar-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {
  usuario: Usuario = {
    id: 0,
    username: '',
    password: '',
    role: 'basic',
    nombre: '',
    email: '',
    peso: 0,
    altura: 0,
    proceso: {
      volumen: false,
      perdida: false,
      mantenimiento: false
    },
    nutricion: 'alta-proteina',
    actividades: {}
  };

  private userService = inject(UsuarioService);
  private router = inject(Router);

  ngOnInit(): void {
    this.userService.getUsuarioActual().subscribe({
      next: (fetchedUsuario) => {
        if (fetchedUsuario) {
          this.usuario = fetchedUsuario; // Asigna el usuario si se recibe correctamente
        } else {
          this.router.navigate(['/log']); // Redirige si no se encuentra el usuario
        }
      },
      error: (err) => {
        console.error('Error al obtener el usuario:', err);
        this.router.navigate(['/log']); // Redirige en caso de error
      }
    });
  }



  onSubmit() {
   if (this.usuario)
   {
    this.userService.updateUser(this.usuario.id,this.usuario).subscribe(
      response =>{
        console.log('Usuario actualizado',response);

        localStorage.setItem('usuarioActual',JSON.stringify(this.usuario));

        this.router.navigate(['/profile']);
      },
      error=>
      {
        console.error('Error al acrualizar');
      }
    )
   }
  }
}
