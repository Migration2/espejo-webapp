import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BiciService } from '../../../services/bici.service';
import { detalleBicicletaModel } from '../../../models/bicicleta.model';
import { Subject } from 'rxjs/Rx';

@Component({
	selector: 'app-bicicleta',
	templateUrl: './bicicleta.component.html',
	styleUrls: ['./bicicleta.component.scss'],
	providers: [BiciService]
})
export class BicicletaComponent implements OnInit {
	
	private idBici;
	datosBici = new detalleBicicletaModel;

	constructor(private activedRoute:ActivatedRoute, private biciService:BiciService) { 
		this.activedRoute.params.subscribe(params=>{
			this.idBici = params.id;
		});

		this.biciService.getBiciById(this.idBici).subscribe(response => {
			this.datosBici = response;		
		});
	}

	ngOnInit() {
	}

}
