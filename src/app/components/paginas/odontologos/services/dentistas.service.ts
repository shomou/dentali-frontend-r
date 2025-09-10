import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Dentista } from '../models/dentista.model';

@Injectable({
  providedIn: 'root'
})
export class DentistasService {
  private dentistas: Dentista[] = [
    {
      id: 1,
      nombre: 'Carlos',
      apellido: 'Ruiz',
      especialidad: 'Ortodoncia',
      telefono: '1234567890',
      email: 'carlos.ruiz@example.com',
      password:'',
      fechaRegistro: '2023-01-15',
      role: 'USER_ROLE'
    },
    {
      id: 2,
      nombre: 'Laura',
      apellido: 'Fernández',
      especialidad: 'Endodoncia',
      telefono: '0987654321',
      email: 'laura.fernandez@example.com',
      password:'',
      fechaRegistro: '2023-02-20',
      role: 'ADMIN_ROLE'
    }
  ];

  obtenerDentistas(): Observable<Dentista[]> {
    return of(this.dentistas)
  }

  agregarDentista(dentista: Dentista): Observable<Dentista[]>{
    dentista.id = this.dentistas.length + 1;
    this.dentistas.push(dentista);
    return of(this.dentistas);
  }

  obtenerDentistaPorId(id: number): Observable<Dentista | undefined>{
    const dentista = this.dentistas.find(d => d.id === id);
    return of(dentista);
  }

  actualizarDentista(id: number, dentistaActualizado: Dentista): Observable<Dentista | null>{
    const index = this.dentistas.findIndex(d => d.id === id);
    if(index !== -1){
      this.dentistas[index] = {...this.dentistas[index], ...dentistaActualizado};
      return of(this.dentistas[index]);
    }else{
      return of(null);
    }
  }

  eliminarDentista(id: number): Observable<Dentista[]>{
    this.dentistas = this.dentistas.filter(d => d.id !== id);
    return of([...this.dentistas]);
  }
}
