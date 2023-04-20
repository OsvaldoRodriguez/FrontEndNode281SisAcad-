import { Component, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnChanges {
  loginForm: FormGroup = new FormGroup({
    nom_usuario: new FormControl('', [Validators.required]),
    contrasenia: new FormControl('', [Validators.required]),
  });

  ngOnChanges() {
    // this.displayModal = false;
    // this.pinForm.reset();
  }
  
  displayModal: boolean = false;
  // importando el Servicio para auth
  // inyectando Router -> para navegar a otra pagina
  constructor(
    private usuarioService: UsuariosService,
    private authService: AuthService,
    private router: Router
  ) {}

  
  ingresar() {
    this.authService.loginConNode(this.loginForm.value);
    
  }

  

  showModalDialog() {
    this.displayModal = true;
  }
  salir() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
