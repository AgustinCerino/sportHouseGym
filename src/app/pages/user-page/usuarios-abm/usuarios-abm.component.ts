import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      email: ['', [
        Validators.required, 
        Validators.email
      ]],
      peso: ['', [
        Validators.required, 
        Validators.min(20), 
        Validators.max(300)
      ]],
      altura: ['', [
        Validators.required, 
        Validators.min(100), 
        Validators.max(250)
      ]],
     role: ['', Validators.required]
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


  eliminarUsuario(usuario: Usuario): void {
    const confirmar = confirm(`¿Estás seguro de que quieres eliminar al usuario ${usuario.username}?`);
    if (confirmar) {
      // Llamar al servicio de eliminación
      this.userService.deleteUser(usuario.id).subscribe(
        () => {
          this.cargarUsuarios()
          console.log('Usuario eliminado con éxito');
          this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
        },
        error => {
          // Manejo de errores si la eliminación falla
          console.error('Error al eliminar el usuario', error);
          alert('Hubo un error al intentar eliminar al usuario.');
        }
      );
    }
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
    
    console.log(this.editForm.value); 
  }
  

  // Método para obtener mensajes de error de validación
  getErrorMessage(controlName: string): string {
    const control = this.editForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (controlName === 'email' && control?.hasError('email')) {
      return 'Ingrese un email válido';
    }
    if (controlName === 'peso') {
      if (control?.hasError('min')) {
        return 'El peso mínimo es 20 kg';
      }
      if (control?.hasError('max')) {
        return 'El peso máximo es 300 kg';
      }
    }
    if (controlName === 'altura') {
      if (control?.hasError('min')) {
        return 'La altura mínima es 100 cm';
      }
      if (control?.hasError('max')) {
        return 'La altura máxima es 250 cm';
      }
    }
    return '';
  }

  actualizarUsuario(): void {
    // Marcar todos los campos como tocados para mostrar errores
    Object.keys(this.editForm.controls).forEach(key => {
      const control = this.editForm.get(key);
      control?.markAsTouched();
    });

    if (this.usuarioSeleccionado && this.editForm.valid) {
      const updatedData = { ...this.usuarioSeleccionado, ...this.editForm.value };
      console.log('Datos actualizados:', updatedData);  
  
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
    } else {
      console.log('Formulario inválido o usuario no seleccionado');
    }
  }


  cancelarEdicion(): void {
    this.editMode = false;
    this.usuarioSeleccionado = null;
  }
}

