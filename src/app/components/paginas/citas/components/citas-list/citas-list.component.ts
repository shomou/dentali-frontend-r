import { Component, OnInit } from '@angular/core';
import { Cita } from '../../models/cita.model';
import { CitasServiceService } from '../../services/citas.service.service';

@Component({
  selector: 'app-citas-list',
  templateUrl: './citas-list.component.html',
  styleUrl: './citas-list.component.css'
})
export class CitasListComponent implements OnInit {
  citas: Cita[] = [];
  loading = true;

  constructor(private citasService: CitasServiceService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.loading = true;
    this.citasService.getCitas().subscribe({
      next: (data) => {
        this.citas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar citas', err);
        this.loading = false;
      }
    });
  }

  eliminarCita(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
      this.citasService.eliminarCita(id).subscribe({
        next: () => this.cargarCitas(),
        error: (err) => console.error('Error al eliminar cita', err)
      });
    }
  }
}