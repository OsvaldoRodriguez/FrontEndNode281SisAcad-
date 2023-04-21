import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import {permisos} from './../../../../permisos/permisos'
import {permisosPadres} from './../../../../permisos/permisosPadres'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InfosistemaService } from 'src/app/core/services/infosistema.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent {

  datosSistema : any [] = []
  constructor(private infoSistemaService: InfosistemaService){
    this.mostrar();
  }

  infoForm : FormGroup = new FormGroup({
    logo : new FormControl('', [Validators.required]),
    quienes_somos : new FormControl('', [Validators.required]),
    mision : new FormControl('', [Validators.required]),
    vision : new FormControl('', [Validators.required]),
    celular : new FormControl('', [Validators.required]),
    correo : new FormControl('', [Validators.required]),
    direccion : new FormControl('', [Validators.required]),
    facebook : new FormControl('', [Validators.required]),
    twitter : new FormControl('', [Validators.required]),
    instagram : new FormControl('', [Validators.required]),
  })

  mostrar(){
    this.infoSistemaService.mostrar().subscribe( (res : any) => {
      this.datosSistema = res;
      // console.log(this.datosSistema);
      
      this.infoForm = new FormGroup({
        logo : new FormControl('', [Validators.required]),
        quienes_somos : new FormControl(this.datosSistema[0]?.quienes_somos, [Validators.required]),
        mision : new FormControl(this.datosSistema[0]?.mision, [Validators.required]),
        vision : new FormControl(this.datosSistema[0]?.vision, [Validators.required]),
        celular : new FormControl(this.datosSistema[0]?.celular, [Validators.required]),
        correo : new FormControl(this.datosSistema[0]?.correo, [Validators.required]),
        direccion : new FormControl(this.datosSistema[0]?.direccion, [Validators.required]),
        facebook : new FormControl(this.datosSistema[0]?.facebook, [Validators.required]),
        twitter : new FormControl(this.datosSistema[0]?.twitter, [Validators.required]),
        instagram : new FormControl(this.datosSistema[0]?.instagram, [Validators.required]),
      })
    }, (error : any) => {
      console.log(error);
      
    })
  }
  guardarActualizar(datos : any){
    this.infoSistemaService.guardar(datos).subscribe( (res : any) => {
      // console.log(res);
      this.mostrar();
    }, (error : any) => {
      console.log(error);
    })
  }
}
