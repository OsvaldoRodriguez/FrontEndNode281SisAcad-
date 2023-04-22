import { Component, OnChanges } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import {direccion} from './../direccionArchivos/direcciones'
import { InfosistemaService } from '../core/services/infosistema.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnChanges{
  isLogued : boolean = false;
  url_imagen : any
  constructor(private authService : AuthService, private infoService : InfosistemaService){
    this.isLogued = this.authService.isLoggedIn();
    // console.log("esta logueado", this.isLogued);
    infoService.mostrar().subscribe( (res : any) => {
      this.url_imagen = direccion.infosSitema + res[0].logo
    }, (error : any) => {

    })
  }

  ngOnChanges() : void {
    this.isLogued = this.authService.isLoggedIn();
    // console.log("esta logueado", this.isLogued);
    
  }


}
