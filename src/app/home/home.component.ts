import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RoutineListComponent } from '../pages/routine-page/routine-list/routine-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone:true,
  imports:[CommonModule, RoutineListComponent]
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    // Llamar a la función de animación al cargar la página para las secciones que ya están en la vista
    this.handleScrollAnimations();
  }

  // Detectar el scroll y activar la animación de las secciones
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.handleScrollAnimations();
  }

  // Verifica si el elemento está dentro de la vista
  isElementInView(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  }

  // Manejar las animaciones de las secciones
  handleScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section: any) => {
      if (this.isElementInView(section)) {
        section.classList.add('visible');
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
        section.classList.remove('visible');
      }
    });
  }
}