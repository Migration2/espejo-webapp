import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AvailableBikeModel } from '../../../models/bicicleta.model';
import { PaginatePipe } from '../../../pipes/paginate.pipe';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';

import { PageEvent } from '@angular/material';
import { BiciService } from '../../../services/bici.service';

@Component({
  selector: 'app-available-bikes-table',
  templateUrl: './available-bikes-table.component.html',
  styleUrls: ['./available-bikes-table.component.css'],
  providers: [BiciService]
})
export class AvailableBikesTableComponent implements OnInit {

  @Output() selectedRow:EventEmitter<AvailableBikeModel>;

  //contact points
  public bikesData:Array<AvailableBikeModel> = [];
  public bikesDataForView:Array<AvailableBikeModel> = [];
  public bikesDataSouce: BikesDataSource;
  public displayedColumns:Array<string> = [ "codeCol","stateCol"];
  //pagination
  private paginatorPipe: PaginatePipe;
  public pageSize: number = 10;
  public pageNumber: number = 0;
  public pageSizeOptions = [5, 10, 20, 50, 100];
  public lengthBikes: number = 0; 
  //search
  public textToSearch:string ="";

  constructor(private bikesService: BiciService) { 
    this.paginatorPipe = new PaginatePipe(); 
    this.selectedRow = new EventEmitter();
  }

  ngOnInit() {
    this.loadAvailableBikesData();
  }

  private loadAvailableBikesData(){
    this.bikesService.getAvailableBikes().subscribe(bikesResponse =>{
      this.bikesData = bikesResponse;
      this.paginateBikesData(this.bikesData);
    }, 
    error => console.log("Error al acceder al recurso"));
  }

  private paginateBikesData(bikesData:Array<AvailableBikeModel>){
    this.lengthBikes = bikesData.length;
    this.bikesDataForView = this.paginatorPipe.transform(bikesData, this.pageSize, this.pageNumber);
    this.bikesDataSouce = new BikesDataSource(this.bikesDataForView);
  }

  public handlePage(pageEvent:PageEvent){
    this.pageSize = pageEvent.pageSize;
        this.pageNumber = pageEvent.pageIndex;
        this.paginateBikesData(this.bikesData);
  }

  /**
   * Capture selected row event
   * selectBike
   */
  public selectBike(bike: AvailableBikeModel) {
    this.textToSearch = "";
    this.selectedRow.emit(bike);
  }

  public searchBike(){  
    if(this.textToSearch){
      this.filterBikeData(this.textToSearch, this.bikesData);
    }else{
      this.paginateBikesData(this.bikesData);
    }
  }

  private filterBikeData(textFilter: string, bikesData:Array<AvailableBikeModel>){
    let copyBikesData: Array<AvailableBikeModel> = Object.assign([], bikesData);
    let filteredBikesData = copyBikesData.filter(bike => 
      bike.alias.toLowerCase().indexOf(textFilter.toLowerCase()) > -1);
    this.pageNumber = 0;
    this.paginateBikesData(filteredBikesData);
  }
}

export class BikesDataSource extends DataSource<any>{

  constructor(private availableBikes: AvailableBikeModel[]) {
    super();
  }

  connect(): Observable<AvailableBikeModel[]> {
    return Observable.of(this.availableBikes);
  }

  disconnect() { }

  public setAvailableBikes(availableBikes: AvailableBikeModel[]){
    this.availableBikes = availableBikes;
  }

}
