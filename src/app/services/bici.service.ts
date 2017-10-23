import { Injectable } from '@angular/core';
import {Http, RequestOptions,Headers} from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class BiciService {

	private headers = new Headers({ 'Content-Type': 'application/json', 'charset':'UTF-8' });
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http : Http) { }

	getBicis(){
		return this.http.get('/rest/bike', {}).map(res => res.json());
	}

	getStatesBike(){
		return this.http.get('/rest/state/bike', {}).map(res => res.json());
	}

	setBici(data){
		data.code='B'+data.code;
		this.http.post('/rest/bike', JSON.stringify(data), this.options).subscribe();
	}



}
