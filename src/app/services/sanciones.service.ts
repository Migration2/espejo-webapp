import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class SancionesService {
	private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http: Http) { }

	getSancionesHistory() {
		return this.http.get('/rest/penalties/history', {}).map(res => res.json());
	}

	getSancionesByUserId(idUser) {
		return this.http.get('/rest/penalties/history/user/' + idUser, {}).map(res => res.json());
	}

	getSancionesByUserDocument(idUser) {
		return this.http.get('/rest/penalties/history/username/' + idUser, {}).map(res => res.json());
	}
}