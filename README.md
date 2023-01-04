# Webapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Como correr
1) Recuerde subir el proyecto java de spring que estara escuchando el el puerto
2) Suba el proyecto angular npm start
3) Ingrese a la url del proyecto de angular y fijese en la parte superior derecha que aparece que le mostrar que el usuario es anonimo
4) digite: http://localhost:4444 y el Server lo redireccionara al servidor de oauth2 que esta en la web, y le pedira usuario y contraseña user: admin pass: 12345
5) Si se loguea correctamente, vaya a la pestaña del proyecto de angular y de f5, mire que ya no aparece anonimo, sino el usuario que usted acaba de loguear.
Esto es gracias a que las cookies son al nivel de dominio. entonces como angular y java tienen el mismo dominio que es localhost pueden compartir la session.

Tenga en cuenta:

Si yo fuera usted no trabajaria con Datatables, eso es una mierda que lo ponen a uno a voltiar como un putas y son feas.
Le dejo una url con los componentes de la gente de google por si quiere trabajar relajado:

https://material.angular.io/components/categories

Tambien le dejo la url flex para la parte de responsive

https://github.com/angular/flex-layout

Esos dos son mantenidos por google.




 
