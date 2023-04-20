import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm : FormGroup = new FormGroup({
    nom_usuario : new FormControl('', [Validators.required]),
    contrasenia : new FormControl('', [Validators.required])
  });

  // importando el Servicio para auth
  // inyectando Router -> para navegar a otra pagina
  constructor(private authService: AuthService, private router : Router){}


  ingresar(){
    // se usar authservice para conectar con el servidor
    // se esta enviando el valor atravez del servicio auth y usando la funcion loginConNode (la cual tiene la url del servidor)
  //   this.authService.loginConNode(this.loginForm.value).subscribe( (res : any) => {
  //     // indicar el formato de la respuesta
  //     console.log("DATOS DEL LOGIN EN COMPONENTE LOGIN");
  //     console.log(res);
  //     // alert("Usuario y Contraseña Correctos");
  //     // llega el token y hay que guardarlo
  //     // guardando el token en localStorage
  //     localStorage.setItem('access_token', res.access_token);

  //     // queremos redireccionar a otra pagina
  //     console.log("hasta aqui llega");
      
  //     this.router.navigate(['/admin/sistema/informacion']);
  //   }, (error : any) => {
  //     console.log(error);
  //     // alert("Contraseña Incorrecta");
      
  //   });
  // }

  this.authService.loginConNode(this.loginForm.value);
}

  salir(){
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
