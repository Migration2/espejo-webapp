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
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');
   
    var overlay = new Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });
    map.addOverlay(overlay);
   
    closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };

    //click Event 
    map.on('singleclick', function (event) {
      overlay.setPosition(undefined);
      closer.blur();
      map.forEachFeatureAtPixel(event.pixel,(feature, layer) => {
        let indexStation:number = Number(feature.get("name"));
        let stationData = stationsData[indexStation];
        let coordinate = event.coordinate;
        content.innerHTML = `<b>${stationData.name}</b>`;
        overlay.setPosition(coordinate);
      });
      // if (map.hasFeatureAtPixel(event.pixel) === true) {
      //   var coordinate = event.coordinate;
 
      //   content.innerHTML = '<b>Hello world!</b><br />I am a popup.';
      //   overlay.setPosition(coordinate);
      // } else {
      //   overlay.setPosition(undefined);
      //   closer.blur();
      // }
    });
  }


}
