import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Usuario } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})


export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';
  private usuarioActual: Usuario | null = null;
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkLocalStorage();
  }

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

  private checkLocalStorage() {
    const usuarioData = localStorage.getItem('usuarioActual');
    if (usuarioData) {
      this.usuarioActual = JSON.parse(usuarioData);
      this.loggedInSubject.next(true); // Usuario está logueado
    }
  }

  authenticate(username: string, password: string): Observable<Usuario | undefined> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      map((usuarios: Usuario[]) =>
        usuarios.find(u => u.username === username && u.password === password)
      ),
      tap(usuario => {
        if (usuario) {
          this.usuarioActual = usuario;
          this.loggedInSubject.next(true);
          localStorage.setItem('usuarioActual', JSON.stringify(usuario));
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
    this.loggedInSubject.next(false);
    localStorage.removeItem('usuarioActual');
  }
}

