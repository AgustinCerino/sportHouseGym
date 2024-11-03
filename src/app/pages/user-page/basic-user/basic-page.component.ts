
import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-basic-page',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.css'] // Cambié 'styleUrl' a 'styleUrls'
})
export class BasicPageComponent {
  // Puedes agregar lógica aquí si es necesario
}
