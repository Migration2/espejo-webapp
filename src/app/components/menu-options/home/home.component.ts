import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StompService } from 'ng2-stomp-service';

import { EstadisticasService } from '../../../services/estadisticas.service';
import { StatisticsByPeriodModel } from '../../../models/statistics.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [EstadisticasService]
})
export class HomeComponent implements OnInit {

    title = 'Estaciones BiciCeja';
    Centerlat = 6.142979;
    Centerlng = -75.378276;

    private subscription: any;
    public pieLabelsBicicletas: string[] = [];
    public pieDataBicicletas: number[] = [];
    mostrar = false;
    fechaActual = new Date();
    fechaAnterior = new Date();
    transacciones = [];
    transactionsByPeriod:StatisticsByPeriodModel = new StatisticsByPeriodModel();
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

    constructor(public stomp: StompService,
        private estadisticasService: EstadisticasService, private router: Router) {
    }

    ngOnInit() {
        this.fechaAnterior.setDate(this.fechaActual.getDate() - 4);
        this.fechaActual.setHours(this.fechaActual.getHours() - 5);
        this.loadLoansStatisticStation();
        this.configureWebSocket();
        this.subscriptiosToWebSocket();
        this.loadBikesData();
        this.loadTransactionsData(this.fechaAnterior.toISOString().substring(0, 10), this.fechaActual.toISOString().substring(0, 10));
    }

    ngOnDestroy() {
        try {
            // unsubscribe
            this.subscription.unsubscribe();
            // disconnect
            this.stomp.disconnect().then(() => {});
        } catch (error) {
            console.error(`Error to retrive data from websocket ${error}`);
        }
    }

    private loadLoansStatisticStation() {
        this.estadisticasService.getStatisticsStations().subscribe(response => {
            this.transactionsByPeriod = response;
        }, error => console.error(error));
    }

    private configureWebSocket(){
        this.stomp.configure({
            host: 'http://bici-rio.com:4547/bicirio-websocket', // produccion
            // host: 'https://orion-bike.com:4443/bicirio-websocket',//pruebas
            // host: '/websocket/bicirio-websocket',
            debug: false,
            queue: { 'init': false, 'user': true }
        });
    }

    private subscriptiosToWebSocket(){
        this.stomp.startConnect().then(() => { // susbscripcion a topicos de websocket
            this.stomp.done('init');
            this.subscription = this.stomp.subscribe('/topic/bikes', this.updateBikes);
        });
    }

    /**
     * update bikes with websocket
     */
    public updateBikes = (response) => {
        const data = [];
        for (let i = Object.values(response).length - 1; i >= 0; i--) {
            if (Object.keys(response)[i] !== 'total' && Object.values(response)[i] > 0) {
                data.push(Object.values(response)[i]);
            }
        }
        this.pieDataBicicletas = data;
    }

    private loadTransactionsData(anteriorDate:string, actualDate:string){
        this.estadisticasService.getTransacciones(anteriorDate, actualDate).subscribe(res => {
            this.transacciones = res;
        });
    }

    /**
     * consumiento recursos para obtener estado inicial bicicletas
     */
    private loadBikesData(){
        this.estadisticasService.getEstadisticasBicicletas().subscribe(response => {
            this.estadisticasBicicletas(response);
        });
        this.mostrar = true;
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
