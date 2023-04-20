import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

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
    constructor(public layoutService: LayoutService, private route : Router, private authService : AuthService) { 
        this.user = this.authService.getUser();
        this.rol = this.authService.getRol();
        console.log(this.rol);
        
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
