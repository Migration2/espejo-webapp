import { Injectable } from '@angular/core';
import {Http, RequestOptions,Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class BiciService {

	private headers = new Headers({ 'Content-Type': 'application/json', 'charset':'UTF-8' });
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http : Http) { }

	getBicis(){
		return this.http.get('/rest/bike', {}).map(res => res.json());
	}

	public getBikesV2(){
		return this.http.get('/rest/bike/v2/list').map(this.extractData);
	}

	getStatesBike(){
		return this.http.get('/rest/state/bike', {}).map(res => res.json());
	}

	setBici(data){
		data.code='B'+data.code;
		this.http.post('/rest/bike', JSON.stringify(data), this.options).subscribe();
	}

	getBiciById(id:number){
		return this.http.get('/rest/bike/'+id, {}).map(res => res.json());
	}

	biciTransactions(idBike:string, fechaInicio:string, fechaFin:string){
		return this.http.get('/rest/reports/bike/'+idBike+'/'+fechaInicio+'/'+fechaFin, {}).map(res => res.json());
	}

	biciMissing(){
		return this.http.get('/rest/bike/missing', {}).map(res => res.json());
	}
	returnBiciToBodega(idBike){
		this.http.put('/rest/bike/returnWarehouse/'+idBike, {}, this.options).subscribe();
	}

	getAvailableBikes(){
		return this.http.get('/rest/bike/totem/bikes/available').map(this.extractData);
	}
	
	private extractData(response :Response){
		return response.json();
	}
}
