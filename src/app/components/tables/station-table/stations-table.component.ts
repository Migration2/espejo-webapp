import { Component, Input, OnInit } from '@angular/core';
import { EstacionModel, StationKeepAliveModel } from '../../../models/estacion.model';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material';
import { PaginatePipe } from '../../../pipes/paginate.pipe';
import { Router } from '@angular/router';
import { EstacionService } from '../../../services/estacion.service';
import { StompService } from 'ng2-stomp-service';
import { URL_WEBSOCKET } from '../../../../environments/domain.prod';
import { POOLLING_TIME_IN_MILLIS } from '../../../../environments/environment';

export const SERVICIO_IN:string = "SERVICIO";
export const PASTOR_TEST_STATION_CODE:string = "567327383e4fee24e072625fc58836ad2441b98b20";

@Component({
  selector: 'app-stations-table',
  templateUrl: './stations-table.component.html',
  styleUrls: ['./stations-table.component.css'],
  providers: [EstacionService, StompService]
})
export class StationsTableComponent implements OnInit {

  public IN_SERVICE_STATUS:string = "SERVICIO";
  public OFF_SERVICE_STATUS:string = "SIN_SERVICIO";
  public WARNING_STATUS:string = "NOVEDAD";

  @Input() isClientUser: boolean = false;
  @Input() pageSize: number = 20;

  displayedColumns = ['Estacion', 'Bicicletas disponibles', 'Puntos de contacto libres', 'Estado'];
  dataSourceStation: StationsDataSource;
  stationsDataForView: Array<EstacionModel> = [];
  stationsData: Array<EstacionModel> = [];
  isShow: boolean = false;
  //PAGINATION
  lengthStations: number = 0;
  pageNumber: number = 0;
  pageSizeOptions = [5, 10, 20, 50, 100];
  private paginatorPipe: PaginatePipe;
  //WEBOCKET
  stationsIntervalTask:any;
  private subscriptionStationsData: any;
  private subcriptionStationsKeepAlive: any;
  private stationsKeepAliveData: Array<StationKeepAliveModel> = [];

  constructor(private stationService: EstacionService, private router: Router, private stomp: StompService) { }

  ngOnInit() {
    this.paginatorPipe = new PaginatePipe();
    this.loadStationsData();
    this._createPoollingToRetrieveStationData();
  }

  private _createPoollingToRetrieveStationData() {
    this.stationsIntervalTask = setInterval(() => {
      this.loadStationsData();
    }, POOLLING_TIME_IN_MILLIS);
  }

  ngOnDestroy(): void {
   if (this.stationsIntervalTask){
    clearInterval(this.stationsIntervalTask);
   }
  }

/**
 * configure websocket, setting host, debug and queue
 */
  private configureWebSocket(){
    this.stomp.configure({
      host: URL_WEBSOCKET,
      debug: false,
      queue: { 'init': false, 'user': true }
    });
  }

  /**
   * susbscription at topics(station topic) by websocket
   */
  private subscribeTopicsWebSocket(){
    this.stomp.startConnect().then(() => {
      this.stomp.done('init');
      this.subscriptionStationsData = this.stomp.subscribe('/topic/stationDetail', this.loadStationsDataWithWebsocket);
      this.subcriptionStationsKeepAlive = this.stomp.subscribe('/topic/station', (stationsKeepAliveData)=>{
        this.loadStationsKeepAliveData(stationsKeepAliveData);
      });
  });
  }

  private loadStationsKeepAliveData(stationsKeepAliveData: Array<StationKeepAliveModel>){
    this.stationsKeepAliveData = stationsKeepAliveData;
    if(this.dataSourceStation){
      this.matchStationsDataKeepAlive(this.dataSourceStation.getStations(), this.stationsKeepAliveData);
    }
  }

  /**
   * update stations data with websocket
   * @param response - stations data response from websocket
   */
  private loadStationsDataWithWebsocket = (response) => {
    this.stationsData = response;
    this.lengthStations = this.stationsData.length;
    this.matchStationsDataKeepAlive(this.stationsData, this.stationsKeepAliveData)
    this.paginateStationData(this.stationsData, this.pageSize, this.pageNumber);
}

  private loadStationsData() {
    this.stationService.getStationsData().subscribe(response => {
      this.stationsData = response;
      this.stationsData = this.stationsData.filter(station => station.code !== PASTOR_TEST_STATION_CODE);
      this.lengthStations = this.stationsData.length;
      this.paginateStationData(this.stationsData, this.pageSize, this.pageNumber);
      this.isShow = true;
    },
      error => {
        console.error("Error to retrieve station data from server");
      });
  }

  informacionEstacion(id: number) {
    if(!this.isClientUser){
      this.router.navigate(['estacion', id]);
    }
  }


  handlePage(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.pageNumber = pageEvent.pageIndex;
    this.paginateStationData(this.stationsData, this.pageSize, this.pageNumber);
  }

  private paginateStationData(stationsData: Array<EstacionModel>, pageSize: number, pageNumber: number) {
    this.stationsDataForView = this.paginatorPipe.transform(stationsData, pageSize, pageNumber);
    this.dataSourceStation = new StationsDataSource(this.stationsDataForView);
  }

  private matchStationsDataKeepAlive(stationsData: Array<EstacionModel>, stationsKeepAliveData: Array<StationKeepAliveModel>) {
    if(stationsKeepAliveData.length > 0 && stationsKeepAliveData.length > 0){
      stationsData.forEach(station => {
        let statusStation = this.getStatusStation(stationsKeepAliveData, station);
        station.statusName = statusStation;
      });
    }
  }

  private getStatusStation(stationsKeepAliveData:Array<StationKeepAliveModel>, stationData:EstacionModel): string{
    let stationReport:StationKeepAliveModel = stationsKeepAliveData.find(stationKeep => stationKeep.code == stationData.code);
    if(stationReport){
      return this.computeStatusStation(stationReport);
    }
    return this.OFF_SERVICE_STATUS;
  }

  private computeStatusStation(stationReport:StationKeepAliveModel):string{

    if(stationReport.timeWithoutReport <= 5){
      return this.IN_SERVICE_STATUS;
    }else if(stationReport.timeWithoutReport > 5 && stationReport.timeWithoutReport <= 10){
      return this.WARNING_STATUS;
    }else{
      return this.OFF_SERVICE_STATUS;
    }
  }

}

export class StationsDataSource extends DataSource<any> {

  constructor(private stations: EstacionModel[]) {
    super();
  }

  connect(): Observable<EstacionModel[]> {
    return Observable.of(this.stations);
  }

  public getStations():Array<EstacionModel>{
    return this.stations;
  }

  disconnect() { }
}
