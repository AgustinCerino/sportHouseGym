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
  imports: [CommonModule, FormsModule],
  templateUrl: './routine-details.component.html',
  styleUrls: ['./routine-details.component.css']
})
export class RoutineDetailsComponent implements OnInit {
  rutina: any = null;
  newComment: string = '';
  responseText: { [key: string]: string } = {};
  isAdmin: boolean = false;
  showResponseForm: { [key: string]: boolean } = {};
  nutricionalInfo?: string ;

  private rutinaService = inject(RoutineService);
  private route = inject(ActivatedRoute);
  public sanitizer = inject(DomSanitizer);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const currentUser = localStorage.getItem('usuarioActual');

    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.isAdmin = user.role === 'admin';
    }

    if (id) {
      this.rutinaService.getRutinaById(id).subscribe({
        next: (data) => {
          this.rutina = data;


          this.nutricionalInfo = data.infoNutricional ||
            'Recuerda complementar esta rutina con una dieta equilibrada rica en proteínas, carbohidratos saludables y grasas buenas. Mantente hidratado y ajusta tus calorías a tus objetivos de entrenamiento.';

          if (this.rutina.comments && this.rutina.comments.length > 0) {
            this.rutina.comments.sort((a: Comentario, b: Comentario) => b.date.localeCompare(a.date));
          }
        },
        error: (err) => {
          console.error('Error al cargar la rutina:', err);
          alert('Hubo un problema al cargar los datos de la rutina.');
        }
      });
    }
  }


  addComment(event: Event) {
    event.preventDefault();

    const currentUser = localStorage.getItem('usuarioActual');
    if (!currentUser) {
      alert('Debes estar autenticado para comentar');
      return;
    }

    if (!this.newComment.trim()) {
      alert('El comentario no puede estar vacío.');
      return;
    }

    const user = JSON.parse(currentUser);
    const comment: Comentario = {
      id: crypto.randomUUID(), // Genera un ID único para el comentario
      userId: user.id,
      username: user.username,
      text: this.newComment,
      date: new Date().toISOString(),
      responses: []
    };

    this.rutinaService.addCommentToRoutine(this.rutina.id, comment).subscribe({
      next: (updatedRoutine) => {
        this.rutina = updatedRoutine;
        this.newComment = ''; // Limpia el campo de texto
      },
      error: (err) => {
        console.error('Error al agregar el comentario:', err);
        alert('Hubo un problema al agregar el comentario.');
      }
    });
  }

  respondToComment(commentId: string, event: Event) {
    event.preventDefault();

    const currentUser = localStorage.getItem('usuarioActual');
    if (!currentUser) {
      alert('Debes estar autenticado para responder.');
      return;
    }

    const user = JSON.parse(currentUser);
    if (user.role !== 'admin') {
      alert('Solo los administradores pueden responder comentarios.');
      return;
    }

    const responseText = this.responseText[commentId]?.trim();
    if (!responseText) {
      alert('No puedes enviar una respuesta vacía.');
      return;
    }

    const response = {
      id: crypto.randomUUID(), // Genera un ID único para la respuesta
      userId: user.id,
      username: user.username,
      text: responseText,
      date: new Date().toISOString()
    };

    this.rutinaService.addResponseToComment(this.rutina.id, commentId, response).subscribe({
      next: (updatedRoutine) => {
        this.rutina = updatedRoutine;
        this.responseText[commentId] = ''; // Limpia el campo de respuesta
      },
      error: (err) => {
        console.error('Error al responder al comentario:', err);
        alert('Hubo un problema al responder al comentario.');
      }
    });
  }
  toggleResponseForm(commentId: string) {
    this.showResponseForm[commentId] = !this.showResponseForm[commentId];
  }

eliminarComentario(commentId: number) {

  if (this.rutina && this.rutina.comments) {

    this.rutinaService.eliminarComentario(this.rutina.id, commentId).subscribe(
      (response) => {
        this.rutina.comments = this.rutina.comments.filter((comment: { id: number }) => comment.id !== commentId);
        console.log('Comentario eliminado exitosamente:', response);
      },
      (error) => {
        console.error('Error al eliminar el comentario:', error);
      }
    );
  } else {
    // Si no hay rutina o comentarios, mostrar advertencia
    console.warn('No se puede eliminar el comentario. La rutina o los comentarios no están disponibles.');
  }
}


}
