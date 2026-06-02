import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CitasServiceService } from '../../services/citas.service.service';
import { PacientesService } from '../../../pacientes/services/pacientes.service';
import { DentistasService } from '../../../odontologos/services/dentistas.service';
import { Paciente } from '../../../pacientes/models/paciente.model';
import { Dentista } from '../../../odontologos/models/dentista.model';

@Component({
  selector: 'app-citas-new',
  templateUrl: './citas-new.component.html',
  styleUrl: './citas-new.component.css'
})
export class CitasNewComponent implements OnInit{
  citaForm: FormGroup = new FormGroup({});
  enviado = false;
  pacientes: Paciente[] = [];
  odontologos: Dentista[] = [];
  
  constructor(
    private fb: FormBuilder,
    private citasService: CitasServiceService,
    private pacientesService: PacientesService,
    private odontologosService: DentistasService,
    private router: Router
  ){}

  ngOnInit(): void{
    this.initForm();
    this.cargarDatosRelacionados();
  }

  private initForm(){
    this.citaForm = this.fb.group({
      pacienteId: ['', [Validators.required]],
      odontologoId: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      motivo: ['', [Validators.required]],
      estado: ['PENDIENTE', [Validators.required]],
      observaciones: ['']
    });
  }

  private cargarDatosRelacionados(): void {
    // Obtenemos los pacientes para el selector
    this.pacientesService.obtenerPacientes().subscribe({
      next: (data) => this.pacientes = data,
      error: (err) => console.error('Error al cargar pacientes', err)
    });

    // Obtenemos los odontólogos para el selector
    this.odontologosService.obtenerDentistas().subscribe({
      next: (data) => this.odontologos = data,
      error: (err) => console.error('Error al cargar odontólogos', err)
    });
  }

  get f() {
    return this.citaForm.controls;
  }

  onSubmit(): void {
    this.enviado = true;
    if (this.citaForm.invalid) return;

    this.citasService.crearCita(this.citaForm.value).subscribe({
      next: () => {
        this.router.navigate(['/citas']);
      },
      error: (err) => console.error('Error al guardar la cita', err)
    });
  }
}
