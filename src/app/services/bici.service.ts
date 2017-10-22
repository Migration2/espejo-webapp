import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class BiciService {

	constructor(private http : Http) { }

	getBicis(){
		return this.http.get('/rest/bike', {}).map(res => res.json());
	}

	setBici(data){
		data.code='B'+data.code;
		console.log(JSON.stringify(data));
		var headers = new Headers();
		headers.append('content-Type','application/x-www-form-urlencoded');
		this.http.post('/rest/bike', JSON.stringify(data), {}).map(res => res.json());
	}

}
