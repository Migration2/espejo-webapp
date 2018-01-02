import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstacionService } from '../../../services/estacion.service';
import { EstacionModel } from '../../../models/estacion.model';
import { mantenimientoEstacionModel, finMantenimientoEstacionModel } from '../../../models/mantenimiento.model';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { Subject } from 'rxjs/Rx';


@Component({
	selector: 'app-estacion',
	templateUrl: './estacion.component.html',
	styleUrls: ['./estacion.component.scss'],
	providers: [EstacionService, MantenimientoService]
})
export class EstacionComponent implements OnInit {
	private idEstacion;
	datosEstacion = new EstacionModel;
	mantenimientoEstacionModel = new mantenimientoEstacionModel;
	finMantenimientoEstacionModel = new finMantenimientoEstacionModel;
	puntosContacto:Array<any>=[];
	dtTrigger = new Subject();
	dtOptions: DataTables.Settings = {};
	options: Object;
	mostrar:boolean = false;
	partesEstacion:Array<any>=[];
	typesMantto:Array<any>=[];
	idParts: Array<any>=[];

	
	constructor(private activedRoute:ActivatedRoute, private estacionservice : EstacionService, private mantenimientoService: MantenimientoService, private router:Router) { 
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

		this.mantenimientoService.getStationParts().subscribe(respose =>{
			this.partesEstacion = respose;
		});

		this.mantenimientoService.getManttoTypes().subscribe(respose =>{
			this.typesMantto = respose;
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


	onSubmit() { 
		this.mantenimientoEstacionModel.idParts = this.idParts;
		this.mantenimientoEstacionModel.idStationOrBike = this.datosEstacion.id;
		this.mantenimientoService.setManttoStation(this.mantenimientoEstacionModel);
		this.router.navigate(['administrarEstaciones']);		
	};	

	onSubmitFin() { 
		this.finMantenimientoEstacionModel.id = this.datosEstacion.id;
		this.mantenimientoService.setManttoStationFin(this.finMantenimientoEstacionModel);
		this.router.navigate(['administrarEstaciones']);		
	};	

	eventoParteEstacion(evento){		
		if (!evento.target.checked){
			for (let i = 0; i<this.idParts.length;i++){
				if(evento.target.defaultValue == this.idParts[i]){
					this.idParts.splice(i,1);
				}
			}
		}else{
			this.idParts.push(evento.target.defaultValue);
		}
	}

}