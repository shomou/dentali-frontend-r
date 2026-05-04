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
      password:['', [Validators.minLength(7)]], // La contraseña no es requerida en edición, pero se valida la longitud si se introduce
      fechaRegistro: [{ value: '', disabled: true }, [Validators.required]],
      role: ['', [Validators.required]]
    });

    // Verificamos si hay un id en la ruta
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if(this.id){
      this.esEdicion = true;
      // No es necesario limpiar validadores aquí, ya que se inicializa sin Validators.required
      this.dentistasService.obtenerDentistaPorId(this.id).subscribe((dentista) => {
        if (dentista) {
          console.log(dentista);

          // Usamos el objeto Date para un formateo seguro y robusto
          const date = new Date(dentista.fechaRegistro);
          let fechaFormateada = dentista.fechaRegistro; // fallback por si falla

          if (!isNaN(date.getTime())) {
            const day = String(date.getUTCDate()).padStart(2, '0');
            const month = String(date.getUTCMonth() + 1).padStart(2, '0');
            const year = date.getUTCFullYear();
            fechaFormateada = `${day}/${month}/${year}`;
          }

          // El backend regresa "roles": ["ROLE_USER"]
          // Mapeamos el valor para que coincida con el 'value' del select en el HTML
          const rolesArray = (dentista as any).roles;
          let valorRol = '';

          if (rolesArray && rolesArray.length > 0) {
            const roleRaw = rolesArray[0]; // Ejemplo: "ROLE_USER"
            // Transformamos "ROLE_USER" -> "USER_ROLE"
            valorRol = roleRaw === 'ROLE_USER' ? 'USER_ROLE' :
                       roleRaw === 'ROLE_ADMIN' ? 'ADMIN_ROLE' : roleRaw;
          }

          this.dentistaForm.patchValue({
            ...dentista,
            fechaRegistro: fechaFormateada,
            role: valorRol,
            password: '' // Aseguramos que el campo de contraseña esté vacío al cargar para edición
          });
        } else {
          console.error('Odontólogo no encontrado');
        }
      });
    }
  }

  onSubmit(){
    if(this.dentistaForm.invalid) return;

    const rawValues = this.dentistaForm.getRawValue();

    // Mapeo robusto: Transformamos el 'role' seleccionado en el select al array 'roles'
    let finalRoles: string[] = [];
    if (rawValues.role === 'USER_ROLE') {
      finalRoles = ['ROLE_USER'];
    } else if (rawValues.role === 'ADMIN_ROLE') {
      finalRoles = ['ROLE_ADMIN'];
    }

    const dentistaData = {
      ...rawValues,
      roles: finalRoles
    };
    delete (dentistaData as any).role;

    if(this.esEdicion){
      this.dentistasService.actualizarDentista(this.id, dentistaData)
      .subscribe(() => this.router.navigate(['/dentistas']));
    }else{
      this.dentistasService.agregarDentista(dentistaData)
      .subscribe(() => this.router.navigate(['/dentistas']));
    }


  }

  get f(){
    return this.dentistaForm.controls;
  }

}
