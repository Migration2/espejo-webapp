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

	constructor(private activedRoute:ActivatedRoute, private estacionservice : EstacionService) { 
		this.activedRoute.params.subscribe(params=>{
			this.idEstacion = params.id;
		});
		this.estacionservice.getStationById(this.idEstacion).subscribe(response => {
			this.datosEstacion = response;
			this.puntosContacto = response.moPuntosContactosCollection;
			this.dtTrigger.next();
		});
	}

	ngOnInit() {
		this.dtOptions = {
			searching: false
		};
	}

}
