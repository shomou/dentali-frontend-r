import { Component, OnInit } from '@angular/core';
import { DentistasService } from '../../services/dentistas.service';
import { Dentista } from '../../models/dentista.model';


@Component({
  selector: 'app-dentista-list',
  templateUrl: './dentista-list.component.html',
  styleUrl: './dentista-list.component.css'
})
export class DentistaListComponent {

  dentistas: Dentista[] = [];

  constructor(private dentistasService: DentistasService){}

  ngOnInit(): void {
    this.dentistasService.obtenerDentistas().subscribe((dentistas) => {
      this.dentistas = dentistas;
    });
  }

  eliminarDentista(id: number): void{
    this.dentistasService.eliminarDentista(id).subscribe((dentistas) =>{
      this.dentistas = dentistas;
    });
  }

  trackByDentista(index: number, dentista: Dentista): number{
    return dentista.id;
  }
  
}
