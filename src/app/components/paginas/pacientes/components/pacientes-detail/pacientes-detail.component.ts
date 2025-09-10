import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  Observable, of } from 'rxjs';
import { map, filter, switchMap, catchError, finalize } from 'rxjs/operators';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from '../../models/paciente.model';

@Component({
  selector: 'app-pacientes-detail',
  templateUrl: './pacientes-detail.component.html',
  styleUrl: './pacientes-detail.component.css'
})
export class PacientesDetailComponent implements OnInit{

  paciente$!: Observable<Paciente | null>;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private pacientesService: PacientesService
  ){}

  ngOnInit(): void{
    this.paciente$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))), // obtenemos el id de la URL
      switchMap(id => {
        this.loading = true;
        this.error = '';
        return this.pacientesService.obtenerPacientePorId(id).pipe(
          map(p => p ?? null), // si undefined → null
          catchError(err => {
            this.error = 'Error al cargar paciente';
            return of(null);
          }),
          finalize(() => (this.loading = false))
        );
      })
    );
  }

}
