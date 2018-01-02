import { Injectable } from '@angular/core';
import {Http, RequestOptions,Headers} from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class MantenimientoService {
	private headers = new Headers({ 'Content-Type': 'application/json', 'charset':'UTF-8' });
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http : Http) { }

	getManttoTypes(){
		return this.http.get('/rest/mantto/types', {}).map(res => res.json());
	}

	getStationParts(){
		return this.http.get('/rest/mantto/station/parts', {}).map(res => res.json());
	}

	getBikeParts(){
		return this.http.get('/rest/mantto/bike/parts', {}).map(res => res.json());
	}

	setManttoStation(data){
		this.http.post('/rest/mantto/station/mantto', JSON.stringify(data), this.options).subscribe();
	}

	setManttoStationFin(data){
		this.http.post('/rest/mantto/station/mantto/terminate', JSON.stringify(data), this.options).subscribe();
	}

	setManttoBike(data){
		this.http.post('/rest/mantto/bike/mantto', JSON.stringify(data), this.options).subscribe();
	}

	setManttoBikeFin(data){
		this.http.post('/rest/mantto/bike/mantto/terminate', JSON.stringify(data), this.options).subscribe();
	}

}