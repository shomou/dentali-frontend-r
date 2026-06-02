export interface Cita{
    id?: number;
    pacienteId: number;
    odontologoId: number;
    fecha: string;
    hora: string;
    motivo: string;
    estado: 'PENDIENTE'|'CONFIRMADA'|'CANCELADA'|'';
    observaciones?: string;
    pacienteNombre?: string;
    odontologoNombre?: string;
}