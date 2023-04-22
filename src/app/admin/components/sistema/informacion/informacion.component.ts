import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import {permisos} from './../../../../permisos/permisos'
import {permisosPadres} from './../../../../permisos/permisosPadres'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InfosistemaService } from 'src/app/core/services/infosistema.service';
import { MessageService } from 'primeng/api';
import {direccion} from './../../../../direccionArchivos/direcciones'
@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent {

  datosSistema : any [] = []


  displayModalImage: boolean = false;
  uploadedFiles: any[] = [];
  datosImagen : any
  url_imagen : any

  constructor(private infoSistemaService: InfosistemaService, private messageService : MessageService){
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
      this.url_imagen = direccion.infosSitema + this.datosSistema[0].logo
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

  //imagenes
  showModalDialogImage(datosImagen: any) {
    this.datosImagen = { ...datosImagen }; //recuperando evento (solo el seleccionado)
    this.displayModalImage = true;
  }

  myUploader(event?: any) {
    //event.files == files to upload
    console.log(event.files);
    // hasta ahora ya se tiene la imagen en memoria
    // subiedno por formularios de data
    let formData = new FormData();
    formData.append('imagen', event.files[0]); // porque solo es una imagen

    this.infoSistemaService.actualizarImagen(this.datosImagen.id, formData).subscribe(
      (res: any) => {
        this.displayModalImage = false;
        this.messageService.add({
          severity: 'info',
          summary: 'Imagen Actualizada',
          detail: '',
        });
      },
      (error: any) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Error al Actualizar Imagen',
          detail: '',
        });
      }
    );
  }
}
