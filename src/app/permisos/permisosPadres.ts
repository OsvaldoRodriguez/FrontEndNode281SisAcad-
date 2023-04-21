import {permisos} from './../permisos/permisos'
export const permisosPadres = {
  permisos: {
    sistema: permisos.obteniendoPermisosPadres(permisos.permisosHijos.sistema),
    eventos: permisos.obteniendoPermisosPadres(permisos.permisosHijos.eventos),
    usuarios: permisos.obteniendoPermisosPadres(permisos.permisosHijos.usuarios),
    infraestructura: permisos.obteniendoPermisosPadres(permisos.permisosHijos.infraestructura),
    instituciones: permisos.obteniendoPermisosPadres(permisos.permisosHijos.instituciones),
    auditoria: permisos.obteniendoPermisosPadres(permisos.permisosHijos.auditoria),
  },
};
