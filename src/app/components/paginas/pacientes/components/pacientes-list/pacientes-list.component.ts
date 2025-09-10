import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from '../../models/paciente.model';


@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.component.html',
  styleUrl: './pacientes-list.component.css'
})
export class PacientesListComponent implements OnInit{
  pacientes: Paciente[] = [];

  constructor(private pacientesService: PacientesService) {}

  ngOnInit(): void {
    this.pacientesService.obtenerPacientes().subscribe(data => {
      this.pacientes = data;
    });
  }

  eliminarPaciente(id: number): void {
    this.pacientesService.eliminarPaciente(id).subscribe((pacientes) => {
      this.pacientes = pacientes;
    });
  } 

  trackByPaciente(index: number, paciente: Paciente): number {
    return paciente.id;
  }

}

 
