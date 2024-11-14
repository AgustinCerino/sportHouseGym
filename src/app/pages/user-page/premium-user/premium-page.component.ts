import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { RoutineListComponent } from '../../routine-page/routine-list/routine-list.component';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-premium-page',
  standalone: true,
  imports: [CalendarComponent, RoutineListComponent],
  templateUrl: './premium-page.component.html',
  styleUrl: './premium-page.component.css',
})
export class PremiumPageComponent {
  nombreUsuario: string | null = null;

  constructor(private usuarioService: UsuarioService) {}

  private phoneNumber: string = '542235999999';
  public whatsappLink: string = '';
  public message: string = '';

  sendMessage(message: string): void {
    const whatsappLink = `https://web.whatsapp.com/send?phone=${
      this.phoneNumber
    }&text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  }

  ngOnInit(): void {
    this.usuarioService.getUsuarioActual().subscribe({
      next: (usuario) => {
        this.nombreUsuario = usuario ? usuario.nombre : 'Usuario';
      },
      error: (err) => {
        console.error('Error al obtener el usuario:', err);
        this.nombreUsuario = 'Usuario'; // Valor por defecto si ocurre un error
      },
    });
  }
}
