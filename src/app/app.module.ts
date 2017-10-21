import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

// componente principal
import {AppComponent} from './app.component';

// datatables
import {DataTablesModule} from 'angular-datatables';


// componentes opciones
import {NavbarComponent} from './components/assets/navbar/navbar.component';
import {FooterComponent} from './components/assets/footer/footer.component';
import {AdministrarUsuariosComponent} from './components/menu-options/administrar-usuarios/administrar-usuarios.component';
import {AdministrarEmpleadosComponent} from './components/menu-options/administrar-empleados/administrar-empleados.component';
import {AdministrarTotemComponent} from './components/menu-options/administrar-totem/administrar-totem.component';
import {AdministrarEstacionComponent} from './components/menu-options/administrar-estacion/administrar-estacion.component';
import {AdministrarPuntosAnclajeComponent} from './components/menu-options/administrar-puntos-anclaje/administrar-puntos-anclaje.component';
import {AdministrarBicicletasComponent} from './components/menu-options/administrar-bicicletas/administrar-bicicletas.component';
import {AdministrarSancionesComponent} from './components/menu-options/administrar-sanciones/administrar-sanciones.component';
import {AdministrarMantenimientoComponent} from './components/menu-options/administrar-mantenimiento/administrar-mantenimiento.component';
import {AdministrarInformacionGeneralComponent} from './components/menu-options/administrar-informacion-general/administrar-informacion-general.component';
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


// rutas
import {APP_ROUTING} from './app.routes';
import {AgregarBicicletaComponent} from './components/forms/agregar-bicicleta/agregar-bicicleta.component';
import {AgregarEstacionComponent} from './components/forms/agregar-estacion/agregar-estacion.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AdministrarUsuariosComponent,
    AdministrarEmpleadosComponent,
    AdministrarTotemComponent,
    AdministrarEstacionComponent,
    AdministrarPuntosAnclajeComponent,
    AdministrarBicicletasComponent,
    AdministrarSancionesComponent,
    AdministrarMantenimientoComponent,
    AdministrarInformacionGeneralComponent,
    HistoricosComponent,
    PromediosComponent,
    HomeComponent,
    UsuarioComponent,
    BicicletaComponent,
    EmpleadoComponent,
    EstacionComponent,
    MantenimientoComponent,
    PuntoAnclajeComponent,
    SancionComponent,
    TotemComponent,
    AgregarBicicletaComponent,
    AgregarEstacionComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    APP_ROUTING,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
