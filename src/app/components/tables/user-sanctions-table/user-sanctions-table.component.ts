import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { PageEvent } from '@angular/material';

import { sancionesModel } from '../../../models/sanciones.model';
import { PaginatePipe } from '../../../pipes/paginate.pipe';

@Component({
  selector: 'app-user-sanctions-table',
  templateUrl: './user-sanctions-table.component.html',
  styleUrls: ['./user-sanctions-table.component.css']
})
export class UserSanctionsTableComponent implements OnInit {

  @Input() sanctionsData:Array<sancionesModel> = [];
  @Input() pageSize:number = 10;

  private sanctionsDataForView: Array<sancionesModel> = [];
  public sanctionsDataSource:SanctionsDataSource;
  public displayedColumns:Array<string> = [ "observation","initDate","endDate","state"];

  //PAGINATION
  lengthStations: number = 0;
  pageNumber: number = 0;
  pageSizeOptions = [5, 10, 20, 50, 100];
  private paginatorPipe: PaginatePipe;


 constructor() {
   this.paginatorPipe = new PaginatePipe();
  }

  ngOnInit() {
    if(this.sanctionsData && this.sanctionsData.length > 0){
      this.paginateStationData(this.sanctionsData, this.pageSize, this.pageNumber);
    }else{
      setTimeout(()=>{
        this.loadSanctionsDataTimeOut();
      }, 2000);
    }
  }

  private loadSanctionsDataTimeOut(){
    if(this.sanctionsData && this.sanctionsData.length > 0){
      this.paginateStationData(this.sanctionsData, this.pageSize, this.pageNumber);
    }else{
      setTimeout(()=>{
        this.paginateStationData(this.sanctionsData, this.pageSize, this.pageNumber);
      }, 5000);
    }
  }

  public handlePage(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.pageNumber = pageEvent.pageIndex;
    this.paginateStationData(this.sanctionsData, this.pageSize, this.pageNumber);
  }

  private paginateStationData(stationsData: Array<sancionesModel>, pageSize: number, pageNumber: number) {
    this.lengthStations = stationsData.length;
    this.sanctionsDataForView = this.paginatorPipe.transform(stationsData, pageSize, pageNumber);
    this.sanctionsDataSource = new SanctionsDataSource(this.sanctionsDataForView);
  }

}

export class SanctionsDataSource extends DataSource<any> {

  constructor(private sanctions: sancionesModel[]) {
    super();
  }

  connect(): Observable<sancionesModel[]> {
    return Observable.of(this.sanctions);
  }

  disconnect() { }
}
