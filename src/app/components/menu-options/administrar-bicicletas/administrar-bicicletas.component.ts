import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BiciService } from '../../../services/bici.service';
import { Subject } from 'rxjs/Rx';
import { BicicletaModel } from '../../../models/bicicleta.model';

@Component({
	selector: 'app-administrar-bicicletas',
	templateUrl: './administrar-bicicletas.component.html',
	styleUrls: ['./administrar-bicicletas.component.scss'],
	providers: [BiciService]
})
export class AdministrarBicicletasComponent implements OnInit {
	dtOptions: any = {};
	dataBicis: Array<any> = [];
	dtTrigger = new Subject();
	model = new BicicletaModel;
	mostrar:boolean = false;
	

	constructor(private router:Router, private biciService:BiciService) { 
		this.biciService.getBicis().subscribe(response => {
			this.dataBicis = response;
			this.dtTrigger.next();
			this.mostrar = true;
		});
	}

	ngOnInit() {
		this.dtOptions = {responsive: true};
	}

	informacionBicicleta(id:number){
		this.router.navigate(['bicicleta',id]);
	}

	onSubmit() { 
		let idCliente = this.biciService.setBici(this.model); 
		location.reload();  	
	};	
}
