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
  private route = inject(ActivatedRoute);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(id).subscribe(data => {
        this.usuario = data;
      });
    }
  }

  onSubmit() {
    this.userService.updateUser(this.usuario.id.toString(), this.usuario).subscribe(
      response => {
        console.log('Usuario actualizado:', response);
        this.router.navigate(['/profile', this.usuario.id]); // Redirige a ver perfil después de la actualización
      },
      error => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }
}
