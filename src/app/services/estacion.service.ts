import { Injectable } from '@angular/core';
import {Http, RequestOptions,Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EstacionService {

	private headers = new Headers({ 'Content-Type': 'application/json', 'charset':'UTF-8' });
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http : Http) { }
	

	getEstaciones(){
		return this.http.get('/rest/mobile/station',{}).map(this.extractData);
	}

	getStatesStation(){
		return this.http.get('/rest/state/station', {}).map(res => res.json());
	}

	setStation(data){
		this.http.post('/rest/station', JSON.stringify(data), this.options).subscribe();
	}

	getStationById(id:number){
		return this.http.get('/rest/station/'+id, {}).map(res => res.json());	
	}

	stationTransactions(idStation:string, fechaInicio:string, fechaFin:string){
		return this.http.get('/rest/reports/station/'+idStation+'/'+fechaInicio+'/'+fechaFin, {}).map(res => res.json());
	}

	extractData(response :Response){
		return response.json();
	}
}

