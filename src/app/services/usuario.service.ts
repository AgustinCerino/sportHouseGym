import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Usuario } from '../interfaces/users.interface'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})


export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';
  private usuarioActual: Usuario | null = null;

  constructor(private http: HttpClient) {}

  // Método para obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Método para obtener un usuario por ID
  getUserById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  postUsuarios(usuario: Omit<Usuario, 'id'>): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  updateUser(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }


  authenticate(username: string, password: string): Observable<Usuario | undefined> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      map((usuarios: Usuario[]) =>
        usuarios.find(u => u.username === username && u.password === password)
      ),
      tap(usuario => {
        if (usuario) {
          this.usuarioActual = usuario;
          localStorage.setItem('usuarioActual', JSON.stringify(usuario)); // Guardar en localStorage
        }
      })
    );
  }

  getUsuarioActual(): Usuario | null {
    if (!this.usuarioActual) {
      const usuarioData = localStorage.getItem('usuarioActual');
      if (usuarioData) {
        this.usuarioActual = JSON.parse(usuarioData);
      }
    }
    return this.usuarioActual;
  }

  cerrarSesion(): void {
    this.usuarioActual = null;
    localStorage.removeItem('usuarioActual');
  }
}

