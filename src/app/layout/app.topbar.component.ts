import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import {direccion} from './../direccionArchivos/direcciones'
import { InfosistemaService } from '../core/services/infosistema.service';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    
    user : any = '';
    rol :any;
    direccionImagen : string = ""
    datos : any = {id : 1}
    url_imagen : any
    constructor(private infoSistemaService : InfosistemaService, public layoutService: LayoutService, private route : Router, private authService : AuthService) { 
        this.user = this.authService.getUser();
        this.rol = this.authService.getRol();
        // console.log(this.rol);
        this.direccionImagen = direccion.infosSitema
        this.infoSistemaService.mostrarId(1).subscribe( (res : any) => {
            this.datos = res
            this.url_imagen = this.direccionImagen + this.datos[0].logo;
            console.log(res);
            
        }, (error : any) => {

        })
        
    }


    salir(){
        console.log("ejecuta salir");
        
        this.authService.logout();
        this.route.navigate(['auth/login']);
    }


    volverInicio(){
        console.log("se ejecuta volver");
        this.route.navigate(['/web/inicio']);
    }
    
}
