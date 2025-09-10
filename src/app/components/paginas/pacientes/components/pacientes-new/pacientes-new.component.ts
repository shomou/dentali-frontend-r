import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PacientesService } from '../../services/pacientes.service';


@Component({
  selector: 'app-pacientes-new',
  templateUrl: './pacientes-new.component.html',
  styleUrl: './pacientes-new.component.css'
})
export class PacientesNewComponent implements OnInit{
  
  pacienteForm: FormGroup = new FormGroup({});
  enviado = false;

  constructor(
    private fb: FormBuilder,
    private pacientesService: PacientesService,
    private router: Router
  ){}

  ngOnInit(): void{
    this.pacienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      genero: ['', [Validators.required]]
    });
  }

  get f(){
    return this.pacienteForm.controls;
  }

  onSubmit(): void {
    this.enviado = true;
    
    if (this.pacienteForm.invalid) {
       console.log('adios');
       return; // si el form es inválido, no hace nada
    }
  
    // aquí mandas el objeto al servicio
    this.pacientesService.agregarPaciente(this.pacienteForm.value).subscribe({
      next: () => {
        this.router.navigate(['/pacientes']);
      },
      error: (err: any) => {
        console.error('Error al guardar paciente', err);
      }
    });
  }
  
}
