import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class PrestamoService {

	private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http: Http, private router: Router) { }

	getPrestamosActivos() {
		return this.http.get('/rest/lend/list/state/1', {}).map(res => res.json());
	}

	finalizarPrestamo(data) {
		let dataEnvio = {
			"aliasContactPoint": "12",
			"codeBike": data.codeBike,
			"codeStation": "45345345435",
			"id": data.id,
			"idUser": 1,
			"observation": "RETRONADO DE FORMA NANUAL",
			"reservation": null
		}
		this.http.post('/rest/lend/manual/return',JSON.stringify(dataEnvio) ,this.options).subscribe();
	}
}
