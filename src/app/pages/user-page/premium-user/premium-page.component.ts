import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { RoutineListComponent } from '../../routine-page/routine-list/routine-list.component';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-premium-page',
  standalone: true,
  imports: [CalendarComponent, RoutineListComponent, CommonModule],
  templateUrl: './premium-page.component.html',
  styleUrl: './premium-page.component.css',
})
export class PremiumPageComponent {
  nombreUsuario: string | null = null;
  images: string[] = [
    'icons/page1.jpg',
    'icons/page2.webp',
    'icons/page3.jpg',
    'icons/page4.jpg'
  ];

  currentImageIndex: number = 0;
  imageWidth: number = 600; // Establecer el ancho de las imágenes
  translateValue: number = 0; // Desplazamiento para las imágenes

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


  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.images.length - 1;
    }
    this.updateTranslateValue();
  }

  // Método para mostrar la imagen siguiente
  nextImage() {
    if (this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
    this.updateTranslateValue();
  }

  // Actualiza el desplazamiento de las imágenes
  updateTranslateValue() {
    this.translateValue = -this.currentImageIndex * this.imageWidth;
  }
}
