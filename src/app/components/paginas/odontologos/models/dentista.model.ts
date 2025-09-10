export interface Dentista{

    id: number;
	nombre: string;
	apellido: string;
	especialidad: string; 
	telefono: string;
	email: string;
	password: string;
	fechaRegistro: string;
    role: 'USER_ROLE' | 'ADMIN_ROLE';

}