
import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { RoutineListComponent } from '../../routine-page/routine-list/routine-list.component';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-basic-page',
  standalone: true,
  imports: [CalendarComponent, RoutineListComponent],
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.css'] // Cambié 'styleUrl' a 'styleUrls'
})
export class BasicPageComponent implements OnInit {
  nombreUsuario: string | null = null;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    const usuario = this.usuarioService.getUsuarioActual();
    this.nombreUsuario = usuario ? usuario.nombre : 'Usuario'; 
  }
}

