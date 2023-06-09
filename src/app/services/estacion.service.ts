import { Injectable } from '@angular/core';
import {Http, RequestOptions,Headers, Response} from '@angular/http';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ContactPointBikeModel, StationOperationTime } from '../models/estacion.model';
import {map, catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class EstacionService {

	private headers = new Headers({ 'Content-Type': 'application/json', 'charset':'UTF-8' });
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http : Http, private httpClient : HttpClient) { }
	
	/**
	 * @deprecated deprecated since fenix versión 19/10/2020 enchange use getStationsData
	 */
	getEstaciones(){
		return this.http.get('/rest/mobile/station',{}).map(this.extractData);
	}

	public getStationsData(){
		return this.http.get('/rest/station',{}).map(this.extractData);
	}

	/**
	 * retrieve last keep alive of station, 
	 * contains time in minutes from last report, date time last report, 
	 * code station and last  action execute in station.
	 * @param stationCode code of station for retrieve data
	 * @returns data last report station
	 */
	public getStationKeepAlive(stationCode:string){
		return this.http.get(`/rest/statistic/station/report/${stationCode}`).map(this.extractData);
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

	updateOperationTimeAllStations(operationTime:StationOperationTime){
		return this.http.put('/rest/station/operation/time/all', JSON.stringify(operationTime), this.options);
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

	putBikeInContactPoint(data: ContactPointBikeModel){
		return this.http.post('/rest/contactPoint/put/bike', data);
	}

	removeBikeOfContactPoint(data: ContactPointBikeModel){
		return this.http.post('/rest/contactPoint/remove/bike', data);
	}

	openContactPoint(stationCode: string, contactPoint: string){
		return this.http.patch(`/rest/station/${stationCode}/open/${contactPoint}`, {});
	}

	closeContactPoint(stationCode: string, contactPoint: string){
		return this.http.patch(`/rest/station/${stationCode}/close/${contactPoint}`,{});
	}

	extractData(response :Response){
		return response.json();
	}
}

