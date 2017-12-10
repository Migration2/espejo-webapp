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
	mostrar:boolean = false;

	
	constructor(private activedRoute:ActivatedRoute, private estacionservice : EstacionService) { 
		this.activedRoute.params.subscribe(params=>{
			this.idEstacion = params.id;
		});

		this.estacionservice.getStationById(this.idEstacion).subscribe(response => {
			this.datosEstacion = response;
			this.puntosContacto = response.contactPointStates;
			this.dtTrigger.next();
			this.estadoPuntosContacto(this.puntosContacto);
			this.mostrar = true;		
		});

		
	}

	ngOnInit() {
		this.dtOptions = {
			searching: false
		};

	}

	estadoPuntosContacto(puntosContacto){

		let data:Array<any>=[];
		let matriz = {};

		if (puntosContacto.length > 2) {				
			puntosContacto.forEach(function(registro) { 
				let estado = registro["status"];
				matriz[estado] = matriz[estado] ? (matriz[estado] + 1) : 1;
			});			
			for (var i = Object.values(matriz).length - 1; i >= 0; i--) {
				data.push({'name':Object.keys(matriz)[i] ,'y':Object.values(matriz)[i]});
			}			
		}else{
			data.push({'name': Object.keys(matriz),'y':100});
		}
		
		this.options = {
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
				pointFormat: '{series.name}: <b>{point.y}</b>'
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
				name: 'Cantidad',
				colorByPoint: true,
				data: data
			}]
		};
	}
}