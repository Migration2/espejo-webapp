import { Component, OnInit } from '@angular/core';
import { EstacionModel } from '../../../models/estacion.model';
import { EstacionService } from '../../../services/estacion.service';

@Component({
	selector: 'app-agregar-estacion',
	templateUrl: './agregar-estacion.component.html',
	styleUrls: ['./agregar-estacion.component.scss']
})
export class AgregarEstacionComponent implements OnInit {
	model = new EstacionModel;
	estadosEstacion: Array<any> =[];

	constructor(private estationServices:EstacionService) { }

	ngOnInit() {
		this.estationServices.getStatesStation().subscribe(res => this.estadosEstacion = res);
	}

	onCancel(){

	}

	onSubmit(){

	}

}
