import { Component, OnInit } from '@angular/core';
import { BicicletaModel } from '../../../models/bicileta.model';
import { BiciService } from '../../../services/bici.service';


@Component({
	selector: 'app-agregar-bicicleta',
	templateUrl: './agregar-bicicleta.component.html',
	styleUrls: ['./agregar-bicicleta.component.scss']
})
export class AgregarBicicletaComponent implements OnInit {
	model = new BicicletaModel;
	estadosBicicletas: Array<any> =[];


	constructor(private biciService:BiciService) { }

	ngOnInit() {
		this.biciService.getStatesBike().subscribe(res => this.estadosBicicletas = res);
	}

	onSubmit() { 
		let idCliente = this.biciService.setBici(this.model); 
		location.reload();  	
	};

	onCancel(){
		console.log("nada");
	}
}
