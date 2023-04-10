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


#para los eventos
ng g m admin/components/eventos
# ahora para editar-guardar
ng g m admin/components/evento-mostrar/add-edit-evento
ng g c admin/components/evento-mostrar/add-edit-evento


# para crear un sercvivio
ng g s core/services/evento
```







