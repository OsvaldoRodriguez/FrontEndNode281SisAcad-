import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  registroForm: FormGroup = new FormGroup({
    
    nombre: new FormControl('', [Validators.required]),
    paterno: new FormControl('', [Validators.required]),
    materno: new FormControl('', [Validators.required]),
    nom_usuario: new FormControl('', [Validators.required]),
    contrasenia: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private authService : AuthService, private router : Router){

  }

  registrar(){
    this.authService.registro(this.registroForm.value).subscribe(
      (res : any) => {
        console.log(res);
        // localStorage.setItem('access_token', res.access_token);
        this.router.navigate(['/admin/perfil']);
      }, (error : any) => {
        console.log(error);
        
      }
    )
  }


}
