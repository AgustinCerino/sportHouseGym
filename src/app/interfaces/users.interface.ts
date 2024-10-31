export interface Usuario {

        id: number;
        username: string;
        password: string;
        role: 'admin' | 'basic' | 'premium'; // Enum para roles
        Nombre:string;
        Email: string;
        Peso: number;
        Altura:number;
        Proceso:string;
        Nutricion: string;

}
