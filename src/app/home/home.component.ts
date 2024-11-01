import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RoutineListComponent } from '../pages/routine-page/routine-list/routine-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RoutineListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
