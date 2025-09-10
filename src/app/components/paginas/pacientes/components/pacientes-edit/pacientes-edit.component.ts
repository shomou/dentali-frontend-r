import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientesService } from '../../services/pacientes.service';
 

@Component({
  selector: 'app-pacientes-edit',
  templateUrl: './pacientes-edit.component.html',
  styleUrl: './pacientes-edit.component.css'
})
export class PacientesEditComponent implements OnInit{

  pacienteForm!: FormGroup;
  id!: number;
  esEdicion = false;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pacientesService: PacientesService
  ){}

  ngOnInit(): void{
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required]
    });

    // Verificamos si hay id en la ruta
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.esEdicion = true;
      this.pacientesService.obtenerPacientePorId(this.id).subscribe((paciente) => {
        if (paciente) {
          this.pacienteForm.patchValue(paciente);
        } else {
          console.error('Paciente no encontrado');
        }
      });
    }
  }

  onSubmit(){
    if (this.pacienteForm.invalid) return;

    if (this.esEdicion) {
      this.pacientesService.actualizarPaciente(this.id, this.pacienteForm.value)
        .subscribe(() => this.router.navigate(['/pacientes']));
    } else {
      this.pacientesService.agregarPaciente(this.pacienteForm.value)
        .subscribe(() => this.router.navigate(['/pacientes']));
    }
  }

}
