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


  ngOnInit(): void {
    this.userService.getUsuarioActual().subscribe({
      next: (usuario) => {
        if (!usuario) {
          this.router.navigate(['/log']); // Redirige si no hay usuario
        } else {
          this.usuario = usuario; // Asigna el usuario si es encontrado
        }
      },
      error: (err) => {
        console.error('Error al obtener el usuario:', err);
        this.router.navigate(['/log']); // Redirige en caso de error
      }
    });
  }


  editarPerfil() {
    if (this.usuario) {
      this.router.navigate(['profile/modify-user', this.usuario.id]);
    }
  }

}
