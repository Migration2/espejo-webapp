import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SancionesService } from '../../../services/sanciones.service';
import { Subject } from 'rxjs/Rx';
import { sancionesModel } from '../../../models/sanciones.model';

@Component({
	selector: 'app-sanciones',
	templateUrl: './sanciones.component.html',
	styleUrls: ['./sanciones.component.css'],
	providers: [SancionesService]
})
export class SancionesComponent implements OnInit {

	opcionCard = "sancionesActivas";
	dtOptions1: any = {};
	dtOptions2: any = {};
	dtOptionsAplicadas: any = {};
	sanciones1: Array<sancionesModel> = [];
	sanciones2: Array<sancionesModel> = [];
	sancionesAplicadas: Array<sancionesModel> = [];
	dtTrigger1 = new Subject();
	dtTrigger2 = new Subject();
	dtTriggerAplicadas = new Subject();
	mostrar: boolean = false;
	sancion: sancionesModel = new sancionesModel;

	constructor(private router: Router, private sancionesService: SancionesService) {
	}

	ngOnInit() {
		this.sancionesService.getSancionesEstado1().subscribe(response => {
			this.sanciones1 = response;
			this.dtTrigger1.next();
		});
		this.sancionesService.getSancionesEstado2().subscribe(response => {
			this.sanciones2 = response;
			this.dtTrigger2.next();
		});
		this.sancionesService.getSancionesHistory().subscribe(response => {
			this.sancionesAplicadas = response;
			this.dtTriggerAplicadas.next();
			this.mostrar = true;
		});
		this.dtOptions1 = {
			responsive: true
		};
		this.dtOptions2 = {
			responsive: true
		};
		this.dtOptionsAplicadas = {
			responsive: true
		};

	}

}