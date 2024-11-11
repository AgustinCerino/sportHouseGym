import { Component, OnInit } from '@angular/core';
import { Usuario} from '../../../interfaces/users.interface';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Rutina } from '../../../interfaces/routine.interface';
import { RoutineService } from '../../../services/rutine.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  usuarios: Usuario[] = []; // Array para almacenar los usuarios
  usuariosFiltrados: Usuario[] = []; // Array para almacenar los usuarios filtrados
  mostrarUsuarios: boolean = false; // Controla si mostrar o no los usuarios
  filtro: string = ''; // Variable para almacenar el texto de búsqueda
  detallesVisible: number | null = null; // Variable para controlar si mostrar o no los detalles de un usuario
  editMode: boolean = false;
  editForm: FormGroup;
  usuarioSeleccionado: Usuario | null = null; 

  rutinas: Rutina[] = []; // Array para almacenar las rutinas
  rutinasFiltradas: Rutina[] = []; // Array para almacenar las rutinas filtradas
  mostrarRutinas: boolean = false; // Controla si mostrar o no las rutinas
  filtroRutina: string = ''; // Variable para almacenar el texto de búsqueda
  detallesRutinaVisible: number | null = null; // Variable para mostrar detalles de una rutina
  editModeRutina: boolean = false;
  editFormRutina: FormGroup;
  rutinaSeleccionada: Rutina | null = null; 
  
  
  
  constructor(private userService: UsuarioService, private fbUser: FormBuilder, private rutinaService: RoutineService, private fbRutina: FormBuilder) {
    this.editForm = this.fbUser.group({
      email: [''],
      peso: [''],
      altura: [''],
      nutricion: ['']
    });

    this.editFormRutina = this.fbRutina.group({
      nombre: [''],
      descripcion: [''],
      url: ['']
    });

  }

  
  ngOnInit(): void {}

  //-----------------------USER AMB----------------------------------------------

  // Método para obtener los usuarios y mostrarlos
  obtenerUsuarios(): void {
    this.userService.getUsuarios().subscribe(
      (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.usuariosFiltrados = usuarios; // Inicializa con todos los usuarios
      this.mostrarUsuarios = true;
    });
  }
 
eliminarUsuario(usuario: Usuario): void {
    // Lógica para eliminar el usuario seleccionado
    console.log("Eliminando usuario:", usuario);
}

  // Método para filtrar usuarios según el texto de búsqueda
  filtrarUsuarios(): void {
    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.username.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

toggleDetalles(index: number): void{
  this.detallesVisible = this.detallesVisible === index ? null : index; 
}

modificarUsuario(usuario: Usuario): void {
  this.editMode = true; // Activa el modo de edición
  this.usuarioSeleccionado = usuario; // Almacena el usuario seleccionado
  // Rellena el formulario con los datos actuales del usuario
  this.editForm.patchValue({
    email: usuario.email,
    peso: usuario.peso,
    altura: usuario.altura,
    role: usuario.role
  });
}

actualizarUsuario(): void {
  // Verifica si hay un usuario seleccionado y si el formulario es válido
  if (this.usuarioSeleccionado && this.editForm.valid) {
    // Combina los datos del usuario seleccionado con los valores del formulario
    const updatedData = { ...this.usuarioSeleccionado, ...this.editForm.value };

    // Llama al servicio para actualizar el usuario
    this.userService.updateUser(this.usuarioSeleccionado.id, updatedData).subscribe(
      (updatedUser) => {
        // Actualiza la lista de usuarios localmente para reflejar los cambios
        const index = this.usuarios.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.usuarios[index] = updatedUser; // Actualiza el usuario en la lista original
          this.usuariosFiltrados[index] = updatedUser; // Actualiza el usuario en la lista filtrada
        }

        // Restablece el estado del formulario y el usuario seleccionado
        this.editMode = false; // Desactiva el modo de edición
        this.usuarioSeleccionado = null;
        this.editForm.reset(); // Opcional: restablece el formulario
      },
      (error) => {
        console.error('Error al actualizar usuario', error);
      }
    );
  } else {
    console.warn('No hay usuario seleccionado o el formulario no es válido');
  }

  }

cancelarEdicion(): void {
  this.editMode = false; // Desactiva el modo de edición
  this.usuarioSeleccionado = null;
}

// --------------------------------------RUTINAS ABM-----------------------------------

 // Método para obtener las rutinas y mostrarlas
 obtenerRutinas(): void {
  this.rutinaService.getRutinas().subscribe(
    (rutinas: Rutina[]) => {
      this.rutinas = rutinas;
      this.rutinasFiltradas = rutinas; // Inicializa con todas las rutinas
      this.mostrarRutinas = true;
    }
  );
}

eliminarRutina(rutina: Rutina): void {
  if (!rutina) {
    console.warn("Rutina inválida para eliminar");
    return;
  }

  this.rutinaService.deleteRutina(rutina.id).subscribe(
    () => {
      // Remueve la rutina eliminada de la lista local de rutinas
      this.rutinas = this.rutinas.filter(r => r.id !== rutina.id);
      this.rutinasFiltradas = this.rutinasFiltradas.filter(r => r.id !== rutina.id);
      
      console.log("Rutina eliminada:", rutina);
    },
    (error) => {
      console.error("Error al eliminar la rutina:", error);
    }
  );
}

// Método para filtrar rutinas según el texto de búsqueda
filtrarRutinas(): void {
  this.rutinasFiltradas = this.rutinas.filter(rutina =>
    rutina.nombre.toLowerCase().includes(this.filtroRutina.toLowerCase())
  );
}

toggleDetallesRutina(index: number): void {
  this.detallesRutinaVisible = this.detallesRutinaVisible === index ? null : index; 
}

modificarRutina(rutina: Rutina): void {
  this.editModeRutina = true; // Activa el modo de edición
  this.rutinaSeleccionada = rutina; // Almacena la rutina seleccionada
  // Rellena el formulario con los datos actuales de la rutina
  this.editFormRutina.patchValue({
    nombre: rutina.nombre,
    descripcion: rutina.descripcion,
    url: rutina.url
  });
}

actualizarRutina(): void {
  // Verifica si hay una rutina seleccionada y si el formulario es válido
  if (this.rutinaSeleccionada && this.editFormRutina.valid) {
    // Combina los datos de la rutina seleccionada con los valores del formulario
    const updatedData = { ...this.rutinaSeleccionada, ...this.editFormRutina.value };

    // Llama al servicio para actualizar la rutina
    this.rutinaService.updateRutina(this.rutinaSeleccionada.id, updatedData).subscribe(
      (updatedRutina) => {
        // Actualiza la lista de rutinas localmente para reflejar los cambios
        const index = this.rutinas.findIndex(r => r.id === updatedRutina.id);
        if (index !== -1) {
          this.rutinas[index] = updatedRutina; // Actualiza la rutina en la lista original
          this.rutinasFiltradas[index] = updatedRutina; // Actualiza la rutina en la lista filtrada
        }

        // Restablece el estado del formulario y la rutina seleccionada
        this.editModeRutina = false; // Desactiva el modo de edición
        this.rutinaSeleccionada = null;
        this.editFormRutina.reset(); // Opcional: restablece el formulario
      },
      (error) => {
        console.error('Error al actualizar rutina', error);
      }
    );
  } else {
    console.warn('No hay rutina seleccionada o el formulario no es válido');
  }
}

cancelarEdicionRutina(): void {
  this.editModeRutina = false; // Desactiva el modo de edición
  this.rutinaSeleccionada = null;
}

}


