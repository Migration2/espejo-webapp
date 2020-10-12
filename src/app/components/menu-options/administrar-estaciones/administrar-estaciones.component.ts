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

    constructor(private estacionservice: EstacionService, private router: Router, private estadisticasService: EstadisticasService) { }

    ngOnInit() {
        const bonotes = [
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
        this.dtOptions = {
            responsive: true
        };
        this.dtOptionsTransacciones = {
            responsive: true,
            // Declare the use of the extension in the dom parameter
            dom: 'Bfrtip',
            buttons: bonotes
        };
        this.fechaAnterior.setDate(this.fechaActual.getDate() - 5);
        this.fechaActual.setHours(this.fechaActual.getHours() - 5);
        this.estacionservice.getEstaciones().subscribe(response => {
            this.datosEstaciones = response;
            this.dtTrigger.next();
            this.mostrar = true;
        });

        this.loadTransactionStatisticsData(this.fechaAnterior.toISOString().substring(0, 10), this.fechaActual.toISOString().substring(0, 10))
    }

    informacionEstacion(id: number) {
        this.router.navigate(['estacion', id]);
    }


    recuperarHistorial(anterior, actual) {
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
            this.contarDatos(res);
            this.dtTriggerTransacciones.next();
        });
    }



    private contarDatos(transacciones) {
        const fecha: Array<object> = [];
        const datos: Array<object> = [];
        let bandera = false;
        const fechas = [];
        for (let i = 0; i < transacciones.length; i++) { // obteniendo fechas
            bandera = false;
            for (const x in fecha) {
                if (transacciones[i].loanDate.toString().substring(0, 10) === fecha[x]) {
                    bandera = true;
                }
            }
            if (bandera === false) {
                const a = transacciones[i].loanDate.toString().substring(0, 10);
                fecha.push(a);
            }
        }
        for (let j = 0; j < fecha.length; j++) {
            fechas[j] = 0;
        }

        for (const i in transacciones) { // obteniendo transaciones por dia
            if (transacciones.hasOwnProperty(i)) {
                for (let j = 0; j < fecha.length; j++) {
                    if (transacciones[i].loanDate.toString().substring(0, 10) === fecha[j]) {
                        const sss = fechas[j];
                        fechas[j] = parseInt(sss, 10) + 1;
                    }
                }
            }
        }
        datos.push({ 'data': fechas, 'label': 'Prestamos' });
        this.lineChartData = datos;
        this.lineChartLabels = fecha;
    }
}
