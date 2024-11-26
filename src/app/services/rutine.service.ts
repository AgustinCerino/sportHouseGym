import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
  private apiUrl = 'http://localhost:3000/rutinas'; // Ruta para las rutinas en el JSON Server

  constructor(private http: HttpClient) {}

  // Obtener todas las rutinas
  getRutinas(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Obtener una rutina por su ID
  getRutinaById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva rutina
  createRutina(rutina: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, rutina);
  }

  // Editar una rutina existente
  updateRutina(id: string, rutina: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, rutina);
  }

  // Eliminar una rutina por su ID
  deleteRutina(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addCommentToRoutine(routineId: string, comment: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${routineId}`).pipe(
      map(rutina => {
        const updatedComments = [...(rutina.comments || []), comment];
        return this.http.patch(`${this.apiUrl}/${routineId}`, { comments: updatedComments });
      }),
      switchMap(obs => obs)
    );
  }


}
