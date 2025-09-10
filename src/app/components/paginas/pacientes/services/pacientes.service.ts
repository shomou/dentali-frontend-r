import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs'
import { Paciente } from "../models/paciente.model";

@Injectable({ providedIn: 'root' })
export class PacientesService {
    private pacientes: Paciente[] =[
        {
            id: 1,
            nombre: 'Juan',
            apellido: 'Pérez Garcia',
            fechaNacimiento: '1990-01-01',
            telefono: '2332837764',
            email:'juan.perez@hotmail.com',
            direccion: '',
            genero: 'Masculino'        
        },
        {
            id: 2,
            nombre: 'Ana',
            apellido: 'Gómez Rodríguez',
            fechaNacimiento: '1992-02-13',
            telefono: '7223416745',
            email:'ana.gomez@gmail.com',
            direccion: '',
            genero: 'Femenino'
        }
    ];

    obtenerPacientes() :Observable<Paciente[]>{
        return of(this.pacientes);
    
    }

    agregarPaciente(paciente: Paciente): Observable<Paciente[]>{
        paciente.id = this.pacientes.length+1;
        this.pacientes.push(paciente);
        return of(this.pacientes);
    }

    obtenerPacientePorId(id: number): Observable<Paciente | undefined>{
        const paciente =  this.pacientes.find(p=> p.id === id);
        return of(paciente); 
    }

    actualizarPaciente(id:number, pacienteActualizado: Paciente): Observable<Paciente | null>{
        const index = this.pacientes.findIndex(p => p.id === id);
        if (index !== -1) {
            this.pacientes[index] = {...this.pacientes[index], ...pacienteActualizado};
            return of(this.pacientes[index]);
        }else{
            return of(null);
        }       
    }

    eliminarPaciente(id: number): Observable<Paciente[]>{
        this.pacientes = this.pacientes.filter(p => p.id !== id);
        return of([...this.pacientes]);
    }
}