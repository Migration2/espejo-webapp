import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { EstacionService } from '../../../services/estacion.service';
import { EstadisticasService } from '../../../services/estadisticas.service';
import { EstacionModel } from '../../../models/estacion.model';
import { DataTableDirective } from 'angular-datatables';


@Component({
	selector: 'app-administrar-estaciones',
	templateUrl: './administrar-estaciones.component.html',
	styleUrls: ['./administrar-estaciones.component.scss'],
	providers: [EstacionService, EstadisticasService]
})
export class AdministrarEstacionesComponent implements OnInit {
	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;
	datosEstaciones: Array<EstacionModel> = [];
	dtTrigger = new Subject();
	dtOptions: any = {};
	mostrar: boolean = false;
	fechaActual = new Date();
	fechaAnterior = new Date();
	transacciones = [];
	dtTriggerTransacciones = new Subject();
	dtOptionsTransacciones: any = {};

	constructor(private estacionservice: EstacionService, private router: Router, private estadisticasService: EstadisticasService) { }

	ngOnInit() {
		this.fechaAnterior.setDate(this.fechaActual.getDate() - 5);
		this.fechaActual.setHours(this.fechaActual.getHours() - 5);
		this.estacionservice.getEstaciones().subscribe(response => {
			this.datosEstaciones = response;
			this.dtOptions = { responsive: true };
			this.dtTrigger.next();
			this.mostrar = true;
		});

		this.estadisticasService.getTransacciones(this.fechaAnterior.toISOString().substring(0, 10), this.fechaActual.toISOString().substring(0, 10)).subscribe(res => {
			this.transacciones = res;
			this.contarDatos(res);
			this.dtTriggerTransacciones.next();
		});
	}

	informacionEstacion(id: number) {
		this.router.navigate(['estacion', id]);
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
			bandera = false;
			for (let x in fecha) {
				if (transacciones[i].loanDate.toString().substring(0, 10) == fecha[x]) {
					bandera = true;
				}
			}
			if (bandera == false) {
				let a = transacciones[i].loanDate.toString().substring(0, 10);
				fecha.push(a);
			}
		}
		for (let j = 0; j < fecha.length; j++) {
			fechas[j] = 0;
		}

		for (const i in transacciones) {//obteniendo transaciones por dia
			for (let j = 0; j < fecha.length; j++) {
				if (transacciones[i].loanDate.toString().substring(0, 10) == fecha[j]) {
					let sss = fechas[j];
					fechas[j] = parseInt(sss) + 1;
				}
			}
		}
		datos.push({ 'data': fechas, 'label': 'Prestamos' });
		this.lineChartData = datos;
		this.lineChartLabels = fecha;
	}
}
