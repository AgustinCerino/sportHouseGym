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
    nutricion: 'alta-proteina'
  };

  private userService = inject(UsuarioService);
  private router = inject(Router);

  ngOnInit() {
    const fetchedUsuario = this.userService.getUsuarioActual();
    if (fetchedUsuario) {
      this.usuario = fetchedUsuario; // Asigna solo si fetchedUsuario no es null
    } else {
      this.router.navigate(['/log']);
    }
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
