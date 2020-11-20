import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material components
import { MatButtonModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatPaginatorIntl, MatInputModule } from '@angular/material';

//websocket
import { StompService } from 'ng2-stomp-service';

//maps
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

// componente principal
import { AppComponent } from './app.component';

// datatables
import { DataTablesModule } from 'angular-datatables';

// componentes opciones
import { NavbarComponent } from './components/assets/navbar/navbar.component';
import { FooterComponent } from './components/assets/footer/footer.component';
import { AdministrarUsuariosComponent } from './components/menu-options/administrar-usuarios/administrar-usuarios.component';
import { AdministrarEmpleadosComponent } from './components/menu-options/administrar-empleados/administrar-empleados.component';
import { AdministrarEstacionesComponent } from './components/menu-options/administrar-estaciones/administrar-estaciones.component';
import { AdministrarBicicletasComponent } from './components/menu-options/administrar-bicicletas/administrar-bicicletas.component';
import { AdministrarSancionesComponent } from './components/menu-options/administrar-sanciones/administrar-sanciones.component';
import { AdministrarMantenimientoComponent } from './components/menu-options/administrar-mantenimiento/administrar-mantenimiento.component';
import { AdministrarInformacionGeneralComponent } from './components/menu-options/administrar-informacion-general/administrar-informacion-general.component';
import { HistoricosComponent } from './components/menu-options/historicos/historicos.component';
import { HomeComponent } from './components/menu-options/home/home.component';
import { SancionesComponent } from './components/menu-options/sanciones/sanciones.component';
import { OperacionComponent } from './components/menu-options/operacion/operacion.component';

// componentes de detalle
import { UsuarioComponent } from './components/detail-options/usuario/usuario.component';
import { BicicletaComponent } from './components/detail-options/bicicleta/bicicleta.component';
import { EmpleadoComponent } from './components/detail-options/empleado/empleado.component';
import { EstacionComponent } from './components/detail-options/estacion/estacion.component';
import { MantenimientoComponent } from './components/detail-options/mantenimiento/mantenimiento.component';
import { AsignarTarjetaComponent } from './components/assets/asignar-tarjeta/asignar-tarjeta.component';


// rutas
import { APP_ROUTING } from './app.routes';

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

//charts
import { ChartsModule } from 'ng2-charts';
import { PaginatePipe } from './pipes/paginate.pipe';
import { CustomMatPaginatorIntl } from './paginator-es';
import { BikesLabelPipe } from './pipes/bikes-label.pipe';
import { HttpClientModule } from '@angular/common/http';
import { StationsTableComponent } from './components/menu-options/administrar-estaciones/station-table/stations-table.component';
import { GeneralTransactionsChartComponent } from './components/charts/general-transactions-chart/general-transactions-chart.component';
import { TransactionsPerStationChartComponent } from './components/charts/transactions-per-station-chart/transactions-per-station-chart.component';
import { SanctionTableComponent } from './components/tables/sanction-table/sanction-table.component';
import { AvailableBikesTableComponent } from './components/tables/available-bikes-table/available-bikes-table.component';
import { AdminSanctionTableComponent } from './components/tables/admin-sanction-table/admin-sanction-table.component';
import { StationsMapComponent } from './components/maps/stations-map/stations-map.component';





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
        UserName,
        ClientNavbarComponent,
        HomeClienteComponent,
        EstadisticasClienteComponent,
        PaginaNoEncontradaComponent,
        RolPipe,
        AsignarTarjetaComponent,
        ObservacionesMantenimientoPipe,
        SancionesComponent,
        OperacionComponent,
        PaginatePipe,
        BikesLabelPipe,
        StationsTableComponent,
        GeneralTransactionsChartComponent,
        TransactionsPerStationChartComponent,
        SanctionTableComponent,
        AvailableBikesTableComponent,
        AdminSanctionTableComponent,
        StationsMapComponent
    ],
    imports: [
        BrowserModule,
        DataTablesModule,
        APP_ROUTING,
        ChartsModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        HttpClientModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAzqNYs1MtHoGDvy8RYyjgCQSxiTyn8ONM'
        }),
        AgmSnazzyInfoWindowModule
    ],
    exports: [
        MatTableModule
    ],
    providers: [
        StompService,
        {provide : MatPaginatorIntl, useClass: CustomMatPaginatorIntl}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}