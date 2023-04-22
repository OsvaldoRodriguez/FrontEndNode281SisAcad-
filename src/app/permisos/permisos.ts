export const permisos = {
  obteniendoPermisosPadres(hijos: any) {
    // console.log('para obtener padres', hijos);
    // console.log('recorriendo el array');
    const miSet = new Set<any>();

    for (const prop in hijos) {
      if (Array.isArray(hijos[prop])) {
        for (let i = 0; i < hijos[prop].length; i++) {
          // console.log(`hijos[${prop}][${i}] = ${hijos[prop][i]}`);
          miSet.add(hijos[prop][i]);
        }
      } else {
        //   console.log(`hijos[${prop}] = ${hijos[prop]}`);
      }
    }

    // console.log("mi set", miSet);
    let respuesta: string[] = [...miSet];
    // console.log("respuesta final vector", respuesta)
    return respuesta;
  },
  permisosHijos: {
    sistema: {
      informacion: ['Administrador'],
      perfil : ['Administrador', 'Control', 'Participante', 'Expositor']
    },
    eventos: {
      agregarEventos: ['Administrador'],
      material : ['Administrador', 'Expositor']
    },
    usuarios: {
      listarUsuarios: ['Administrador'], 
    },
    infraestructura: {
      asignar_ambiente: ['Administrador', 'Control'],
      crear_ambiente : ['Administrador', 'Control']
    },

    instituciones: {
      listar: ['Administrador'],
    },

    auditoria: {
      auditoria: ['Administrador'],
    },
  },
};
