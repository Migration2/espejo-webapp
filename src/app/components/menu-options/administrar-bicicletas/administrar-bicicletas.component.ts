import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BiciService } from '../../../services/bici.service';
import { BicicletaModel } from '../../../models/bicileta.model';
import { Subject } from 'rxjs/Rx';

@Component({
	selector: 'app-administrar-bicicletas',
	templateUrl: './administrar-bicicletas.component.html',
	styleUrls: ['./administrar-bicicletas.component.scss'],
	providers: [BiciService]
})
export class AdministrarBicicletasComponent implements OnInit {
	dtOptions: DataTables.Settings = {};
	showForm :boolean =false;
	dataBicis: Array<any> = [];
	dtTrigger = new Subject();
	

	constructor(private router:Router, private biciService:BiciService) { }

	ngOnInit() {
		this.biciService.getBicis().subscribe(response => {
			this.dataBicis = response;
			this.dtOptions = {};
			this.dtTrigger.next();
		});
	}

	informacionBicicleta(id:number){
		console.log(id);
	}

	
}
