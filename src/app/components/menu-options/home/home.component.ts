import { Component, OnInit } from '@angular/core';
import { EstacionService } from '../../../services/estacion.service';
import { EstacionModel } from '../../../models/estacion.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [EstacionService]
})
export class HomeComponent implements OnInit {
	title: string = 'Estaciones BiciRío';
	Centerlat: number = 6.153433;
	Centerlng: number = -75.372826;
	datosEstaciones:Array<EstacionModel>=[];

	constructor(private estacionservice : EstacionService) { }

	ngOnInit() {
		this.estacionservice.getEstaciones().subscribe(response => {
			this.datosEstaciones = response;
		});
	}

}
