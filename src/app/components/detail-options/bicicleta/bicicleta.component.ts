import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BiciService } from '../../../services/bici.service';
import { detalleBicicletaModel } from '../../../models/bicicleta.model';
import { mantenimientoBikeModel, finMantenimientoBikeModel, mantenimientoHistorial } from '../../../models/mantenimiento.model';
import { Subject } from 'rxjs/Rx';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
	selector: 'app-bicicleta',
	templateUrl: './bicicleta.component.html',
	styleUrls: ['./bicicleta.component.scss'],
	providers: [BiciService, MantenimientoService]
})
export class BicicletaComponent implements OnInit {
	private idBici;
	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;
	datosBici = new detalleBicicletaModel;
	mostrar: boolean = false;
	mantenimientoBikeModel = new mantenimientoBikeModel;
	finMantenimientoBikeModel = new finMantenimientoBikeModel;
	mantenimientoHistorial: Array<mantenimientoHistorial>;
	partesBike: Array<any> = [];
	typesMantto: Array<any> = [];
	idParts: Array<any> = [];
	numeroMantenimientos: number = 0;
	dtOptionsMantenimiento: any = {};
	dtOptionsTransacciones: any = {};
	dtTriggerMantenimiento = new Subject();
	dtTriggerTransacciones = new Subject();
	transacciones: Array<any> = [];
	fechaActual = new Date();
	fechaAnterior = new Date();

	constructor(private activedRoute: ActivatedRoute, private biciService: BiciService, private mantenimientoService: MantenimientoService, private router: Router) {
		this.fechaAnterior.setDate(this.fechaActual.getDate() - 5);
		this.activedRoute.params.subscribe(params => {
			this.idBici = params.id;
		});
		this.biciService.getBiciById(this.idBici).subscribe(response => {
			this.datosBici = response;
			this.mantenimientoService.getManttosBike(this.datosBici.id).subscribe(response => {
				this.mantenimientoHistorial = response;
				this.numeroMantenimientos = this.mantenimientoHistorial.length - 1;
				this.dtTriggerMantenimiento.next();
				this.mostrar = true;
			});
			this.biciService.biciTransactions(this.datosBici.codigo, this.fechaAnterior.toISOString().substring(0, 10), this.fechaActual.toISOString().substring(0, 10)).subscribe(res => {
				this.transacciones = res;
				this.dtTriggerTransacciones.next();
			});
		});


		this.mantenimientoService.getBikeParts().subscribe(respose => {
			this.partesBike = respose;
		});

		this.mantenimientoService.getManttoTypes().subscribe(respose => {
			this.typesMantto = respose;
		});
	}

	ngOnInit() {
		this.dtOptionsTransacciones = {
			responsive: true,
			searching: false
		};
		this.dtOptionsMantenimiento = {
			columnDefs: [
				{ "width": "50%", "targets": 1 }
			],
			responsive: true
		};
	}


	onSubmit() {
		this.mantenimientoBikeModel.idParts = this.idParts;
		this.mantenimientoBikeModel.idStationOrBike = this.datosBici.id;
		this.mantenimientoService.setManttoBike(this.mantenimientoBikeModel);
		this.router.navigate(['administrarBicicletas']);
	};

	onSubmitFin() {
		this.finMantenimientoBikeModel.id = this.mantenimientoHistorial[this.numeroMantenimientos].id;
		this.mantenimientoService.setManttoBikeFin(this.finMantenimientoBikeModel);
		this.router.navigate(['administrarBicicletas']);
	};

	eventoParteBike(evento) {
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

	recuperarHistorial(anterior, actual) {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			// Destroy the table first
			dtInstance.table(document.getElementById('tablaTransacciones')).destroy();
			// Call the dtTrigger to rerender again
			this.biciService.biciTransactions(this.datosBici.codigo, anterior, actual).subscribe(res => {
				this.transacciones = res;
				this.dtTriggerTransacciones.next();
			});
		});
	}

}
