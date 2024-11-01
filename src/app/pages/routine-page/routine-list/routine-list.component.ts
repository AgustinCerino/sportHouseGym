import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Rutina } from '../../../interfaces/routine.interface';
import { RoutineService } from '../../../services/rutine.service'; // Solo para la interfaz

@Component({
  selector: 'app-routine-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routine-list.component.html',
  styleUrls: ['./routine-list.component.css']
})
export class RoutineListComponent implements OnInit {
  routines: Rutina[] = [];
  private rutserv = inject(RoutineService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getRutinas();
  }

  getRutinas(): void {
    this.rutserv.getRutinas().subscribe((data: Rutina[]) => {
      this.routines = data;
    });
  }

  verDetalles(id: string): void {
    this.router.navigate(['routines/details', id]);
  }
}



