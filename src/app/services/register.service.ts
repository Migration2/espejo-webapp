import { Injectable } from '@angular/core';
import {Http, RequestOptions,Headers} from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class RegisterService {

	private headers = new Headers({ 'Content-Type': 'application/json', 'charset':'UTF-8' });
	private options = new RequestOptions({ headers: this.headers });

	constructor(public http: Http) { }

	setRegister(data){
		this.http.post('/rest/signup', JSON.stringify(data), this.options).subscribe();
	}

	getDocType(){
		return this.http.get('/rest/type/id', {}).map(res => res.json());
	}

	getCities(){
		return this.http.get('/rest/city', {}).map(res => res.json());
	}
}
