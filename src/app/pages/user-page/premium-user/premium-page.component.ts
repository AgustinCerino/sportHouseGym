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

    const usuario = this.usuarioService.getUsuarioActual();
    this.nombreUsuario = usuario ? usuario.nombre : 'Usuario'; 


  }

}
