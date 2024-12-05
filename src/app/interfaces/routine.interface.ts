export interface Respuesta
{
  userId:number
  username: string;
  text: string;
  date: string;
}

export interface Comentario {
  id: string;
  userId: number;
  username: string;
  text: string;
  date: string;
  responses?:Respuesta[]
}

export interface Rutina {
  id: string;
  nombre: string;
  descripcion: string;
  url: string;
  comentarios?: Comentario[];
  tipo: 'normal' | 'premium';
  infoNutricional?: string;
}
