import { Component, OnInit } from '@angular/core';

import {Map, View} from 'ol';
import {Tile} from 'ol/layer';
import {OSM} from 'ol/source';
import {fromLonLat} from 'ol/proj';
import {Point} from 'ol/geom';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import Overlay from 'ol/Overlay';

import { StompService } from 'ng2-stomp-service';

import { EstacionService } from '../../../services/estacion.service';
import { StationKeepAliveModel } from '../../../models/estacion.model';


export const DEFAULT_ANCHOR = [0.5, 1];
export const DEFAULT_ICON = '../../../../assets/images/iconMin.png';

const DANGER_COLOR:string = "#B51F29";
const SUCCES_COLOR:string = "#28a745";
const WARNING_COLOR:string = "#ffc107";
const DANGER_ICON_CLASS:string ="oi oi-circle-x text-danger icon-md";
const SUCCES_ICON_CLASS:string ="oi oi-circle-check text-success icon-md";
const WARNING_ICON_CLASS:string ="oi oi-warning text-warning icon-md";

@Component({
  selector: 'app-stations-map',
  templateUrl: './stations-map.component.html',
  styleUrls: ['./stations-map.component.css'],
  providers: [EstacionService, StompService]
})
export class StationsMapComponent implements OnInit {

  map: Map;
  anchor: number[] = DEFAULT_ANCHOR;
  icon: string = DEFAULT_ICON;
  public stationsData: Array<any> = [];
  private subscriptionStationKeepAlive: any;

  constructor(private stationsService: EstacionService, public stompService: StompService) {
    
  }

  ngOnInit() {
    this.map = this.createOpenLayerMap();
    // this.loadStationsData();
    this.configureStomp();
  }

  ngOnDestroy(): void {
    try {
      this.subscriptionStationKeepAlive.unsubscribe();
      // disconnect
      this.stompService.disconnect().then(() => {
      });
    } catch (error) {
      console.error(error);
    }
  }

  private configureStomp(){
    this.stompService.configure({
      host: 'http://bici-rio.com:4547/bicirio-websocket', // production
      debug: false,
      queue: { 'init': false, 'user': false }
    });
    this.stompService.startConnect().then(() => { // susbscrition to websocket
      this.stompService.done('init');
      this.subscriptionStationKeepAlive = this.stompService.subscribe('/topic/station', (responseData)=>{
        this.stationKeepAliveData(responseData);
      });
    });
  }

  private stationKeepAliveData(responseData: any){
    if(this.stationsData.length < 1){
      this.stationsData = responseData;
      if(this.stationsData){
        let stationsMarks = this.createStationsMarkers(this.stationsData);
        this.addMarksInMap(stationsMarks, this.map);
        this.initPoupEvent(this.map, this.stationsData);
      }
    }else{
      this.stationsData = responseData;
    }
  }

  private loadStationsData(){
    this.stationsService.getStationsData().subscribe(response => {
      this.stationsData = response;
      if(this.stationsData){
        let stationsMarks = this.createStationsMarkers(this.stationsData);
        this.addMarksInMap(stationsMarks, this.map);
        this.initPoupEvent(this.map, this.stationsData);
      }
    }, error => console.error(error));
  }

  private createStationsMarkers(stationsData:Array<any>):Array<Feature>{
    let stationMarks:Array<Feature> = [];
    if(stationsData){
      for (let i = 0; i < stationsData.length; i++) {
        const station = stationsData[i];
        let marker = this.createStationMark(station.longitude, station.latitude, String(i));
        stationMarks.push(marker);
      }
    }
    return stationMarks;
  }

  private addMarksInMap(marks: Array<Feature>, map:Map){
    const vectorSource = new VectorSource({
      features: marks
    });    
    const vectorLayer = new VectorLayer({
        source: vectorSource
    });

    if(map){
      map.addLayer(vectorLayer);
    } else {
      setTimeout(() => {
        map.addLayer(vectorLayer);
      }, 10);
    }

  }

  private createOpenLayerMap(): Map {
    let openLayerMap: Map = new Map({
      target: 'map',
      layers:[
        new Tile({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([-75.378276, 6.142979]),
        zoom: 14
      })
    });

    return openLayerMap;
  }

  private createStationMark(lon:number, lat:number, stationName:string = ""): Feature{
    let marker = new Feature({
      geometry: new Point(fromLonLat([lon, lat])),
      name: stationName
    });

    let icon = new Style({
      image: new Icon({
        anchor: this.anchor,
        src: this.icon
      })
    });

    marker.setStyle(icon);
    return marker;
  }


  

  private initPoupEvent(map:Map, stationsData: Array<any>){
    
    let container: HTMLElement = document.getElementById('popup');
    container.hidden = false;
    let iconStatusContainer: HTMLElement = document.getElementById('iconStatus');
    let nameStationContent: HTMLElement = document.getElementById('nameStation');
    let hourLastUpdateContent: HTMLElement = document.getElementById('hourLastUpdate');
    
    var closer = document.getElementById('popup-closer');
    let overlay: Overlay = this.createOverlay(container);
    
    map.addOverlay(overlay);
    this.setupCloserButton(closer, overlay);

    //click Event 
    map.on('singleclick', (event) => {
      this.hidePoup(closer, overlay);
      map.forEachFeatureAtPixel(event.pixel,(feature, layer) => {
        let indexStation:number = Number(feature.get("name"));
        let stationData = this.stationsData[indexStation];
        let coordinate = event.coordinate;
        this.refreshCardsInfo(stationData, iconStatusContainer, nameStationContent, container, hourLastUpdateContent);
        overlay.setPosition(coordinate);
      });
    });
  }

  private refreshCardsInfo(stationKeepAliveData:StationKeepAliveModel, 
    iconStatusContainer: HTMLElement, nameStationContent: HTMLElement, container: HTMLElement, hourLastUpdateContent: HTMLElement){
    nameStationContent.innerHTML= `${stationKeepAliveData.stationName}`;
    iconStatusContainer.className = this.chooseIconClass(stationKeepAliveData);
    container.style.borderLeftColor = this.chooseCardBorderColor(stationKeepAliveData);
    let hourReport = stationKeepAliveData.lastReport.slice(11, 19);
    let dateReport = stationKeepAliveData.lastReport.slice(0, 10);
    hourLastUpdateContent.innerHTML = `${dateReport} ${hourReport}`;
  }

  private chooseIconClass(stationData:any):string {
    if(stationData.timeWithoutReport <= 5){
      return SUCCES_ICON_CLASS;
    }else if(stationData.timeWithoutReport > 5 && stationData.timeWithoutReport <= 10){
      return WARNING_ICON_CLASS;
    }else{
      return DANGER_ICON_CLASS;
    }
  }

  private chooseCardBorderColor(stationData:any){
    if(stationData.timeWithoutReport <= 5){
      return SUCCES_COLOR;
    }else if(stationData.timeWithoutReport > 5 && stationData.timeWithoutReport <= 10){
      return WARNING_COLOR;
    }else{
      return DANGER_COLOR;
    }
  }

  private createOverlay(container: HTMLElement): Overlay{
    return new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
          duration: 250
      }
    });
  }

  private setupCloserButton(closerButton: HTMLElement, overlay:Overlay){
    closerButton.onclick = ()=> {
      this.hidePoup(closerButton, overlay);
      return false;
    };
  }

  private hidePoup(closerButton: HTMLElement, overlay:Overlay){
    overlay.setPosition(undefined);
    closerButton.blur();
  }


}
