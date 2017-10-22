import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstacionService } from '../../../services/estacion.service';
import { Subject } from 'rxjs/Rx';

@Component({
	selector: 'app-administrar-estaciones',
	templateUrl: './administrar-estaciones.component.html',
	styleUrls: ['./administrar-estaciones.component.scss'],
	providers: [EstacionService]
})
export class AdministrarEstacionesComponent implements OnInit {
	showForm: boolean =false;
	datosEstaciones:Array<any>=[];
	dtTrigger = new Subject();
	dtOptions: DataTables.Settings = {};

	constructor(private estacionservice : EstacionService) { }

	ngOnInit() {
		this.estacionservice.getEstaciones().subscribe(response => {
			this.datosEstaciones = response;
			this.dtOptions = {};
			this.dtTrigger.next();
		});
		
	}

	informacionEstacion(id:number){
		console.log(id);
	}
}
