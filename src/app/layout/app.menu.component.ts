import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../core/services/auth.service';
import { permisos } from './../permisos/permisos';
import { permisosPadres } from './../permisos/permisosPadres';
@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Información Del Sistema',
        visible: this.tienePermisos(permisosPadres.permisos.sistema)
          ? true
          : false,
        items: [
          {
            visible: this.tienePermisos(
              permisos.permisosHijos.sistema.informacion
            ),
            label: 'Informacion',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/admin/sistema/informacion'],
          },
          {
            visible: this.tienePermisos(permisos.permisosHijos.sistema.perfil),

            label: 'Perfil',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/admin/sistema/perfil'],
          },
        ],
      },
      {
        label: 'GESTIONAR EVENTOS',
        // en el array hay que poner los mismos permisos del guard
        visible: this.tienePermisos(permisosPadres.permisos.eventos)
          ? true
          : false,
        items: [
          {
            label: 'Eventos',
            visible: this.tienePermisos(
              permisos.permisosHijos.eventos.agregarEventos
            )
              ? true
              : false,
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/admin/eventos/mostrar'],
          },
          {
            label: 'Material',
            visible: this.tienePermisos(
              permisos.permisosHijos.eventos.material
            )
              ? true
              : false,
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/admin/eventos/material'],
          },
        ],
      },
      {
        label: 'GESTIONAR USUARIOS',

        visible: this.tienePermisos(permisosPadres.permisos.usuarios)
          ? true
          : false,
        items: [
          {
            label: 'Listar Usuarios',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/admin/usuarios/listar-usuario'],
          },
          {
            label: 'Listar Persona',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/admin/usuarios/persona'],
          },
        ],
      },
      {
        label: 'Infraestructura',

        visible: this.tienePermisos(permisosPadres.permisos.infraestructura)
          ? true
          : false,
        items: [
          {
            label: 'Asignar Ambientes',
            icon: 'pi pi-fw pi-prime',
            routerLink: ['/admin/infraestructura/ambiente'],
          },
          {
            label: 'Crear Ambientes',
            icon: 'pi pi-fw pi-prime',
            routerLink: ['/admin/infraestructura/crear-ambiente'],
          },
        ],
      },
      {
        label: 'Instituciones',

        visible: this.tienePermisos(permisosPadres.permisos.instituciones)
          ? true
          : false,
        items: [
          {
            label: 'Listar',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/admin/instituciones/listar'],
          },
          // { label: 'Guardar', icon: 'pi pi-fw pi-home', routerLink: ['/admin/instituciones/guardar-editar'] },
        ],
      },
      {
        label: 'GESTIONAR AUDITORIA',

        visible: this.tienePermisos(permisosPadres.permisos.auditoria)
          ? true
          : false,
        items: [
          {
            label: 'Auditoria',
            icon: 'pi pi-fw pi-prime',
            routerLink: ['/admin/auditoria/auditorias'],
          },
        ],
      },

      // {
      //     label: 'Auditoria',
      //     icon: 'pi pi-fw pi-briefcase',
      //     items: [
      //         {
      //             label: 'Landing',
      //             icon: 'pi pi-fw pi-globe',
      //             routerLink: ['/landing']
      //         },
      //         {
      //             label: 'Auth',
      //             icon: 'pi pi-fw pi-user',
      //             items: [
      //                 {
      //                     label: 'Login',
      //                     icon: 'pi pi-fw pi-sign-in',
      //                     routerLink: ['/auth/login']
      //                 },
      //                 {
      //                     label: 'Error',
      //                     icon: 'pi pi-fw pi-times-circle',
      //                     routerLink: ['/auth/error']
      //                 },
      //                 {
      //                     label: 'Access Denied',
      //                     icon: 'pi pi-fw pi-lock',
      //                     routerLink: ['/auth/access']
      //                 }
      //             ]
      //         },
      //         {
      //             label: 'Crud',
      //             icon: 'pi pi-fw pi-pencil',
      //             routerLink: ['/pages/crud']
      //         },
      //         {
      //             label: 'Timeline',
      //             icon: 'pi pi-fw pi-calendar',
      //             routerLink: ['/pages/timeline']
      //         },
      //         {
      //             label: 'Not Found',
      //             icon: 'pi pi-fw pi-exclamation-circle',
      //             routerLink: ['/notfound']
      //         },
      //         {
      //             label: 'Empty',
      //             icon: 'pi pi-fw pi-circle-off',
      //             routerLink: ['/pages/empty']
      //         },
      //     ]
      // },
      // {
      //     label: 'Hierarchy',
      //     items: [
      //         {
      //             label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
      //             items: [
      //                 {
      //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
      //                     items: [
      //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
      //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
      //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
      //                     ]
      //                 },
      //                 {
      //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
      //                     items: [
      //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
      //                     ]
      //                 },
      //             ]
      //         },
      //         {
      //             label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
      //             items: [
      //                 {
      //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
      //                     items: [
      //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
      //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
      //                     ]
      //                 },
      //                 {
      //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
      //                     items: [
      //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
      //                     ]
      //                 },
      //             ]
      //         }
      //     ]
      // },
      // {
      //     label: 'Get Started',
      //     items: [
      //         {
      //             label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
      //         },
      //         {
      //             label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
      //         }
      //     ]
      // }
    ];
  }

  tienePermisos(permisos: string[]): boolean {
    let permisos_permitidos = permisos;
    const usuario_actual: string[] = this.authService.getRol();
    return permisos_permitidos.some((r: string) => usuario_actual.includes(r));
  }
}
