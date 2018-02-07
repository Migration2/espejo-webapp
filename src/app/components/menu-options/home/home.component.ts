import { Component, OnInit } from '@angular/core';
import { EstacionService } from '../../../services/estacion.service';
import { Router } from '@angular/router';
import { EstadisticasService } from '../../../services/estadisticas.service';
import { EstacionModel } from '../../../models/estacion.model';
import { Subject } from 'rxjs/Rx';
import { StompService } from 'ng2-stomp-service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [EstacionService, EstadisticasService]
})
export class HomeComponent implements OnInit {
	title: string = 'Estaciones BiciRío';
	Centerlat: number = 6.142979;
	Centerlng: number = -75.378276;
	datosEstaciones: Array<EstacionModel> = [];
	dtTrigger = new Subject();
	dtOptions: DataTables.Settings = {};
	private subscription: any;
	respuestas: Array<any> = [];
	public pieLabelsEstaciones: string[] = [];
	public pieDataEstaciones: number[] = [];
	public pieLabelsContactos: string[] = [];
	public pieDataContactos: number[] = [];
	public pieLabelsBicicletas: string[] = [];
	public pieDataBicicletas: number[] = [];

	constructor(private estacionservice: EstacionService, public stomp: StompService, private estadisticasService: EstadisticasService, private router: Router) {
=======
	mostrar:boolean = false;

	constructor(private estacionservice : EstacionService, private estadisticasService : EstadisticasService, private router:Router) {
>>>>>>> master
		this.estacionservice.getEstaciones().subscribe(response => {
			this.datosEstaciones = response;
			this.dtTrigger.next();
			this.mostrar = true;		
		});

		stomp.configure({
			host: 'http://dev-codes.com:4547/bicirio-websocket',
			// host: '/websocket/bicirio-websocket',
			debug: true,
			queue: { 'init': false, 'user': true }
		});

		stomp.startConnect().then(() => {
			console.log('connected');
			stomp.done('init');
			this.subscription = stomp.subscribe('/topic/bikes', this.bicicletas);
			this.subscription = stomp.subscribe('/topic/contacts ', this.contactos);
			this.subscription = stomp.subscribe('/topic/stations', this.estaciones);
		});

		this.estadisticasService.getEstadisticasEstaciones().subscribe(response => {
			this.estadisticasEstaciones(response);
		});

		this.estadisticasService.getEstadisticasPuntoContacto().subscribe(response => {
			this.estadisticasPuntoContacto(response);
		});

		this.estadisticasService.getEstadisticasBicicletas().subscribe(response => {
			this.estadisticasBicicletas(response);
		});
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

	//update contactos
	public contactos = (response) => {
		let data = [];
		for (var i = Object.values(response).length - 1; i >= 0; i--) {
			if (Object.keys(response)[i] != 'total' && Object.values(response)[i] > 0) {
				data.push(Object.values(response)[i]);
			}
		}
		this.pieDataContactos = data;
	}

	//update estaciones
	public estaciones = (response) => {
		let data = [];
		for (var i = Object.values(response).length - 1; i >= 0; i--) {
			if (Object.keys(response)[i] != 'total' && Object.values(response)[i] > 0) {
				data.push(Object.values(response)[i]);
			}
		}
		this.pieDataEstaciones = data;
	}



	ngOnDestroy() {
		console.log("chao ome");
		//unsubscribe 
		this.subscription.unsubscribe();

		//disconnect 
		this.stomp.disconnect().then(() => {
			console.log('Connection closed')
		})
	}

	ngOnInit() {
		this.dtOptions = {};
	}

	informacionEstacion(id: number) {
		this.router.navigate(['estacion', id]);
	}

	estadisticasEstaciones(response) {
		let labels = [];
		let data = [];
		for (var i = Object.values(response).length - 1; i >= 0; i--) {
			if (Object.keys(response)[i] != 'total' && Object.values(response)[i] > 0) {
				labels.push(Object.keys(response)[i]);
				data.push(Object.values(response)[i]);
			}
		}
		this.pieLabelsEstaciones = labels;
		this.pieDataEstaciones = data;
	}

	estadisticasPuntoContacto(response) {
		let labels = [];
		let data = [];
		for (var i = Object.values(response).length - 1; i >= 0; i--) {
			if (Object.keys(response)[i] != 'total' && Object.values(response)[i] > 0) {
				labels.push(Object.keys(response)[i]);
				data.push(Object.values(response)[i]);
			}
		}
		this.pieLabelsContactos = labels;
		this.pieDataContactos = data;
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
	// events
	// public chartClicked(e: any): void {
	// 	console.log(e);
	// 	// let data = [30, 5, 10];
	// 	// let clone = JSON.parse(JSON.stringify(this.pieChartData));
	// 	// // clone[0].data = data;
	// 	// this.pieChartData = data;
	// }

	// public chartHovered(e: any): void {
	// 	console.log(e);
	// }
}
