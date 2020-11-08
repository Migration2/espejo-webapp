import { Component, OnInit } from '@angular/core';
import { EstacionModel } from '../../../../models/estacion.model';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material';
import { PaginatePipe } from '../../../../pipes/paginate.pipe';
import { Router } from '@angular/router';
import { EstacionService } from '../../../../services/estacion.service';
import { StompService } from 'ng2-stomp-service';

@Component({
  selector: 'app-stations-table',
  templateUrl: './stations-table.component.html',
  styleUrls: ['./stations-table.component.css']
})
export class StationsTableComponent implements OnInit {

  displayedColumns = ['Estacion', 'Bicicletas disponibles', 'Puntos de contacto libres', 'Estado'];
  dataSourceStation: StationsDataSource;
  stationsDataForView: Array<EstacionModel> = [];
  stationsData: Array<EstacionModel> = [];
  isShow: boolean = false;
  //PAGINATION
  lengthStations: number = 0;
  pageSize: number = 20;
  pageNumber: number = 0;
  pageSizeOptions = [5, 10, 20, 50, 100];
  private paginatorPipe: PaginatePipe;
  private socketSubscriptionStationsData: any;

  constructor(private stationService: EstacionService, private router: Router, private stomp: StompService) { }

  ngOnInit() {
    this.paginatorPipe = new PaginatePipe();
    this.loadStationsData();
    // this.configureWebSocket();
    // this.subscribeTopicsWebSocket();  
  }

  // ngOnDestroy(): void {
  //   try {
  //     // unsubscribe
  //     this.socketSubscriptionStationsData.unsubscribe();

  //     // disconnect
  //     this.stomp.disconnect().then(() => {
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     console.error("Error to disconnect web socket");
  //   }
  // }

/**
 * configure websocket, setting host, debug and queue
 */
  private configureWebSocket(){
    this.stomp.configure({
      host: 'http://bici-rio.com:4547/bicirio-websocket', // produccion
      // host: 'https://orion-bike.com:4443/bicirio-websocket',//pruebas
      // host: '/websocket/bicirio-websocket',
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
      this.socketSubscriptionStationsData = this.stomp.subscribe('/topic/stationDetail', this.loadStationsDataWithWebsocket);
  });
  }

  /**
   * update stations data with websocket
   * @param response - stations data response from websocket 
   */
  private loadStationsDataWithWebsocket = (response) => {
    this.stationsData = response;
    this.lengthStations = this.stationsData.length;
    this.paginateStationData(this.stationsData, this.pageSize, this.pageNumber);
}

  private loadStationsData() {
    this.stationService.getStationsData().subscribe(response => {
      this.stationsData = response;
      this.lengthStations = this.stationsData.length;
      this.paginateStationData(this.stationsData, this.pageSize, this.pageNumber);
      this.isShow = true;
    },
      error => {
        console.error("Error to retrieve station data from server");
      });
  }

  informacionEstacion(id: number) {
    this.router.navigate(['estacion', id]);
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

}

export class StationsDataSource extends DataSource<any> {

  constructor(private stations: EstacionModel[]) {
    super();
  }

  connect(): Observable<EstacionModel[]> {
    return Observable.of(this.stations);
  }

  disconnect() { }
}