import { Injectable } from '@angular/core';
import {Http, RequestOptions,Headers, Response} from '@angular/http';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { StationOperationTime } from '../models/estacion.model';
import {map, catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class EstacionService {

	private headers = new Headers({ 'Content-Type': 'application/json', 'charset':'UTF-8' });
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http : Http, private httpClient : HttpClient) { }
	
	/**
	 * @deprecated deprecated since fenix versión 19/10/2020 enchange use getStationsV2
	 */
	getEstaciones(){
		return this.http.get('/rest/mobile/station',{}).map(this.extractData);
	}

	getEstacionesV2(){
		return this.http.get('/rest/station',{}).map(this.extractData);
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

	getStationsOperationTime(){
		return this.http.get('/rest/station/operation/time').map(this.extractData);
	}

	getStationOperationTimeByCode(stationCode:string){
		return this.http.get(`/rest/station/operation/time/${stationCode}`).map(this.extractData);
	}

	updateOperationTime(operationTime){		
		return this.http.put('/rest/station/operation/time', JSON.stringify(operationTime), this.options);
	}

	updateOperationTimeV2(operationTime:StationOperationTime){
		const headers = new HttpHeaders().append('Content-Type' , 'application/json');
		return this.httpClient
		.put<StationOperationTime>('/rest/station/operation/time', JSON.stringify(operationTime), {headers:headers})
		.pipe(map(res => res), 
			catchError(this.error)
		);
	}

	// Handle Errors
    error(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}, Error type: ${error.type}\nMessage: ${error.message}`;
        }

		console.log(errorMessage)
        return Observable.of(errorMessage);
    }

	stationTransactions(idStation:string, fechaInicio:string, fechaFin:string){
		return this.http.get('/rest/reports/station/'+idStation+'/'+fechaInicio+'/'+fechaFin, {}).map(res => res.json());
	}

	enableStation(codeStation:string){
		return this.http.patch(`/rest/remote/station/unlock/${codeStation}`, {});
	}

	disableStation(stationCode:string){
		return this.http.patch(`/rest/remote/station/lock/${stationCode}`,{}, this.options);
	}

	extractData(response :Response){
		return response.json();
	}
}

