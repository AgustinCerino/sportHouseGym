import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../interfaces/users.interface';

@Component({
  selector: 'app-ver-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit {
  usuario: Usuario | null = null;

  private userService = inject(UsuarioService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtén el ID como string
    if (id) {
      this.userService.getUserById(id).subscribe( // Pasa el ID directamente
        data => {
          this.usuario = data;
        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    }
  }

  editarPerfil() {
    if (this.usuario) {
      this.router.navigate(['profile/modify-user', this.usuario.id]);
    }
  }

}
