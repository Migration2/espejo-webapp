import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';


//maps
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

// componente principal
import {AppComponent} from './app.component';

// datatables
import {DataTablesModule} from 'angular-datatables';

//highchart
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

// componentes opciones
import {NavbarComponent} from './components/assets/navbar/navbar.component';
import {FooterComponent} from './components/assets/footer/footer.component';
import {AdministrarUsuariosComponent} from './components/menu-options/administrar-usuarios/administrar-usuarios.component';
import {AdministrarEmpleadosComponent} from './components/menu-options/administrar-empleados/administrar-empleados.component';
import {AdministrarEstacionesComponent} from './components/menu-options/administrar-estaciones/administrar-estaciones.component';
import {AdministrarBicicletasComponent} from './components/menu-options/administrar-bicicletas/administrar-bicicletas.component';
import {AdministrarSancionesComponent} from './components/menu-options/administrar-sanciones/administrar-sanciones.component';
import {AdministrarMantenimientoComponent} from './components/menu-options/administrar-mantenimiento/administrar-mantenimiento.component';
import {AdministrarInformacionGeneralComponent} from './components/menu-options/administrar-informacion-general/administrar-informacion-general.component';
import {HistoricosComponent} from './components/menu-options/historicos/historicos.component';
import {HomeComponent} from './components/menu-options/home/home.component';
import { SancionesComponent } from './components/menu-options/sanciones/sanciones.component';

// componentes de detalle
import {UsuarioComponent} from './components/detail-options/usuario/usuario.component';
import {BicicletaComponent} from './components/detail-options/bicicleta/bicicleta.component';
import {EmpleadoComponent} from './components/detail-options/empleado/empleado.component';
import {EstacionComponent} from './components/detail-options/estacion/estacion.component';
import {MantenimientoComponent} from './components/detail-options/mantenimiento/mantenimiento.component';
import {PuntoAnclajeComponent} from './components/detail-options/punto-anclaje/punto-anclaje.component';
import {SancionComponent} from './components/detail-options/sancion/sancion.component';
import { AsignarTarjetaComponent } from './components/assets/asignar-tarjeta/asignar-tarjeta.component';


// rutas
import {APP_ROUTING} from './app.routes';

//pipes
import { UserName } from './pipes/user-name.pipe';
import { RolPipe } from './pipes/rol.pipe';
import { ObservacionesMantenimientoPipe } from './pipes/observaciones-mantenimiento.pipe';

//rutas Cliente
import { ClientNavbarComponent } from './components/assets/client-navbar/client-navbar.component';
import { HomeClienteComponent } from './components/cliente/home-cliente/home-cliente.component';
import { EstadisticasClienteComponent } from './components/cliente/estadisticas-cliente/estadisticas-cliente.component';

//cargando y error
import { PaginaNoEncontradaComponent } from './components/assets/pagina-no-encontrada/pagina-no-encontrada.component';







@NgModule({
    declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AdministrarUsuariosComponent,
    AdministrarEmpleadosComponent,
    AdministrarEstacionesComponent,
    AdministrarBicicletasComponent,
    AdministrarSancionesComponent,
    AdministrarMantenimientoComponent,
    AdministrarInformacionGeneralComponent,
    HistoricosComponent,
    HomeComponent,
    UsuarioComponent,
    BicicletaComponent,
    EmpleadoComponent,
    EstacionComponent,
    MantenimientoComponent,
    PuntoAnclajeComponent,
    SancionComponent,
    UserName,
    ClientNavbarComponent,
    HomeClienteComponent,
    EstadisticasClienteComponent,
    PaginaNoEncontradaComponent,
    RolPipe,
    AsignarTarjetaComponent,
    ObservacionesMantenimientoPipe,
    SancionesComponent
    ],
    imports: [
    BrowserModule,
    DataTablesModule,
    APP_ROUTING,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyBrf3wDF0sR5UJfUo_us3Ul8n6QQ7YBPYY'
    }),
    AgmSnazzyInfoWindowModule,
    ChartModule
    ],
    providers: [
    {
        provide: HighchartsStatic,
        useFactory: highchartsFactory
    }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}


export function highchartsFactory() {
    const hc = require('highcharts/highstock');
    const dd = require('highcharts/modules/exporting');
    dd(hc);
    return hc;
}