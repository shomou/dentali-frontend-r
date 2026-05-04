import { Component, OnInit } from '@angular/core';
import { DentistasService } from '../../services/dentistas.service';
import { Dentista } from '../../models/dentista.model';


@Component({
  selector: 'app-dentista-list',
  templateUrl: './dentista-list.component.html',
  styleUrl: './dentista-list.component.css'
})
export class DentistaListComponent implements OnInit{

  dentistas: Dentista[] = [];

  constructor(private dentistasService: DentistasService){}

  ngOnInit(): void {
    this.cargarDentistas();
  }

  cargarDentistas():void{
    this.dentistasService.obtenerDentistas().subscribe({
      next: (dentistas) => {
        //console.log(dentistas)
        this.dentistas = dentistas;
      },
      error: (error) => {
        console.error('Error al cargar los dentistas:', error);
      }
    });
  }

  eliminarDentista(id: number): void{
    if (confirm('¿Estás seguro de que deseas eliminar este odontólogo?')) {
      this.dentistasService.eliminarDentista(id).subscribe({
        next: () => {
          // Refrescamos la lista consultando de nuevo a la API
          this.cargarDentistas();
        },
        error: (err) => console.error('Error al eliminar el dentista', err)
      });
    }
  }

  trackByDentista(index: number, dentista: Dentista): number{
    return dentista.id;
  }

}
