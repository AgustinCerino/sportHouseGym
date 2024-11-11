import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from '../../../interfaces/users.interface';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuarios-abm',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './usuarios-abm.component.html',
  styleUrl: './usuarios-abm.component.css'
})
export class UsuariosAbmComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  filtro: string = '';
  detallesVisible: number | null = null;
  editMode: boolean = false;
  editForm: FormGroup;
  usuarioSeleccionado: Usuario | null = null;

  constructor(
    private userService: UsuarioService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      email: [''],
      peso: [''],
      altura: [''],
      nutricion: ['']
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.userService.getUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.usuariosFiltrados = usuarios;
      }
    );
  }

  filtrarUsuarios(): void {
    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.username.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  toggleDetalles(index: number): void {
    this.detallesVisible = this.detallesVisible === index ? null : index;
  }

  modificarUsuario(usuario: Usuario): void {
    this.editMode = true;
    this.usuarioSeleccionado = usuario;
    this.editForm.patchValue({
      email: usuario.email,
      peso: usuario.peso,
      altura: usuario.altura,
      role: usuario.role
    });
  }

  eliminarUsuario(usuario: Usuario): void {
    // Implementar la lógica de eliminación
    console.log("Eliminando usuario:", usuario);
  }

  actualizarUsuario(): void {
    if (this.usuarioSeleccionado && this.editForm.valid) {
      const updatedData = { ...this.usuarioSeleccionado, ...this.editForm.value };
      this.userService.updateUser(this.usuarioSeleccionado.id, updatedData).subscribe(
        (updatedUser) => {
          const index = this.usuarios.findIndex(u => u.id === updatedUser.id);
          if (index !== -1) {
            this.usuarios[index] = updatedUser;
            this.usuariosFiltrados[index] = updatedUser;
          }
          this.editMode = false;
          this.usuarioSeleccionado = null;
          this.editForm.reset();
        },
        (error) => {
          console.error('Error al actualizar usuario', error);
        }
      );
    }
  }

  cancelarEdicion(): void {
    this.editMode = false;
    this.usuarioSeleccionado = null;
  }
}

