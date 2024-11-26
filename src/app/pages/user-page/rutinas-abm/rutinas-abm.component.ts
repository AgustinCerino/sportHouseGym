import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rutina } from '../../../interfaces/routine.interface';
import { RoutineService } from '../../../services/rutine.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rutinas-abm',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './rutinas-abm.component.html',
  styleUrls: ['./rutinas-abm.component.css']
})
export class RutinasAbmComponent implements OnInit {

  rutinas: Rutina[] = [];
  rutinasFiltradas: Rutina[] = [];
  filtroRutina: string = '';
  detallesRutinaVisible: number | null = null;
  editModeRutina: boolean = false;
  editFormRutina: FormGroup;
  createFormRutina: FormGroup;
  createModeRutina: boolean = false;
  rutinaSeleccionada: Rutina | null = null;

  constructor(
    private rutinaService: RoutineService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.editFormRutina = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      url: ['']
    });

    this.createFormRutina = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      url: ['https://www.youtube.com/embed/']
    });
  }

  ngOnInit(): void {
    this.cargarRutinas();
  }

  crearRutina(): void {
    Object.keys(this.createFormRutina.controls).forEach(key => {
      const control = this.createFormRutina.get(key);
      control?.markAsTouched();
    });

    if (this.createFormRutina.valid) {
      const nuevaRutina: Rutina = this.createFormRutina.value;
      this.rutinaService.createRutina(nuevaRutina).subscribe(
        (rutina) => {
          this.rutinas.push(rutina);
          this.filtrarRutinas();
          this.createModeRutina = false;
          this.createFormRutina.reset();
          this.mostrarSnackBar('Rutina creada con éxito', 'Cerrar');
        },
        (error) => {
          console.error('Error al crear la rutina', error);
          this.mostrarSnackBar('Hubo un error al crear la rutina', 'Cerrar');
        }
      );
    } else {
      console.log('El formulario contiene errores. Por favor, corrígelos.');
      return;
    }
  }

  buttonCrearRutina(): void {
    this.createModeRutina = true;
  }

  cancelarCreacionRutina(): void {
    this.createFormRutina.reset();
    this.createModeRutina = false;
  }

  cargarRutinas(): void {
    this.rutinaService.getRutinas().subscribe(
      (rutinas: Rutina[]) => {
        this.rutinas = rutinas;
        this.rutinasFiltradas = rutinas;
      }
    );
  }

  filtrarRutinas(): void {
    this.rutinasFiltradas = this.rutinas.filter(rutina =>
      rutina.nombre.toLowerCase().includes(this.filtroRutina.toLowerCase())
    );
  }

  toggleDetallesRutina(index: number): void {
    this.detallesRutinaVisible = this.detallesRutinaVisible === index ? null : index;
  }

  modificarRutina(rutina: Rutina): void {
    this.editModeRutina = true;
    this.rutinaSeleccionada = rutina;
    this.editFormRutina.patchValue({
      nombre: rutina.nombre,
      descripcion: rutina.descripcion,
      url: rutina.url
    });
  }

  eliminarRutina(rutina: Rutina): void {
    const snackBarRef = this.snackBar.open(
      `¿Estás seguro de que quieres eliminar ${rutina.nombre}?`,
      'Eliminar',
      { duration: 5000,
        verticalPosition:'top',
        horizontalPosition:'center'
       }
    );

    snackBarRef.onAction().subscribe(() => {

      this.rutinaService.deleteRutina(rutina.id).subscribe(
        () => {
          this.rutinas = this.rutinas.filter(r => r.id !== rutina.id);
          this.rutinasFiltradas = this.rutinasFiltradas.filter(r => r.id !== rutina.id);
          this.mostrarSnackBar('Rutina eliminada con éxito', 'Cerrar');
        },
        (error) => {
          console.error("Error al eliminar la rutina:", error);
          this.mostrarSnackBar('Hubo un error al eliminar la rutina', 'Cerrar');
        }
      );
    });
  }

  actualizarRutina(): void {
    Object.keys(this.editFormRutina.controls).forEach(key => {
      const control = this.editFormRutina.get(key);
      control?.markAsTouched();
    });

    if (this.rutinaSeleccionada && this.editFormRutina.valid) {
      const updatedData = { ...this.rutinaSeleccionada, ...this.editFormRutina.value };
      this.rutinaService.updateRutina(this.rutinaSeleccionada.id, updatedData).subscribe(
        (updatedRutina) => {
          const index = this.rutinas.findIndex(r => r.id === updatedRutina.id);
          if (index !== -1) {
            this.rutinas[index] = updatedRutina;
            this.rutinasFiltradas[index] = updatedRutina;
          }
          this.editModeRutina = false;
          this.rutinaSeleccionada = null;
          this.editFormRutina.reset();
          this.mostrarSnackBar('Rutina actualizada con éxito', 'Cerrar');
        },
        (error) => {
          console.error('Error al actualizar rutina', error);
          this.mostrarSnackBar('Hubo un error al actualizar la rutina', 'Cerrar');
        }
      );
    } else {
      console.log('El formulario contiene errores. Por favor, corrígelos.');
      return;
    }
  }

  cancelarEdicionRutina(): void {
    this.editModeRutina = false;
    this.rutinaSeleccionada = null;
  }

  mostrarSnackBar(mensaje: string, accion: string): void {
    this.snackBar.open(mensaje, accion, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
