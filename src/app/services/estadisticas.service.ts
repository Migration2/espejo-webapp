import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EstadisticasService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    getEstadisticasEstaciones() {
        return this.http.get('/rest/station/statistic', {}).map(res => res.json());
    }

    getEstadisticasPuntoContacto() {
        return this.http.get('/rest/contactPoint/statistic', {}).map(res => res.json());
    }

    getEstadisticasBicicletas() {
        return this.http.get('/rest/bike/statistic', {}).map(res => res.json());
    }

    getTransacciones(fechaInicio, fechaFin) {
        return this.http.get('/rest/reports/' + fechaInicio + '/' + fechaFin, {}).map(res => res.json());
    }

}
