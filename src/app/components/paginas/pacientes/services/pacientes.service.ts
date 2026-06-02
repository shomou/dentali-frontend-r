import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'
import { Paciente } from "../models/paciente.model";
import { environment } from '../../../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class PacientesService {
   private apiUrlPacientes = `${environment.apiUrl}/v1/pacientes`;

   constructor(private http: HttpClient) {}

    obtenerPacientes() :Observable<Paciente[]>{
        return this.http.get<Paciente[]>(this.apiUrlPacientes);
    
    }

    agregarPaciente(paciente: Paciente): Observable<Paciente>{
        console.log(paciente)
        return this.http.post<Paciente>(this.apiUrlPacientes, paciente);
    }

    obtenerPacientePorId(id: number): Observable<Paciente | undefined>{
        return this.http.get<Paciente>(`${this.apiUrlPacientes}/${id}`);
    }

    actualizarPaciente(id:number, pacienteActualizado: Paciente): Observable<Paciente | null>{
        return this.http.put<Paciente>(`${this.apiUrlPacientes}/${id}`, pacienteActualizado);
    }

    desactivarPaciente(id:number): Observable<Paciente>{
        return this.http.post<Paciente>(`${this.apiUrlPacientes}/${id}`,{});
    }

    
}