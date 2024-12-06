import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject,of,throwError} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Usuario } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})


export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';

  private usuarioActual: Usuario | null = null;

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private actividadesSubject = new BehaviorSubject<{[key: string]: string}>({});

  public loggedIn$ = this.loggedInSubject.asObservable();
  public actividades$ = this.actividadesSubject.asObservable();


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
    const nuevoUsuario = {
      ...usuario,
      actividades: {}
    };
    return this.http.post<Usuario>(this.apiUrl, nuevoUsuario);
  }

  updateUser(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario).pipe(
      tap(usuarioActualizado => {
        if (this.usuarioActual?.id === id) {
          this.actualizarUsuarioLocal(usuarioActualizado);
        }
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private checkLocalStorage() {
    const usuarioData = localStorage.getItem('usuarioActual');
    if (usuarioData) {
      this.usuarioActual = JSON.parse(usuarioData);
      this.loggedInSubject.next(true);
      if(this.usuarioActual){
      this.actividadesSubject.next(this.usuarioActual.actividades || {});
      }
    }
  }

  authenticate(username: string, password: string): Observable<Usuario | undefined> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      map(usuarios => usuarios.find(u => u.username === username && u.password === password)),
      tap(usuario => {
        if (usuario) {
          this.actualizarUsuarioLocal(usuario);
        }
      })
    );
  }
  isAuthenticated(): boolean {
    return localStorage.getItem('usuarioActual') !== null;
  }


  getUsuarioActual(): Observable<Usuario> {
    if (!this.usuarioActual) {
      return throwError(() => new Error('No hay usuario autenticado'));
    }
    return of(this.usuarioActual);
  }


  cerrarSesion(): void {
    this.usuarioActual = null;
    this.loggedInSubject.next(false);
    this.actividadesSubject.next({});
    localStorage.removeItem('usuarioActual');
  }

  updateActividadesUsuario(id: number, actividades: { [key: string]: string }): Observable<Usuario> {
    if (!this.usuarioActual || this.usuarioActual.id !== id) {
      return throwError(() => new Error('Usuario no autorizado'));
    }

    return this.http.patch<Usuario>(`${this.apiUrl}/${id}`, { actividades }).pipe(
      tap(usuarioActualizado => {
        this.actualizarUsuarioLocal(usuarioActualizado);
      }),
      catchError(error => {
        console.error('Error al actualizar actividades:', error);
        return throwError(() => new Error('Error al actualizar actividades'));
      })
    );
  }

  private actualizarUsuarioLocal(usuario: Usuario): void {
    this.usuarioActual = usuario;
    this.loggedInSubject.next(true);
    this.actividadesSubject.next(usuario.actividades || {});
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
  }

  getActividadesMes(año: number, mes: number): {[key: string]: string} {
    return Object.entries(this.usuarioActual?.actividades || {})
      .filter(([fecha]) => {
        const [añoAct, mesAct] = fecha.split('-').map(Number);
        return añoAct === año && mesAct === mes;
      })
      .reduce((acc, [fecha, actividad]) => ({
        ...acc,
        [fecha]: actividad
      }), {});
  }

}

