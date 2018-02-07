import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstacionService } from '../../../services/estacion.service';
import { EstacionModel } from '../../../models/estacion.model';
import { mantenimientoEstacionModel, finMantenimientoEstacionModel, mantenimientoHistorial } from '../../../models/mantenimiento.model';
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
	mantenimientoHistorial: Array<mantenimientoHistorial>;
	puntosContacto: Array<any> = [];
	dtTrigger = new Subject();
	dtOptions: DataTables.Settings = {};
	options: Object;
	dtTrigger2 = new Subject();
	dtOptions2: DataTables.Settings = {};
	mostrar: boolean = false;
	partesEstacion: Array<any> = [];
	typesMantto: Array<any> = [];
	idParts: Array<any> = [];
	numeroMantenimientos: number = 0;
	public pieLabelsEstaciones: string[] = [];
	public pieDataEstaciones: number[] = [];


	constructor(private activedRoute: ActivatedRoute, private estacionservice: EstacionService, private mantenimientoService: MantenimientoService, private router: Router) {
		this.activedRoute.params.subscribe(params => {
			this.idEstacion = params.id;
		});

		this.estacionservice.getStationById(this.idEstacion).subscribe(response => {
			this.datosEstacion = response;
			this.puntosContacto = response.contactPointStates;
			this.estadoPuntosContacto(this.puntosContacto);
			this.mantenimientoService.getManttosStation(this.datosEstacion.id).subscribe(response => {
				this.mantenimientoHistorial = response;
				this.numeroMantenimientos = this.mantenimientoHistorial.length - 1;
				this.dtTrigger2.next();
				this.dtTrigger.next();
				this.mostrar = true;
			});
		});

		this.mantenimientoService.getStationParts().subscribe(respose => {
			this.partesEstacion = respose;
		});

		this.mantenimientoService.getManttoTypes().subscribe(respose => {
			this.typesMantto = respose;
		});
	}

	ngOnInit() {
		this.dtOptions = {
			searching: false
		};
		this.dtOptions2 = {
			columnDefs: [
				{ "width": "50%", "targets": 1 }
			]
		};

	}

	estadoPuntosContacto(puntosContacto) {
		console.log(puntosContacto);
		let labels = [];
		let data = [];

		let matriz = {};

		if (puntosContacto.length > 2) {
			puntosContacto.forEach(function (registro) {
				let estado = registro["status"];
				matriz[estado] = matriz[estado] ? (matriz[estado] + 1) : 1;
			});
			for (var i = Object.values(matriz).length - 1; i >= 0; i--) {
				data.push(Object.values(matriz)[i]);
				labels.push(Object.keys(matriz)[i]);
			}
		} else {
			data.push(100);
			labels.push(Object.keys(matriz)[i]);
		}


		this.pieLabelsEstaciones = labels; console.log(this.pieLabelsEstaciones);
		this.pieDataEstaciones = data; console.log(this.pieDataEstaciones);
	}


	onSubmit() {
		this.mantenimientoEstacionModel.idParts = this.idParts;
		this.mantenimientoEstacionModel.idStationOrBike = this.datosEstacion.id;
		this.mantenimientoService.setManttoStation(this.mantenimientoEstacionModel);
		this.router.navigate(['administrarEstaciones']);
	};

	onSubmitFin() {
		this.finMantenimientoEstacionModel.id = this.mantenimientoHistorial[this.numeroMantenimientos].id;
		this.mantenimientoService.setManttoStationFin(this.finMantenimientoEstacionModel);
		this.router.navigate(['administrarEstaciones']);
	};

	eventoParteEstacion(evento) {
		if (!evento.target.checked) {
			for (let i = 0; i < this.idParts.length; i++) {
				if (evento.target.defaultValue == this.idParts[i]) {
					this.idParts.splice(i, 1);
				}
			}
		} else {
			this.idParts.push(evento.target.defaultValue);
		}
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

}