import { Component, OnInit } from '@angular/core';
import { CHART_COLORS } from '../../../../environments/graph_colors.prod';
import { EstadisticasService } from '../../../services/estadisticas.service';

@Component({
  selector: 'app-transactions-per-station-chart',
  templateUrl: './transactions-per-station-chart.component.html',
  styleUrls: ['./transactions-per-station-chart.component.css']
})
export class TransactionsPerStationChartComponent implements OnInit {
  public lineChartLabels: Array<any> = [];
  public lineChartDataEstation: Array<any> = [];
  public lineChartLegend = true;
  public lineChartType = 'bar';
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors = CHART_COLORS

  private fechaActual = new Date();
  private fechaAnterior = new Date();

  public transactions = [];

  constructor(private statisticsService: EstadisticasService) {
    this.fechaAnterior.setDate(this.fechaActual.getDate() - 4);
    this.fechaActual.setHours(this.fechaActual.getHours() - 5);
    this.statisticsService.getTransacciones(this.fechaAnterior.toISOString().substring(0, 10),
            this.fechaActual.toISOString().substring(0, 10)).subscribe(res => {
                this.transactions = res;
                this.contarDatos(res);
            });
   }

  ngOnInit() {
  }


  private contarDatos(transacciones) {
    const fecha = [];
    const datos = [];
    const datosEstacion = [];
    const estacion = [];
    let bandera = false;
    const estaciones = [];
    const fechas = [];
    for (let i = 0; i < transacciones.length; i++) { // obteniendo fechas
        bandera = false;
        for (const x in fecha) {
            if (transacciones[i].loanDate.toString().substring(0, 10) === fecha[x]) {
                bandera = true;
            }
        }
        if (bandera === false) {
            fecha.push(transacciones[i].loanDate.toString().substring(0, 10));
        }
        bandera = false; // obteniendo estaciones
        for (const x in estacion) {
            if (transacciones[i].loanStation === estacion[x] || transacciones[i].returnStation === estacion[x]) {
                bandera = true;
            }
        }
        if (bandera === false) {
            estacion.push(transacciones[i].loanStation);
        }
    }

    for (let j = 0; j < fecha.length; j++) { // inicializando array de fechas para contarlas
        fechas[j] = 0;
    }

    for (let j = 0; j < estacion.length; j++) { // inicializando array de fechas en estaciones
        const contadorFechas = [];
        for (let i = 0; i < fecha.length; i++) {
            contadorFechas[i] = 0;
        }
        estaciones[j] = contadorFechas;
    }

    for (const i in transacciones) { // obteniendo transaciones por dia
        if (transacciones.hasOwnProperty(i)) {
            for (let j = 0; j < fecha.length; j++) {
                if (transacciones[i].loanDate.toString().substring(0, 10) === fecha[j]) {
                    fechas[j] = parseInt(fechas[j], 10) + 1;
                    for (let a = 0; a < estacion.length; a++) {
                        if (transacciones[i].loanStation === estacion[a] || transacciones[i].returnStation === estacion[a]) {
                            estaciones[a][j] = parseInt(estaciones[a][j], 10) + 1;
                        }
                    }
                }
            }
        }
    }

    // dando estructura a data estaciones
    for (let i = 0; i < estacion.length; i++) {
        datosEstacion.push({ 'data': estaciones[i], 'label': estacion[i] });
    }

    datos.push({ 'data': fechas, 'label': 'Prestamos' });
    // this.lineChartData = datos;
    this.lineChartLabels = fecha;
    this.lineChartDataEstation = datosEstacion;
}

}
