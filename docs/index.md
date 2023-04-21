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


#modulo auditoria
ng g m admin/components/auditoria --routing
ng g c admin/components/auditoria/auditorias


#modulo auditoria
ng g m admin/components/auditoria --routing
ng g c admin/components/auditoria/auditorias

#para los eventos y actividades
ng g m admin/components/eventos
ng g c admin/components/eventos/mostrar
ng g c admin/components/eventos/actividades


# para crear un sercvivio
ng g s core/services/evento
```


# necesitamos en eventos (expositor)
* material (eventos)

# infraestructura (control)
* Adicionar Ambiente
* asignar ambientes a los eventos (infraestructura)
* inscripciones y reservas (eventos) (participante y control)
* asistencia (eventos)
* certificados (eventos)

# participante  
* Navegacion por los eventos
* comentarios
* Descargar material




