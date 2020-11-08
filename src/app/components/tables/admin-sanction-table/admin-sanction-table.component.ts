import { DataSource } from '@angular/cdk/table';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { PaginatePipe } from '../../../pipes/paginate.pipe';

@Component({
  selector: 'app-admin-sanction-table',
  templateUrl: './admin-sanction-table.component.html',
  styleUrls: ['./admin-sanction-table.component.css']
})
export class AdminSanctionTableComponent implements OnInit, OnDestroy {

  @Output() selectRowEvt:EventEmitter<any>;
  @Input() dataEvent$:EventEmitter<any> = new EventEmitter();

  //contact points
  public data:Array<any> = [];
  public dataForView:Array<any> = [];
  public dataSouce: SanctionDataSource;
  public displayedColumns:Array<string> = [ "codeCol","stateCol", "descriptionCol"];
  //pagination
  private paginatorPipe: PaginatePipe;
  public pageSize: number = 10;
  public pageNumber: number = 0;
  public pageSizeOptions = [5, 10, 20, 50, 100];
  public lengthData: number = 0; 
  //subscription
  subsciptionData: PushSubscription;

  constructor() {
    this.paginatorPipe = new PaginatePipe();
    this.selectRowEvt = new EventEmitter();
   }

  ngOnInit() {
    // this.paginateData(this.data);
    this.loadData();
  }

  private loadData(){
    this.subsciptionData = this.dataEvent$.subscribe(res =>{
      this.paginateData(res);
    });
  }

  private paginateData(data:Array<any>){
    this.lengthData = data.length;
    this.dataForView = this.paginatorPipe.transform(data, this.pageSize, this.pageNumber);
    this.dataSouce = new SanctionDataSource(this.dataForView);
  }

  public handlePage(pageEvent:PageEvent){    
    this.pageSize = pageEvent.pageSize;
        this.pageNumber = pageEvent.pageIndex;
        this.paginateData(this.data);
  }

    /**
    * handle envent select row
    * @param dataSelected object selected
    */
   public selectRow(dataSelected: any) {
    this.selectRowEvt.emit(dataSelected);
  }

  ngOnDestroy(): void {
    this.subsciptionData.unsubscribe();
  }

}

export class SanctionDataSource extends DataSource<any>{

  constructor(private availableBikes: any[]) {
    super();
  }

  connect(): Observable<any[]> {
    return Observable.of(this.availableBikes);
  }

  disconnect() { }

  public setAvailableBikes(availableBikes: any[]){
    this.availableBikes = availableBikes;
  }

}
