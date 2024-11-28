import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Rutina } from '../../../interfaces/routine.interface';
import { RoutineService } from '../../../services/rutine.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-routine-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routine-list.component.html',
  styleUrls: ['./routine-list.component.css']
})
export class RoutineListComponent implements OnInit, OnDestroy {
  routines: Rutina[] = [];
  premiumRoutines: Rutina[] = [];
  private rutserv = inject(RoutineService);
  private usuarioService = inject(UsuarioService);
  private rolSubscription!: Subscription;
  rol!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkUserRole();
  }

  checkUserRole(): void {
    this.rolSubscription = this.usuarioService.getUsuarioActual().subscribe(data => {
      this.rol = data.role;
      this.getRutinas();
    });
  }

  getRutinas(): void {
    this.rutserv.getRutinas().subscribe((data: Rutina[]) => {
      this.routines = data;
      if (this.rol === 'premium') {
        this.premiumRoutines = this.getPremiumRoutines(data);
      }
    });
  }

  getPremiumRoutines(routines: Rutina[]): Rutina[] {

    return routines.filter(routine => routine.tipo === 'premium');
  }

  verDetalles(id: string): void {
    this.router.navigate(['routines/details', id]);
  }

  ngOnDestroy(): void {

    if (this.rolSubscription) {
      this.rolSubscription.unsubscribe();
    }
  }
}
