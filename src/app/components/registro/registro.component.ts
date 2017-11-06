import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../models/register.model';
import { RegisterService } from '../../services/register.service';

@Component({
	selector: 'app-registro',
	templateUrl: './registro.component.html',
	styleUrls: ['./registro.component.scss'],
	providers: [RegisterService]
})
export class RegistroComponent implements OnInit {
	model = new RegisterModel;
	docTypes:Array<any>=[];
	cities:Array<any>=[]


	constructor( private registerService:RegisterService) { }

	ngOnInit() {
		this.registerService.getDocType().subscribe(response => {
			this.docTypes = response;
		});

		this.registerService.getCities().subscribe(response => {
			this.cities = response;
		});
	}


	onSubmit() { 
		this.model.username = this.model.person.username;
		let idCliente = this.registerService.setRegister(this.model); 
		console.log("envioa");
	};

	onCancel(){
		console.log("nada");
	}

}

