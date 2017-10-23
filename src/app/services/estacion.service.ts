import { Injectable } from '@angular/core';
import {Http, RequestOptions,Headers} from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class EstacionService {

	private headers = new Headers({ 'Content-Type': 'application/json', 'charset':'UTF-8' });
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http : Http) { }
	

	getEstaciones(){
		return this.http.get('/rest/station', {}).map(res => res.json());
	}

	getStatesStation(){
		return this.http.get('/rest/state/station', {}).map(res => res.json());
	}

	setStation(data){
		this.http.post('/rest/station', JSON.stringify(data), this.options).subscribe();
	}
}

