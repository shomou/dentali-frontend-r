import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DentistasService } from '../../services/dentistas.service';

@Component({
  selector: 'app-dentista-new',
  templateUrl: './dentista-new.component.html',
  styleUrl: './dentista-new.component.css'
})
export class DentistaNewComponent implements OnInit{

  dentistaForm: FormGroup = new FormGroup({});
  enviado = false;

  constructor(
    private fb: FormBuilder,
    private dentistasService: DentistasService,
    private router: Router
  ){}

  ngOnInit(): void{
    // Obtenemos la fecha actual en formato YYYY-MM-DD
    const hoy = new Date().toISOString().split('T')[0];

    this.dentistaForm = this.fb.group({
      nombre:['',[Validators.required, Validators.minLength(2)]],
      apellido:['',[Validators.required, Validators.minLength(2)]],
      especialidad:['',[Validators.required]],
      telefono:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required, Validators.minLength(7)]],
      fechaRegistro: [{ value: hoy, disabled: true }, [Validators.required]],
      role:['',[Validators.required]]
    });
  }

  get f(){
    return this.dentistaForm.controls;
  }

  onSubmit(): void{
    this.enviado = true;

    if(this.dentistaForm.invalid){
      return;
    }

    const rawValues = this.dentistaForm.getRawValue();
    console.log('Valores del formulario:', rawValues);

    // Mapeo robusto: Transformamos el 'role' del formulario al array 'roles' del backend
    let roleKey = rawValues.role;
    let finalRoles: string[] = [];

    // Verificamos si es Usuario o Administrador
    if (roleKey === 'USER_ROLE' || roleKey === 'ROLE_USER') finalRoles = ['ROLE_USER'];
    else if (roleKey === 'ADMIN_ROLE' || roleKey === 'ROLE_ADMIN') finalRoles = ['ROLE_ADMIN'];

    const dentistaParaGuardar = {
      ...rawValues,
      roles: finalRoles
    };

    // Eliminamos el campo 'role' individual para enviar solo el array 'roles'
    delete dentistaParaGuardar.role;

    // Mandamos el objeto al servicio
    this.dentistasService.agregarDentista(dentistaParaGuardar).subscribe({
       next: () =>{
         this.router.navigate(['/dentistas']);
      },
      error: (err: any) => {
        console.error('Error al guardar dentista');
      }
    });
  }
}
