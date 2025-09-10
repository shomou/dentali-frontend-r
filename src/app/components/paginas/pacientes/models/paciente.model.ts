export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string; // formato ISO
  telefono: string;
  email: string;
  direccion: string;
  genero: 'Masculino' | 'Femenino' | 'Otro';
}