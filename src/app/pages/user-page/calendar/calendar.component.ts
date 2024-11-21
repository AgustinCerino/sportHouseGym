import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {
  currentDate: Date = new Date();
  monthName: string = '';
  year: number = 0;
  calendarGrid: (number | null)[][] = [];
  activities: { [key: string]: string } = {};
  loading: boolean = false;
  error: string | null = null;
  private subscriptions: Subscription[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.loading = true;
    this.loadCalendarData();

    this.subscriptions.push(
      this.usuarioService.actividades$.subscribe(
        actividades => {
          this.activities = actividades;
          this.renderCalendar(this.currentDate);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadCalendarData(): void {
    this.usuarioService.getUsuarioActual().subscribe({
      next: () => {
        const año = this.currentDate.getFullYear();
        const mes = this.currentDate.getMonth() + 1;
        this.activities = this.usuarioService.getActividadesMes(año, mes);
        this.renderCalendar(this.currentDate);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar datos:', error);
        this.error = 'Error al cargar el calendario';
        this.loading = false;
      }
    });
  }

  renderCalendar(date: Date): void {
    const year = date.getFullYear();
    const month = date.getMonth();

    this.year = year;
    this.monthName = date.toLocaleString('es-ES', { month: 'long' });

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    this.calendarGrid = [];
    let week: (number | null)[] = Array(startDay).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
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

  updateSelectedActivity(day: number): void {
    const key = this.getActivityKey(day);

    if (this.activities[key] === '') {
      delete this.activities[key];
    }

    this.usuarioService.getUsuarioActual().subscribe({
      next: (usuario) => {
        this.usuarioService.updateActividadesUsuario(usuario.id, this.activities)
          .subscribe({
            next: () => console.log('Actividad actualizada'),
            error: (error) => {
              console.error('Error al actualizar:', error);
              this.error = 'Error al actualizar actividad';
            }
          });
      },
      error: (error) => {
        console.error('Error:', error);
        this.error = 'Error al obtener usuario';
      }
    });
  }

  getActivityKey(day: number | Date): string {
    const dateToUse = day instanceof Date ? day : new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    const year = dateToUse.getFullYear();
    const month = dateToUse.getMonth() + 1;
    const dayOfMonth = day instanceof Date ? day.getDate() : day;
    return `${year}-${month.toString().padStart(2, '0')}-${dayOfMonth.toString().padStart(2, '0')}`;
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
    if (day !== null) {
      const clickedDate = new Date(
        this.currentDate.getFullYear(), 
        this.currentDate.getMonth(), 
        day
      );
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      // Use getTime() to compare dates numerically
      if (clickedDate.getTime() >= today.getTime()) {
        const key = this.getActivityKey(day);
        if (!this.activities[key]) {
          this.activities[key] = '';
        }
      }
    }
  }

  isDateBeforeToday(day: number): boolean {
    const today = new Date();
    const comparisonDate = new Date(
      this.currentDate.getFullYear(), 
      this.currentDate.getMonth(), 
      day
    );
    
    today.setHours(0, 0, 0, 0);
    comparisonDate.setHours(0, 0, 0, 0);
    
    return comparisonDate.getTime() < today.getTime();
  }
} 
