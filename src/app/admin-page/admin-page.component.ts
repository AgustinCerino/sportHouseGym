import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/users.interface';
import { UsuarioService } from '../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  usuarios: Usuario[] = []; // Array para almacenar los usuarios
  usuariosFiltrados: Usuario[] = []; // Array para almacenar los usuarios filtrados
  mostrarUsuarios: boolean = false; // Controla si mostrar o no los usuarios
  filtro: string = ''; // Variable para almacenar el texto de búsqueda

  constructor(private userService: UsuarioService) {}

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

  // Método para filtrar usuarios según el texto de búsqueda
  filtrarUsuarios(): void {
    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.username.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}