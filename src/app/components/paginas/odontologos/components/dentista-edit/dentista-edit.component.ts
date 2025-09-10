import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DentistasService } from '../../services/dentistas.service';


@Component({
  selector: 'app-dentista-edit',
  templateUrl: './dentista-edit.component.html',
  styleUrl: './dentista-edit.component.css'
})
export class DentistaEditComponent implements OnInit{

  dentistaForm: FormGroup = new FormGroup({});
  id!: number;
  esEdicion = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
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

    // Verificamos si hay un id en la ruta
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if(this.id){
      this.esEdicion = true;
      this.dentistasService.obtenerDentistaPorId(this.id).subscribe((dentista) => {
        if (dentista) {
          this.dentistaForm.patchValue(dentista);
        } else {
          console.error('Paciente no encontrado');
        }
      });
    }
  }

  onSubmit(){
    if(this.dentistaForm.invalid) return;

    if(this.esEdicion){
      this.dentistasService.actualizarDentista(this.id, this.dentistaForm.value)
      .subscribe(() => this.router.navigate(['/dentistas']));
    }else{
      this.dentistasService.agregarDentista(this.dentistaForm.value)
      .subscribe(() => this.router.navigate(['/dentistas']));
    }

    
  }

  get f(){
    return this.dentistaForm.controls;
  }

}
