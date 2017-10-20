import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-administrar-usuarios',
	templateUrl: './administrar-usuarios.component.html',
	styleUrls: ['./administrar-usuarios.component.scss']
})
export class AdministrarUsuariosComponent implements OnInit {

	dtOptions: any = {};

	constructor(private router:Router) { }

	ngOnInit() {
		this.dtOptions = {
			// searching: false
		};
	}

	informacionUsuario(){
		console.log("hola");
	}

}
