import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { EstacionService } from '../../../services/estacion.service';
import { EstadisticasService } from '../../../services/estadisticas.service';
import { EstacionModel } from '../../../models/estacion.model';
import { DataTableDirective } from 'angular-datatables';


@Component({
    selector: 'app-administrar-estaciones',
    templateUrl: './administrar-estaciones.component.html',
    styleUrls: ['./administrar-estaciones.component.scss'],
    providers: [EstacionService, EstadisticasService]
})
export class AdministrarEstacionesComponent implements OnInit {
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    datosEstaciones: Array<EstacionModel> = [];
    dtTrigger = new Subject();
    dtOptions: any = {};
    mostrar = false;
    fechaActual = new Date();
    fechaAnterior = new Date();
    transacciones = [];
    dtTriggerTransacciones = new Subject();
    dtOptionsTransacciones: any = {};
    activo = 'estado';
    // line chart
    public lineChartData: Array<any> = [];
    public lineChartLabels: Array<any> = [];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartLegend = true;
    public lineChartType = 'line';

    constructor(private estacionservice: EstacionService, private router: Router, private estadisticasService: EstadisticasService) {
        const bonotes = this.getReportButtons();
        this.dtOptions = {
            responsive: true
        };
        this.dtOptionsTransacciones = {
            responsive: true,
            language: {
                url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
            },
            // Declare the use of the extension in the dom parameter
            dom: 'Bfrtip',
            buttons: bonotes
        };
        this.fechaAnterior.setDate(this.fechaActual.getDate() - 5);
        this.fechaActual.setHours(this.fechaActual.getHours() - 5);
        this.estacionservice.getStationsData().subscribe(response => {
            this.datosEstaciones = response;
            this.dtTrigger.next();
        });

        this.loadTransactionStatisticsData(this.fechaAnterior.toISOString().substring(0, 10), this.fechaActual.toISOString().substring(0, 10));
     }

    ngOnInit() {
        
    }

    private getReportButtons():any[]{
        return [
            {
                extend: 'copy',
                text: 'Copiar',
                messageBottom: 'Desarrollado por Dev-Codes e Inter-Telco'
            },
            {
                extend: 'print',
                text: 'Imprimir',
                messageBottom: 'Desarrollado por Dev-Codes e Inter-Telco'
            },
            {
                extend: 'csv',
                text: 'Exportar',
                messageBottom: 'Desarrollado por Dev-Codes e Inter-Telco'
            }
        ];
    }

    informacionEstacion(id: number) {
        this.router.navigate(['estacion', id]);
    }


    recuperarHistorial(anterior, actual) {
        this.transacciones = [];
        this.lineChartLabels = [];
        this.lineChartData = [{ data: [] }];
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.table(document.getElementById('tablaTransacciones')).clear();
            dtInstance.table(document.getElementById('tablaTransacciones')).destroy();
            // Call the dtTrigger to rerender again
            this.loadTransactionStatisticsData(anterior, actual);
        });
    }

    loadTransactionStatisticsData(anterior, actual){
        this.estadisticasService.getTransacciones(anterior, actual).subscribe(res => {
            this.transacciones = res;
            // this.contarDatos(res);
            this.dtTriggerTransacciones.next();
            this.mostrar = true;
        });
    }
}
