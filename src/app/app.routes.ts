import {RouterModule, Routes} from '@angular/router';

// menu-options
import {AdministrarBicicletasComponent} from './components/menu-options/administrar-bicicletas/administrar-bicicletas.component';
import {AdministrarEmpleadosComponent} from './components/menu-options/administrar-empleados/administrar-empleados.component';
import {AdministrarEstacionesComponent} from './components/menu-options/administrar-estaciones/administrar-estaciones.component';
import {AdministrarInformacionGeneralComponent} from './components/menu-options/administrar-informacion-general/administrar-informacion-general.component';
import {AdministrarMantenimientoComponent} from './components/menu-options/administrar-mantenimiento/administrar-mantenimiento.component';
import {AdministrarSancionesComponent} from './components/menu-options/administrar-sanciones/administrar-sanciones.component';
import {AdministrarUsuariosComponent} from './components/menu-options/administrar-usuarios/administrar-usuarios.component';
import {HistoricosComponent} from './components/menu-options/historicos/historicos.component';
import {HomeComponent} from './components/menu-options/home/home.component';
import {SancionesComponent} from './components/menu-options/sanciones/sanciones.component'

// componentes de detalle
import {UsuarioComponent} from './components/detail-options/usuario/usuario.component';
import {BicicletaComponent} from './components/detail-options/bicicleta/bicicleta.component';
import {EmpleadoComponent} from './components/detail-options/empleado/empleado.component';
import {EstacionComponent} from './components/detail-options/estacion/estacion.component';
import {MantenimientoComponent} from './components/detail-options/mantenimiento/mantenimiento.component';
import {PuntoAnclajeComponent} from './components/detail-options/punto-anclaje/punto-anclaje.component';


//cliente
import { HomeClienteComponent } from './components/cliente/home-cliente/home-cliente.component';
import { EstadisticasClienteComponent } from './components/cliente/estadisticas-cliente/estadisticas-cliente.component';

//pagina no encontrada
import { PaginaNoEncontradaComponent } from './components/assets/pagina-no-encontrada/pagina-no-encontrada.component';


const APP_ROUTES: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'administrarBicicletas', component: AdministrarBicicletasComponent},
  {path: 'administrarEmpleados', component: AdministrarEmpleadosComponent},
  {path: 'administrarEstaciones', component: AdministrarEstacionesComponent},
  {path: 'administrarInformacionGeneral', component: AdministrarInformacionGeneralComponent},
  {path: 'administrarMantenimiento', component: AdministrarMantenimientoComponent},
  {path: 'administrarSanciones', component: AdministrarSancionesComponent},
  {path: 'administrarUsuarios', component: AdministrarUsuariosComponent},
  {path: 'historicos', component: HistoricosComponent},
  {path: 'sanciones', component: SancionesComponent},
  {path: 'usuario/:id', component: UsuarioComponent},
  {path: 'bicicleta/:id', component: BicicletaComponent},
  {path: 'empleado/:id', component: EmpleadoComponent},
  {path: 'estacion/:id', component: EstacionComponent},
  {path: 'mantenimiento/:id', component: MantenimientoComponent},
  {path: 'puntoAnclaje/:id', component: PuntoAnclajeComponent},
  {path: 'cliente/home', component: HomeClienteComponent},
  {path: 'cliente/estadisticas', component: EstadisticasClienteComponent},
  {path: 'error', component: PaginaNoEncontradaComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'error'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
