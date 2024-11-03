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


  ngOnInit() {
   this.usuario =this.userService.getUsuarioActual();
   if (!this.usuario)
   {
    this.router.navigate(['/log']);
   }
  }

  editarPerfil() {
    if (this.usuario) {
      this.router.navigate(['profile/modify-user', this.usuario.id]);
    }
  }

}
