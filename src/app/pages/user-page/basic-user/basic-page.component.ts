
import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { RoutineListComponent } from '../../routine-page/routine-list/routine-list.component';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basic-page',
  standalone: true,
  imports: [CalendarComponent, RoutineListComponent, CommonModule],
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.css']
})
export class BasicPageComponent implements OnInit {
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

  ngOnInit(): void {
    this.usuarioService.getUsuarioActual().subscribe({
      next: (usuario) => {
        this.nombreUsuario = usuario ? usuario.nombre : 'Usuario';
      },
      error: (err) => {
        console.error('Error al obtener el usuario:', err);
        this.nombreUsuario = 'Usuario'; // Valor por defecto si ocurre un error
      }
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


