import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Component({
  selector: 'app-doble-autentificacion',
  templateUrl: './doble-autentificacion.component.html',
  styleUrls: ['./doble-autentificacion.component.scss'],
  providers: [MessageService]
})
export class DobleAutentificacionComponent {
  displayModal: boolean = true;
  constructor(private router: Router, private usuarioService: UsuariosService, private messageService : MessageService) {
    this.displayModal = true;
    this.verificarToken();
  }

  pinForm: FormGroup = new FormGroup({
    pin: new FormControl('', [
      Validators.required,
      Validators.max(9999),
      Validators.min(1000),
    ]),
  });
  verificarToken() {
    // console.log('el token', localStorage.getItem('user'));

    if (localStorage.getItem('user') === null) {
      this.router.navigate(['auth/login']);
      this.verificarPin();
    } else {
      // console.log("existe token en doble autentificación");
    }
  }

  verificarPin() {
    let usuario: any = localStorage.getItem('user')?.toString();
    this.usuarioService.mostrar().subscribe(
      (res: any) => {
        // console.log(res);
        let flag: boolean = false;
        for (let i = 0; i < res.length; i++) {
          if (usuario === res[i].nom_usuario) {
            if (this.pinForm.value.pin === res[i].pin) {
              flag = true;
            }
          }
        }

        this.displayModal = false;
        //
        if (flag || true) {
          this.router.navigate(['admin']);
          this.displayModal = false;
          this.pinForm.reset();

          
        } else {
          this.router.navigate(['auth/login']);
        }
      },
      (error: any) => {}
    );
  }
}
