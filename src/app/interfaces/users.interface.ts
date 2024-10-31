export interface Usuario {

        id: number;
        username: string;
        password: string;
        role: 'admin' | 'basic' | 'premium'; // Enum para roles
        nombre:string;
        email: string;
        peso: number;
        altura:number;
        proceso:string;
        nutricion: string;

}
