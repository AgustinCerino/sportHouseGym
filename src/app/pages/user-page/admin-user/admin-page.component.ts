import { Component, OnInit } from '@angular/core';
import { Usuario} from '../../../interfaces/users.interface';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

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
  constructor(private userService: UsuarioService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      email: [''],
      peso: [''],
      altura: [''],
      nutricion: ['']
    });
  }

  

  ngOnInit(): void {}

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
    nutricion: usuario.nutricion
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
}


