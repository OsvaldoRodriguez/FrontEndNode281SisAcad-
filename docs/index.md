## Código de la estructura

```Bash
ng g m web --routing
ng g m auth --routing
ng g m admin --routing

ng g c web/components/inicio
ng g c web/components/eventos
ng g c web/components/acerca_de


ng g c auth/components/login
ng g c auth/components/logout
ng g c auth/components/registro

#modulo  sistema
ng g m admin/components/sistema --routing
ng g c admin/components/sistema/informacion
ng g c admin/components/sistema/perfil

#modulo instituciones
ng g m admin/components/instituciones
ng g c admin/components/instituciones/listar
ng g c admin/components/instituciones/guardar-editar

#modulo infraestructura
ng g m admin/components/infraestructura --routing
ng g c admin/components/infraestructura/ambiente
ng g c admin/components/infraestructura/ambiente/recursos
ng g c admin/components/infraestructura/ambiente/actividades
ng g c admin/components/infraestructura/crear-ambiente
ng g c admin/components/infraestructura/crear-ambiente/lista-ambientes
ng g c admin/components/infraestructura/crear-ambiente/lista-ambientes/lista-recursos


#modulo auditoria
ng g m admin/components/auditoria --routing
ng g c admin/components/auditoria/auditorias


#modulo auditoria
ng g m admin/components/auditoria --routing
ng g c admin/components/auditoria/auditorias

#para los eventos y actividades
ng g m admin/components/eventos
ng g c admin/components/eventos/material
ng g c admin/components/eventos/mostrar
ng g c admin/components/eventos/actividades

# para usuarios
ng g m admin/components/usuarios --routing
ng g c admin/components/usuarios/listar
ng g c admin/components/usuarios/persona


# para crear un sercvivio
ng g s core/services/evento


```


# necesitamos en eventos (expositor)
* material (eventos)

# infraestructura (control)
* Crear Ambiente y recursos (Institucion) -> porque adicionara infraestructura por institucion  (OK)
* asignar ambientes a los eventos (infraestructura) (OK)
* inscripciones y reservas (eventos) (participante y control)
* asistencia (eventos)
* certificados (eventos)




# participante  
* Navegacion por los eventos
* comentarios
* Descargar material




(esto es la pagina, no en el dashboard)
# participante
* ingreso s tipos de eventos
* comentar 
* Descargar Material








###################################################333


CATEGOGIRA
1 Tutoriales	
2 Conferencias
3 Mesas Redondas
4 Presentación de proyectos de Investigación


ROLS
1 Administrador
2 Control
3 Participante
4 Expositor