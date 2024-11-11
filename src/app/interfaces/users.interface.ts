
export interface Usuario {


    id: number;
    username: string;
    password: string;
    role: 'admin' | 'basic' | 'premium'; // Enum para roles
    nombre: string;
    email: string;
    peso: number;
    altura: number;
    proceso: {
        volumen: boolean;
        perdida: boolean;
        mantenimiento: boolean;
    };
    nutricion: string;
    actividades: { [key: string]: string }|null;
}


