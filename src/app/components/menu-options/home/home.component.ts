import { Component, OnInit, ViewChild } from '@angular/core';
import { EstacionService } from '../../../services/estacion.service';
import { Router } from '@angular/router';
import { EstadisticasService } from '../../../services/estadisticas.service';
import { EstacionModel } from '../../../models/estacion.model';
import { StompService } from 'ng2-stomp-service';
import { DataTableDirective } from 'angular-datatables';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [EstacionService, EstadisticasService]
})
export class HomeComponent implements OnInit {
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    title = 'Estaciones BiciRío';
    Centerlat = 6.142979;
    Centerlng = -75.378276;
    datosEstaciones: Array<EstacionModel> = [];
    stationDataForView: Array<EstacionModel> = [];

    dtOptionsTransacciones: any = {};

    private subscription: any;
    private subscriptionEstaciones: any;
    respuestas: Array<any> = [];
    public pieLabelsBicicletas: string[] = [];
    public pieDataBicicletas: number[] = [];
    mostrar = false;
    fechaActual = new Date();
    fechaAnterior = new Date();
    transacciones = [];
    // General Pie
    public pieChartType = 'doughnut';
    public pieChartTooltips: any = {
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    const allData = data.datasets[tooltipItem.datasetIndex].data;
                    const tooltipLabel = data.labels[tooltipItem.index];
                    const tooltipData = allData[tooltipItem.index];
                    let total = 0;
                    for (const i in allData) {
                        if (allData.hasOwnProperty(i)) {
                            total += allData[i];
                        }
                    }
                    const tooltipPercentage = Math.round((tooltipData / total) * 100);
                    return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
                }
            }
        }
    };

    constructor(private estacionservice: EstacionService, public stomp: StompService,
        private estadisticasService: EstadisticasService, private router: Router) {
    }


    // update bicicletas con websocket
    public bicicletas = (response) => {
        const data = [];
        for (let i = Object.values(response).length - 1; i >= 0; i--) {
            if (Object.keys(response)[i] !== 'total' && Object.values(response)[i] > 0) {
                data.push(Object.values(response)[i]);
            }
        }
        this.pieDataBicicletas = data;
    }

    // update estaciones con websocket
    estaciones = (response) => {
        this.datosEstaciones = response;
    }



    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy() {
        try {
            // unsubscribe
            this.subscription.unsubscribe();
            this.subscriptionEstaciones.unsubscribe();

            // disconnect
            this.stomp.disconnect().then(() => {
            });
        } catch (error) {

        }
    }


    ngOnInit() {
        this.fechaAnterior.setDate(this.fechaActual.getDate() - 4);
        this.fechaActual.setHours(this.fechaActual.getHours() - 5);
        this.loadStationsData();

        this.stomp.configure({
            host: 'http://bici-rio.com:4547/bicirio-websocket', // produccion
            // host: 'https://orion-bike.com:4443/bicirio-websocket',//pruebas
            // host: '/websocket/bicirio-websocket',
            debug: false,
            queue: { 'init': false, 'user': true }
        });

        this.stomp.startConnect().then(() => { // susbscripcion a topicos de websocket
            this.stomp.done('init');
            this.subscription = this.stomp.subscribe('/topic/bikes', this.bicicletas);
            this.subscriptionEstaciones = this.stomp.subscribe('/topic/stationDetail', this.estaciones);
        });

        this.estadisticasService.getTransacciones(this.fechaAnterior.toISOString().substring(0, 10),
            this.fechaActual.toISOString().substring(0, 10)).subscribe(res => {
                this.transacciones = res;
            });
        
        this.loadBikesData();
    }

    loadStationsData(){
        this.estacionservice.getEstaciones().subscribe(
            response => {
            this.datosEstaciones = response;
            this.mostrar = true;
        }, 
        error => {
            console.error("Error to retrieve data from server");
        });
    }

    /**
     * consumiento recursos para obtener estado inicial bicicletas
     */
    loadBikesData(){
        this.estadisticasService.getEstadisticasBicicletas().subscribe(response => {
            this.estadisticasBicicletas(response);
        });
    }

    /**
     *  función que recupera estado inicial de las bicicletas
     */
    estadisticasBicicletas(response) {
        const labels = [];
        const data = [];
        for (let i = Object.values(response).length - 1; i >= 0; i--) {
            if (Object.keys(response)[i] !== 'total' && Object.values(response)[i] > 0) {
                labels.push(Object.keys(response)[i]);
                data.push(Object.values(response)[i]);
            }
        }
        this.pieLabelsBicicletas = labels;
        this.pieDataBicicletas = data;
    }
}
