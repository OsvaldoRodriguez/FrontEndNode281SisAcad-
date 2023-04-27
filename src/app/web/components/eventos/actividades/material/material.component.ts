import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ActividadEventoService } from 'src/app/core/services/actividad-evento.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { ExpositoresService } from 'src/app/core/services/expositores.service';
@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent {

  datosDelPadre: any = null;
  datosDelPadreActualizados = new Subject<any>();
  constructor(
    private authService: AuthService,
    private route: Router,
    private router: ActivatedRoute,
    private actividadEventoService: ActividadEventoService,
    private categoriaService: CategoriasService,
    private expositoresService: ExpositoresService
  ) {}
  ngOnInit(){
    this.router.paramMap.subscribe((params) => {
      this.datosDelPadre = params.get('datosParaEnviarOtro');
      this.datosDelPadreActualizados.next(this.datosDelPadre);
    });
  }
}
