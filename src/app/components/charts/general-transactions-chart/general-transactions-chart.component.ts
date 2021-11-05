import { Component, OnInit } from '@angular/core';
import { CHART_COLORS } from '../../../../environments/graph_colors.prod';
import { EstadisticasService } from '../../../services/estadisticas.service';

@Component({
  selector: 'app-general-transactions-chart',
  templateUrl: './general-transactions-chart.component.html',
  styleUrls: ['./general-transactions-chart.component.css']
})
export class GeneralTransactionsChartComponent implements OnInit {

  private fechaActual = new Date();
  private fechaAnterior = new Date();
  public transactionsData = [];
  public lineChartLabels: Array<any> = [];
  public lineChartData: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartColors = CHART_COLORS

  constructor(private statisticsService: EstadisticasService) {
    this.fechaAnterior.setDate(this.fechaActual.getDate() - 5);
    this.fechaActual.setHours(this.fechaActual.getHours() - 5);
    this.loadTransactionStatisticsData(this.getStringDate(this.fechaAnterior), this.getStringDate(this.fechaActual));
  }

  ngOnInit() {
  }

  private getStringDate(date:Date):string{
    if(!date){
      date = new Date();
    }
    return date.toISOString().substring(0, 10);
  }

  private loadTransactionStatisticsData(anterior, actual) {
    this.statisticsService.getTransacciones(anterior, actual).subscribe(res => {
      this.transactionsData = res;
      this.contarDatos(res);
    });
  }

  private contarDatos(transacciones: Array<any>) {
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
