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
    this.dentistaForm = this.fb.group({
      nombre:['',[Validators.required, Validators.minLength(2)]],
      apellido:['',[Validators.required, Validators.minLength(2)]],
      especialidad:['',[Validators.required]],
      telefono:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required, Validators.minLength(7)]],
      fechaRegistro:['',[Validators.required]],
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

    console.log(this.dentistaForm);

    // Mandamos el objeto al servicio
    // this.dentistasService.agregarDentista(this.dentistaForm.value).subscribe({
    //   next: () =>{
    //     this.router.navigate(['/dentistas']);
    //   },
    //   error: (err: any) => {
    //     console.error('Error al guardar dentista');
    //   }
    // });
  }
}
