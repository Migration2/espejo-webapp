import { Component, OnInit, ViewChild } from '@angular/core';
import { EstacionService } from '../../../services/estacion.service';
import { Router } from '@angular/router';
import { EstadisticasService } from '../../../services/estadisticas.service';
import { EstacionModel } from '../../../models/estacion.model';
import { Subject } from 'rxjs/Rx';
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
	title: string = 'Estaciones BiciRío';
	Centerlat: number = 6.142979;
	Centerlng: number = -75.378276;
	datosEstaciones: Array<EstacionModel> = [];
	dtTrigger = new Subject();
	dtTriggerTransacciones = new Subject();
	dtOptions: any = {};
	dtOptionsTransacciones: any = {};
	private subscription: any;
	respuestas: Array<any> = [];
	public pieLabelsBicicletas: string[] = [];
	public pieDataBicicletas: number[] = [];
	mostrar: boolean = false;
	activo: string = "estado";
	fechaActual = new Date();
	fechaAnterior = new Date();
	transacciones = [];
	constructor(private estacionservice: EstacionService, public stomp: StompService, private estadisticasService: EstadisticasService, private router: Router) {
	}



	//update bicicletas
	public bicicletas = (response) => {
		let data = [];
		for (var i = Object.values(response).length - 1; i >= 0; i--) {
			if (Object.keys(response)[i] != 'total' && Object.values(response)[i] > 0) {
				data.push(Object.values(response)[i]);
			}
		}
		this.pieDataBicicletas = data;
	}


	ngOnDestroy() {
		try {
			//unsubscribe 
			this.subscription.unsubscribe();

			//disconnect 
			this.stomp.disconnect().then(() => {
			});
		} catch (error) {

		}
	}

	ngOnInit() {
		this.fechaAnterior.setDate(this.fechaActual.getDate() - 4);
		this.estacionservice.getEstaciones().subscribe(response => {
			this.datosEstaciones = response;
			this.dtTrigger.next();
			this.mostrar = true;
		});

		this.stomp.configure({
			host: 'http://bici-rio.com:4547/bicirio-websocket',//produccion
			// host: 'https://orion-bike.com:4443/bicirio-websocket',//pruebas
			// host: '/websocket/bicirio-websocket',
			debug: false,
			queue: { 'init': false, 'user': true }
		});

		this.stomp.startConnect().then(() => {
			this.stomp.done('init');
			this.subscription = this.stomp.subscribe('/topic/bikes', this.bicicletas);
		});

		this.estadisticasService.getTransacciones(this.fechaAnterior.toISOString().substring(0, 10), this.fechaActual.toISOString().substring(0, 10)).subscribe(res => {
			this.transacciones = res;
			this.contarDatos(res);
			this.dtTriggerTransacciones.next();
		});

		this.estadisticasService.getEstadisticasBicicletas().subscribe(response => {
			this.estadisticasBicicletas(response);
		});

		let bonotes = [
			{
				extend: 'copy',
				text: 'Copiar',
				messageTop: `Datos de transacciones`,
				messageBottom: 'Desarrollado por Dev-Codes e Inter-Telco'
			},
			{
				extend: 'print',
				text: 'Imprimir',
				messageTop: `Datos de transacciones`,
				messageBottom: 'Desarrollado por Dev-Codes e Inter-Telco'
			},
			{
				extend: 'csv',
				text: 'Exportar',
				messageTop: `Datos de transacciones`,
				messageBottom: 'Desarrollado por Dev-Codes e Inter-Telco'
			}
		];

		this.dtOptions = { responsive: true };
		this.dtOptionsTransacciones = {
			responsive: true,
			// Declare the use of the extension in the dom parameter
			dom: 'Bfrtip',
			buttons: bonotes
		};
	}

	informacionEstacion(id: number) {
		this.router.navigate(['estacion', id]);
	}

	estadisticasBicicletas(response) {
		let labels = [];
		let data = [];
		for (var i = Object.values(response).length - 1; i >= 0; i--) {
			if (Object.keys(response)[i] != 'total' && Object.values(response)[i] > 0) {
				labels.push(Object.keys(response)[i]);
				data.push(Object.values(response)[i]);
			}
		}
		this.pieLabelsBicicletas = labels;
		this.pieDataBicicletas = data;
	}

	//General Pie	
	public pieChartType: string = 'pie';
	public pieChartTooltips: any = {
		tooltips: {
			callbacks: {
				label: function (tooltipItem, data) {
					var allData = data.datasets[tooltipItem.datasetIndex].data;
					var tooltipLabel = data.labels[tooltipItem.index];
					var tooltipData = allData[tooltipItem.index];
					var total = 0;
					for (var i in allData) {
						total += allData[i];
					}
					var tooltipPercentage = Math.round((tooltipData / total) * 100);
					return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
				}
			}
		}
	}


	recuperarHistorial(anterior, actual) {
		this.lineChartLabels = [];
		this.lineChartData = [{ data: [] }];
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			// Destroy the table first
			dtInstance.table(document.getElementById('tablaTransacciones')).clear();
			dtInstance.table(document.getElementById('tablaTransacciones')).destroy();
			// Call the dtTrigger to rerender again
			this.estadisticasService.getTransacciones(anterior, actual).subscribe(res => {
				this.transacciones = res;
				this.contarDatos(res);
				this.dtTriggerTransacciones.next();
			});
		});
	}

	//line chart
	public lineChartData: Array<any> = [];
	public lineChartLabels: Array<any> = [];
	public lineChartOptions: any = {
		responsive: true
	};
	public lineChartLegend: boolean = true;
	public lineChartType: string = 'line';

	private contarDatos(transacciones) {
		let fecha: Array<object> = [];
		let datos: Array<object> = [];
		let bandera: boolean = false;
		let fechas = [];
		for (let i = 0; i < transacciones.length; i++) {//obteniendo fechas
			for (let x in fecha) {
				bandera = false;
				if (transacciones[i].loanDate.toString().substring(0, 10) == fecha[x]) {
					bandera = true;
				}
			}
			if (bandera == false) {
				let a = transacciones[i].loanDate.toString().substring(0, 10);
				fecha.push(a);
			}
		}

		for (const i in transacciones) {//obteniendo transaciones por estacion
			bandera = false;
			for (const x in datos) {
				if (transacciones[i].loanStation == datos[x]['label'] || transacciones[i].returnStation == datos[x]['label']) {
					bandera = true;
					for (let j = 0; j < fecha.length; j++) {
						if (transacciones[i].loanDate.toString().substring(0, 10) == fecha[j]) {
							let sss=fechas[x][j];				
							fechas[x][j] = parseInt(sss)+1;
						}
					}					
				}
				datos[x]['data']= fechas[x];
			}
			
			if (bandera == false) {
				let b=[];
				for (let j = 0; j < fecha.length; j++) {
					b[j] = 0;
				}
				fechas.push(b);
				datos.push({ 'label': transacciones[i].loanStation });
			}
		}
		this.lineChartData = datos;
		this.lineChartLabels = fecha;
	}
}
