import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { RoutineListComponent } from '../../routine-page/routine-list/routine-list.component';
import { UsuarioService } from '../../../services/usuario.service';


@Component({
  selector: 'app-premium-page',
  standalone: true,
  imports: [CalendarComponent, RoutineListComponent],
  templateUrl: './premium-page.component.html',
  styleUrl: './premium-page.component.css'
})
export class PremiumPageComponent {

  nombreUsuario: string | null = null;


  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarioActual().subscribe({
      next: (usuario) => {
        this.nombreUsuario = usuario ? usuario.nombre : 'Usuario'; // Asignar nombre del usuario
      },
      error: (err) => {
        console.error('Error al obtener el usuario:', err);
        this.nombreUsuario = 'Usuario'; // Valor por defecto si ocurre un error
      }
    });
  }


}
