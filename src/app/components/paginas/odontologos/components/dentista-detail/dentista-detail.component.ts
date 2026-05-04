import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  Observable, of } from 'rxjs';
import { map, filter, switchMap, catchError, finalize } from 'rxjs/operators';
import { DentistasService } from '../../services/dentistas.service';
import { Dentista } from '../../models/dentista.model';

@Component({
  selector: 'app-dentista-detail',
  templateUrl: './dentista-detail.component.html',
  styleUrl: './dentista-detail.component.css'
})
export class DentistaDetailComponent implements OnInit{

  dentista$!: Observable<Dentista | null>
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private dentistasService: DentistasService
  ){}

  ngOnInit():void{
    this.dentista$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))), // obtenemos el id de la URL
      switchMap(id => {
        this.loading = true;
        this.error = '';
        return this.dentistasService.obtenerDentistaPorId(id).pipe(
          map(dentista => {
            if (!dentista) return null;

            // Procesamos el array de roles para obtener una descripción amigable
            const roles = (dentista as any).roles;
            (dentista as any).rolDescripcion = (roles && roles.length > 0)
              ? (roles[0] === 'ROLE_USER' ? 'Usuario' : 'Administrador')
              : 'Sin rol';

            return dentista;
          }),
          catchError(err => {
            this.error = 'Error al cargar el odontólogo';
            return of(null);
          }),
          finalize(() => (this.loading = false))
        );
      })
    );


  }
}
