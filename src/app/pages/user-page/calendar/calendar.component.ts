import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../interfaces/users.interface';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date();
  monthName: string = '';
  year: number = 0;
  calendarGrid: (number | null)[][] = [];
  activities: { [key: string]: string } = {}; // Formato "yyyy-mm-dd"
  usuario: Usuario | null = null;
  srv = inject(UsuarioService);

  ngOnInit(): void {
    this.srv.getUsuarioActual().subscribe({
      next: (usuario) => {
        console.log('Usuario cargado:', usuario);
        this.usuario = usuario;
        if (this.usuario?.actividades) {
          this.activities = { ...this.usuario.actividades };
          console.log('Actividades cargadas:', this.activities);  // Verifica las actividades cargadas
        }
        this.renderCalendar(this.currentDate);
      },
      error: (error) => console.error('Error al obtener el usuario:', error),
    });
  }

  renderCalendar(date: Date): void {
    const year = date.getFullYear();
    const month = date.getMonth();

    this.year = year;
    this.monthName = date.toLocaleString('es-ES', { month: 'long' });

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysCount = lastDay.getDate();

    this.calendarGrid = [];
    const startDay = firstDay.getDay();
    let week: (number | null)[] = Array(startDay).fill(null);

    for (let day = 1; day <= daysCount; day++) {
      week.push(day);
      const key = this.getActivityKey(day);

      // Verificar si la actividad para esta fecha está asignada correctamente
      console.log(`Actividad para ${key}:`, this.activities[key]);

      if (this.activities[key]) {
        this.activities[key] = this.activities[key] || '';  // Si la actividad existe, asignarla o dejarla vacía
      }

      if (week.length === 7) {
        this.calendarGrid.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      week = week.concat(Array(7 - week.length).fill(null));
      this.calendarGrid.push(week);
    }
  }


  getActivityKey(day: number): string {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth() + 1; // Los meses en JavaScript comienzan desde 0
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`; // Aseguramos que el mes y el día tengan dos dígitos
  }


  prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar(this.currentDate);
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar(this.currentDate);
  }

  onDayClick(day: number): void {
    if (day !== null) {  // Asegúrate de que day no sea null
      const key = this.getActivityKey(day);
      if (!this.activities[key]) {
        this.activities[key] = '';
      }
    }
  }

  updateSelectedActivity(day: number): void {
    const key = this.getActivityKey(day);
    if (this.activities[key] === '') {
      delete this.activities[key]; // Remover día si el valor es vacío
    } else {
      this.updateUserActivities(); // Guardar cambios en el servidor
    }
  }

  updateUserActivities(): void {
    if (this.usuario) {
      const filteredActivities = Object.fromEntries(
        Object.entries(this.activities).filter(([_, value]) => value !== '')
      );

      console.log('Actividades a enviar al servidor:', filteredActivities); // Log para verificar los datos a enviar

      this.srv.updateActividadesUsuario(this.usuario.id, filteredActivities).subscribe({
        next: () => console.log('Actividades guardadas con éxito'),
        error: (error) => console.error('Error al guardar actividades:', error),
      });
    }
  }

}
