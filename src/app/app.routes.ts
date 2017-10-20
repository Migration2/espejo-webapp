import {RouterModule, Routes} from '@angular/router';

// menu-options
import {AdministrarBicicletasComponent} from './components/menu-options/administrar-bicicletas/administrar-bicicletas.component';
import {AdministrarEmpleadosComponent} from './components/menu-options/administrar-empleados/administrar-empleados.component';
import {AdministrarEstacionComponent} from './components/menu-options/administrar-estacion/administrar-estacion.component';
import {AdministrarInformacionGeneralComponent} from './components/menu-options/administrar-informacion-general/administrar-informacion-general.component';
import {AdministrarMantenimientoComponent} from './components/menu-options/administrar-mantenimiento/administrar-mantenimiento.component';
import {AdministrarPuntosAnclajeComponent} from './components/menu-options/administrar-puntos-anclaje/administrar-puntos-anclaje.component';
import {AdministrarSancionesComponent} from './components/menu-options/administrar-sanciones/administrar-sanciones.component';
import {AdministrarTotemComponent} from './components/menu-options/administrar-totem/administrar-totem.component';
import {AdministrarUsuariosComponent} from './components/menu-options/administrar-usuarios/administrar-usuarios.component';
import {HistoricosComponent} from './components/menu-options/historicos/historicos.component';
import {PromediosComponent} from './components/menu-options/promedios/promedios.component';
import {HomeComponent} from './components/menu-options/home/home.component';

// componentes de detalle
import {UsuarioComponent} from './components/detail-options/usuario/usuario.component';
import {BicicletaComponent} from './components/detail-options/bicicleta/bicicleta.component';
import {EmpleadoComponent} from './components/detail-options/empleado/empleado.component';
import {EstacionComponent} from './components/detail-options/estacion/estacion.component';
import {MantenimientoComponent} from './components/detail-options/mantenimiento/mantenimiento.component';
import {PuntoAnclajeComponent} from './components/detail-options/punto-anclaje/punto-anclaje.component';
import {SancionComponent} from './components/detail-options/sancion/sancion.component';
import {TotemComponent} from './components/detail-options/totem/totem.component';

const APP_ROUTES: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'administrarBicicletas', component: AdministrarBicicletasComponent},
  {path: 'administrarEmpleados', component: AdministrarEmpleadosComponent},
  {path: 'administrarEstacion', component: AdministrarEstacionComponent},
  {path: 'administrarInformacionGeneral', component: AdministrarInformacionGeneralComponent},
  {path: 'administrarMantenimiento', component: AdministrarMantenimientoComponent},
  {path: 'administrarPuntosAnclaje', component: AdministrarPuntosAnclajeComponent},
  {path: 'administrarSanciones', component: AdministrarSancionesComponent},
  {path: 'administrarTotem', component: AdministrarTotemComponent},
  {path: 'administrarUsuarios', component: AdministrarUsuariosComponent},
  {path: 'historicos', component: HistoricosComponent},
  {path: 'promedios', component: PromediosComponent},
  {path: 'usuario/:id', component: UsuarioComponent},
  {path: 'bicicleta/:id', component: BicicletaComponent},
  {path: 'empleado/:id', component: EmpleadoComponent},
  {path: 'estacion/:id', component: EstacionComponent},
  {path: 'mantenimiento/:id', component: MantenimientoComponent},
  {path: 'puntoAnclaje/:id', component: PuntoAnclajeComponent},
  {path: 'sancion/:id', component: SancionComponent},
  {path: 'totem/:id', component: TotemComponent},

  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
