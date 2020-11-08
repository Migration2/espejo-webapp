import { EventEmitter, Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { ApplySanctionModel, PenaltyModel } from '../models/sanciones.model';

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

	getSancionesEstado1() {
		return this.http.get('/rest/penalties/history/status/1', {}).map(res => res.json());
	}

	getSancionesEstado2() {
		return this.http.get('/rest/penalties/history/status/2', {}).map(res => res.json());
	}

	finalizarSancion(idSancion){
		return this.http.delete('/rest/penalties/'+idSancion, {});
	}

	createPenality(penality:PenaltyModel){
		return this.http.post('/rest/penalties', penality);
	}

	getAllManualPenalties(){
		return this.http.get('/rest/penalties/manual').map(this.extractData);
	}

	getAllAutomaticSanctios(){
		// return this.http.get('/rest/penalties/automatic').map(this.extractData);
		return [];
	}

	extractData(response :Response){
		return response.json();
	}
	applySanction(applySanctionData:ApplySanctionModel){

		return this.http.post('/rest/penalties/apply/to/user', JSON.stringify(applySanctionData), this.options);
	}

	automaticSanctionsData$: EventEmitter<any> = new EventEmitter();
	manualSanctionData$: EventEmitter<any> = new EventEmitter();
}