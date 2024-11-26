import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { RoutineService } from '../../../services/rutine.service';
import { FormsModule } from '@angular/forms';
import { Comentario } from '../../../interfaces/routine.interface';

@Component({
  selector: 'app-routine-details',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './routine-details.component.html',
  styleUrl: './routine-details.component.css'
})
export class RoutineDetailsComponent implements OnInit {
rutina: any;
newComment: string = '';
private rutinaService = inject(RoutineService);

constructor (private route:ActivatedRoute,public sanitizer: DomSanitizer ){}
ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.rutinaService.getRutinaById(id).subscribe(data => {
      this.rutina = data;

      if (this.rutina.comments && this.rutina.comments.length > 0) {
        this.rutina.comments.sort((a: Comentario, b: Comentario) => {
          return b.date.localeCompare(a.date);
        });
      }
    });
  }
}


addComment(event :Event) {

  event.preventDefault();
  const currentUser = localStorage.getItem('usuarioActual');
  if (!currentUser) {
    alert('Debes estar autenticado para comentar');
    return;
  }

  const user = JSON.parse(currentUser);
  const comment = {
    userId: user.id,
    username: user.username,
    text: this.newComment,
    date: new Date().toISOString()
  };

  this.rutinaService.addCommentToRoutine(this.rutina.id, comment).subscribe(
    updatedRoutine => {
      this.rutina = updatedRoutine; // Actualiza la rutina localmente
      this.newComment = ''; // Limpia el campo de texto
    },
    error => {
      console.error('Error al agregar el comentario:', error);
      alert('Hubo un problema al agregar el comentario.');
    }
  );
}

}
