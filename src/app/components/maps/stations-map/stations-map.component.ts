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

import { EstacionService } from '../../../services/estacion.service';


export const DEFAULT_ANCHOR = [0.5, 1];
export const DEFAULT_ICON = '../../../../assets/images/iconMin.png';

@Component({
  selector: 'app-stations-map',
  templateUrl: './stations-map.component.html',
  styleUrls: ['./stations-map.component.css'],
  providers: [EstacionService]
})
export class StationsMapComponent implements OnInit {

  map: Map;
  anchor: number[] = DEFAULT_ANCHOR;
  icon: string = DEFAULT_ICON;
  public stationsData: Array<any> = [];

  constructor(private stationsService: EstacionService) {
    
  }

  ngOnInit() {
    this.map = this.createOpenLayerMap();
    this.loadStationsData();
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


  

  initPoupEvent(map:Map, stationsData: Array<any>){
    let dangerColor:string = "#B51F29";
    let succesColor:string = "#28a745";
    let warningColor:string = "#ffc107";

    let dangerIconClass:string ="oi oi-circle-x text-danger icon-md";
    let succesIconClass:string ="oi oi-circle-check text-success icon-md";
    let warningIconClass:string ="oi oi-warning text-warning icon-md";
    
    let container: HTMLElement = document.getElementById('popup');
    let iconStatusContainer: HTMLElement = document.getElementById('iconStatus');
    var nameStationContent = document.getElementById('nameStation');
    var closer = document.getElementById('popup-closer');
    let overlay: Overlay = this.createOverlay(container);
    
    map.addOverlay(overlay);
    this.setupCloserButton(closer, overlay);

    //click Event 
    map.on('singleclick', (event) => {
      this.hidePoup(closer, overlay);
      map.forEachFeatureAtPixel(event.pixel,(feature, layer) => {
        let indexStation:number = Number(feature.get("name"));
        let stationData = stationsData[indexStation];
        let coordinate = event.coordinate;
        nameStationContent.innerHTML= `${stationData.name}`;
        iconStatusContainer.className = succesIconClass;
        container.style.borderLeftColor = succesColor;
        overlay.setPosition(coordinate);
      });
    });
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
