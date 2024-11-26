export interface Comentario {
  userId: number;
  username: string;
  text: string;
  date: string;
}

export interface Rutina {
  id: string;
  nombre: string;
  descripcion: string;
  url: string;
  comentarios?: Comentario[];
}
