import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstacionService } from '../../../services/estacion.service';
import { EstacionModel } from '../../../models/estacion.model';
import { Subject } from 'rxjs/Rx';

@Component({
	selector: 'app-estacion',
	templateUrl: './estacion.component.html',
	styleUrls: ['./estacion.component.scss'],
	providers: [EstacionService]
})
export class EstacionComponent implements OnInit {
	private idEstacion;
	datosEstacion = new EstacionModel;
	puntosContacto:Array<any>=[];
	dtTrigger = new Subject();
	dtOptions: DataTables.Settings = {};
	options: Object;
	private porcentajePuntosContacto;

	constructor(private activedRoute:ActivatedRoute, private estacionservice : EstacionService) { 
		this.activedRoute.params.subscribe(params=>{
			this.idEstacion = params.id;
		});

		this.estacionservice.getStationById(this.idEstacion).subscribe(response => {
			this.datosEstacion = response;
			this.puntosContacto = response.contactPointStates;
			this.dtTrigger.next();
			this.porcentajePuntosContacto = this.estadoPuntosContacto(this.puntosContacto);
		});

		
	}

	ngOnInit() {
		this.dtOptions = {
			searching: false
		};



		this.options = {
			// title : { text : 'Puntos de contacto' },
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: ''
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %'
					}
				}
			},
			series: [{
				name: 'Estado',
				colorByPoint: true,
				data: this.porcentajePuntosContacto
			}]
		};
	}

	estadoPuntosContacto(puntosContacto){

		let data:Array<any>=[];

		if (puntosContacto.length > 2) {			
			let matriz = {};
			puntosContacto.forEach(function(registro) { 
				let estado = registro["status"];
				matriz[estado] = matriz[estado] ? (matriz[estado] + 1) : 1;
			});
		}else{
			// data.push({name:puntosContacto.status, y:puntosContacto.length});
		}		console.log(data);
		return data;
	}

}
