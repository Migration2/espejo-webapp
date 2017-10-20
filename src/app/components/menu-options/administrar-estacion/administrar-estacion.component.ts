import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-administrar-estacion',
	templateUrl: './administrar-estacion.component.html',
	styleUrls: ['./administrar-estacion.component.scss']
})
export class AdministrarEstacionComponent implements OnInit {
	dtOptions: any = {};
	showForm: boolean =false;
	data;

	constructor(private _http : Http) { }

	ngOnInit() {
		//dataTables
		this.dtOptions = {
			// searching: false
		};

		this.data = this._http.get('/rest/bike').map(res => console.log("hola"));
		console.log(this.data);

	}

	informacionEstacion(){
		console.log("hola");
	}
}
