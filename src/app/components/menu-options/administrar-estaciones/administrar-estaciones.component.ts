import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { DataTableDirective } from 'angular-datatables';
import { DatePipe } from '@angular/common';

import { EstacionService } from '../../../services/estacion.service';
import { EstadisticasService } from '../../../services/estadisticas.service';
import { EstacionModel, StationOperationTime } from '../../../models/estacion.model';



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

    //operationTime
    datePipe:DatePipe = new DatePipe('en-US');
    public stationOperationTime: StationOperationTime;
    // line chart
    public lineChartData: Array<any> = [];
    public lineChartLabels: Array<any> = [];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartLegend = true;
    public lineChartType = 'line';

    constructor(private estacionservice: EstacionService, private router: Router, private estadisticasService: EstadisticasService) {
        this.stationOperationTime = this.newInstanceStationOperationTime();
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
    
    public updateOperationData(){
        let actualDate:string = this.datePipe.transform(new Date(), "dd-MM-yyyy");
        let newStationOperationTime = this.newInstanceStationOperationTime();
        newStationOperationTime.code = this.stationOperationTime.code;
        newStationOperationTime.name = this.stationOperationTime.name;
        newStationOperationTime.startOp = `${actualDate} ${this.stationOperationTime.startOp}:00`;
        newStationOperationTime.loansOp = `${actualDate} ${this.stationOperationTime.loansOp}:00`;
        newStationOperationTime.returnOp = `${actualDate} ${this.stationOperationTime.returnOp}:00`;
        
        this.estacionservice.updateOperationTimeAllStations(newStationOperationTime).subscribe(response => {
            if(response.status == 202){
                console.log("updated operation time...");
            }
        }, 
        error => console.log(error));
    }

    private newInstanceStationOperationTime(): StationOperationTime {
        return { code: "", name: "", startOp: "", loansOp: "", returnOp: "" };
    }

    HOUR_DATA: Array<string> = [
        "00:00", "00:30",
        "01:00", "01:30",
        "02:00", "02:30",
        "03:00", "03:30",
        "04:00", "04:30",
        "05:00", "05:30",
        "06:00", "06:30",
        "07:00", "07:30",
        "08:00", "08:30",
        "09:00", "09:30",
        "10:00", "10:30",
        "11:00", "11:30",
        "12:00", "12:30",
        "13:00", "13:30",
        "14:00", "14:30",
        "15:00", "15:30",
        "16:00", "16:30",
        "17:00", "17:30",
        "18:00", "18:30",
        "19:00", "19:30",
        "10:00", "10:30",
        "21:00", "21:30",
        "22:00", "22:30",
        "23:00", "23:30",
    ];
}
