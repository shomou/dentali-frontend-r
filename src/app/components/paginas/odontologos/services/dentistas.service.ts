import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dentista } from '../models/dentista.model';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DentistasService {
  private apiUrlDentistas = `${environment.apiUrl}/odontologos`;

  constructor(private http: HttpClient) {}

  obtenerDentistas(): Observable<Dentista[]> {
    const endpoint  = '/list';
    return this.http.get<Dentista[]>(this.apiUrlDentistas+endpoint);
  }

  agregarDentista(dentista: Dentista): Observable<Dentista> {
    return this.http.post<Dentista>(this.apiUrlDentistas, dentista);
  }

  obtenerDentistaPorId(id: number): Observable<Dentista> {
    return this.http.get<Dentista>(`${this.apiUrlDentistas}/${id}`);
  }

  actualizarDentista(id: number, dentistaActualizado: Dentista): Observable<Dentista> {
    return this.http.put<Dentista>(`${this.apiUrlDentistas}/${id}`, dentistaActualizado);
  }

  eliminarDentista(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlDentistas}/${id}`);
  }
}
