import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule], // Agrega FormsModule aquí
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date();
  monthName: string = '';
  year: number = 0;
  calendarGrid: (number | null)[][] = [];
  selectedDays: Set<number> = new Set();
  hoveredDay: number | null = null;
  selectedActivity: string = ''; // Para la actividad seleccionada
  activities: { [key: number]: string } = {}; // Almacenar actividades por día

  ngOnInit(): void {
    this.renderCalendar(this.currentDate);
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
    this.activities = {}; // Reiniciar actividades

    const startDay = firstDay.getDay();
    let week: (number | null)[] = Array(startDay).fill(null);

    for (let day = 1; day <= daysCount; day++) {
      week.push(day);
      this.activities[day] = ''; // Inicializar vacío
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

  prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar(this.currentDate);
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar(this.currentDate);
  }

  onDayClick(day: number): void {
    if (day) {
      if (this.selectedDays.has(day)) {
        this.selectedDays.delete(day);
        this.activities[day] = ''; // Limpiar actividad si se deselecciona
      } else {
        this.selectedDays.add(day);
        this.activities[day] = this.selectedActivity; // Asignar actividad seleccionada
      }
    }
  }

  updateSelectedActivity(): void {
    // Actualizar actividades para días seleccionados
    this.selectedDays.forEach(day => {
      this.activities[day] = this.selectedActivity;
    });
  }

  isSelected(day: number): boolean {
    return this.selectedDays.has(day);
  }
}
