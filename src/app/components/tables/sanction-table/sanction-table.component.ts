import { Component, Input, OnInit } from '@angular/core';
import { sancionesModel } from '../../../models/sanciones.model';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { PaginatePipe } from '../../../pipes/paginate.pipe';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-sanction-table',
  templateUrl: './sanction-table.component.html',
  styleUrls: ['./sanction-table.component.css']
})
export class SanctionTableComponent implements OnInit {

  @Input() sanctionsData:Array<sancionesModel> = [];

  private sanctionsDataForView: Array<sancionesModel> =[];
  public sanctionsDataSource:SanctionsDataSource;
  public displayedColumns:Array<string> = [ "name","document","initSanction","endSanction"];

   //PAGINATION
   lengthStations: number = 0;
   pageSize: number = 20;
   pageNumber: number = 0;
   pageSizeOptions = [5, 10, 20, 50, 100];
   private paginatorPipe: PaginatePipe;


  constructor() {
    this.paginatorPipe = new PaginatePipe();
   }

  ngOnInit() {
    console.log(this.sanctionsData);
    
    this.sanctionsDataSource = new SanctionsDataSource(this.sanctionsData);
  }

  public sanctionDetails(sanction:any){
    console.log("sanction details..."); 
  }

  public handlePage(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.pageNumber = pageEvent.pageIndex;
    this.paginateStationData(this.sanctionsData, this.pageSize, this.pageNumber);
  }

  private paginateStationData(stationsData: Array<sancionesModel>, pageSize: number, pageNumber: number) {
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
