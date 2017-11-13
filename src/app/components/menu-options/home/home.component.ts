import { Component, OnInit } from '@angular/core';
import { EstacionService } from '../../../services/estacion.service';
import { EstadisticasService } from '../../../services/estadisticas.service';
import { EstacionModel } from '../../../models/estacion.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [EstacionService, EstadisticasService]
})
export class HomeComponent implements OnInit {
	title: string = 'Estaciones BiciRío';
	Centerlat: number = 6.153433;
	Centerlng: number = -75.372826;
	datosEstaciones:Array<EstacionModel>=[];
	optionsEstaciones: Object;
	optionsPuntosContacto: Object;
	optionsBicicletas: Object;

	constructor(private estacionservice : EstacionService, private estadisticasService : EstadisticasService) { }

	ngOnInit() {
		this.estacionservice.getEstaciones().subscribe(response => {
			this.datosEstaciones = response;
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

	estadisticasEstaciones(response){
		let data:Array<any>=[];

		for (var i = Object.values(response).length - 1; i >= 0; i--) {
			if( Object.keys(response)[i] != 'total' && Object.values(response)[i] > 0){
				data.push([Object.keys(response)[i] , Object.values(response)[i]]);
			}			
		}
		this.optionsEstaciones = {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: 0,
				plotShadow: false,
				renderTo: 'optionsEstaciones'
			}, navigation: {
				buttonOptions: {
					enabled: false
				}
			},
			title: {
				text: '<br>Estaciones<br>',
				align: 'center',
				verticalAlign: 'middle',
				y: 60
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.y}</b>'
			},
			plotOptions: {
				pie: {
					size:'90%',
					dataLabels: {
						enabled: true,
						distance: -40,
						style: {
							fontWeight: 'bold',
							color: 'white'
						}
					},
					startAngle: -90,
					endAngle: 90,
					center: ['50%', '75%']
				}
			},
			series: [{
				type: 'pie',
				name: 'Cantidad',
				innerSize: '60%',
				data: data
			}],
			credits: {
				enabled: false
			}
		}
	}

	estadisticasPuntoContacto(response){
		let data:Array<any>=[];

		for (var i = Object.values(response).length - 1; i >= 0; i--) {
			if( Object.keys(response)[i] != 'total' && Object.values(response)[i] > 0){
				data.push([Object.keys(response)[i] , Object.values(response)[i]]);
			}			
		}
		this.optionsPuntosContacto = {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: 0,
				plotShadow: false,
				renderTo: 'optionsPuntosContacto'
			}, navigation: {
				buttonOptions: {
					enabled: false
				}
			},
			title: {
				text: '<br>Contactos<br>',
				align: 'center',
				verticalAlign: 'middle',
				y: 60
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.y}</b>'
			},
			plotOptions: {
				pie: {
					size:'90%',
					dataLabels: {
						enabled: true,
						distance: -40,
						style: {
							fontWeight: 'bold',
							color: 'white'
						}
					},
					startAngle: -90,
					endAngle: 90,
					center: ['50%', '75%']
				}
			},
			series: [{
				type: 'pie',
				name: 'Cantidad',
				innerSize: '60%',
				data: data
			}],
			credits: {
				enabled: false
			}
		}
	}

	estadisticasBicicletas(response){
		let data:Array<any>=[];

		for (var i = Object.values(response).length - 1; i >= 0; i--) {
			if( Object.keys(response)[i] != 'total' && Object.values(response)[i] > 0){
				data.push([Object.keys(response)[i] , Object.values(response)[i]]);
			}			
		}
		this.optionsBicicletas = {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: 0,
				plotShadow: false,
				renderTo: 'optionsBicicletas'
			}, navigation: {
				buttonOptions: {
					enabled: false
				}
			},
			title: {
				text: '<br>Bicicletas<br>',
				align: 'center',
				verticalAlign: 'middle',
				y: 60
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.y}</b>'
			},
			plotOptions: {
				pie: {
					size:'90%',
					dataLabels: {
						enabled: true,
						distance: -40,
						style: {
							fontWeight: 'bold',
							color: 'white'
						}
					},
					startAngle: -90,
					endAngle: 90,
					center: ['50%', '75%']
				}
			},
			series: [{
				type: 'pie',
				name: 'Cantidad',
				innerSize: '60%',
				data: data
			}],
			credits: {
				enabled: false
			}
		}
	}



}
