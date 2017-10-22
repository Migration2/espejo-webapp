import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class EstacionService {

	constructor(private http : Http) { }
	

	getEstaciones(){
		return this.http.get('/rest/station', {}).map(res => res.json());
	}


}

