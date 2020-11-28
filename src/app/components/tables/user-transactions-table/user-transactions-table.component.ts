import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { PageEvent } from '@angular/material';

import { PaginatePipe } from '../../../pipes/paginate.pipe';

@Component({
  selector: 'app-user-transactions-table',
  templateUrl: './user-transactions-table.component.html',
  styleUrls: ['./user-transactions-table.component.css']
})
export class UserTransactionsTableComponent implements OnInit {

  @Input() transactionsData:Array<any> = [];
  @Input() pageSize:number = 10;

  private transactionsDataForView: Array<any> = [];
  public transactionsDataSource:TransactionsDataSource;
  public displayedColumns:Array<string> = [ "loanStation","startDate","returnStation","endDate"];

  //PAGINATION
  lengthTransactions: number = 0;
  pageNumber: number = 0;
  pageSizeOptions = [5, 10, 20, 50, 100];
  private paginatorPipe: PaginatePipe;

  constructor() {
   this.paginatorPipe = new PaginatePipe();
  }

  ngOnInit() {
    if(this.transactionsData && this.transactionsData.length > 0){
      this.paginateTransactionsData(this.transactionsData, this.pageSize, this.pageNumber);
    }else{
      setTimeout(()=>{
        this.loadTransactionsDataWithTimeOut();
      }, 2000);
    }
  }

  private loadTransactionsDataWithTimeOut(){
    if(this.transactionsData && this.transactionsData.length > 0){
      this.paginateTransactionsData(this.transactionsData, this.pageSize, this.pageNumber);
    }else{
      setTimeout(()=>{
        this.paginateTransactionsData(this.transactionsData, this.pageSize, this.pageNumber);
      }, 5000);
    }
  }

  public handlePage(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.pageNumber = pageEvent.pageIndex;
    this.paginateTransactionsData(this.transactionsData, this.pageSize, this.pageNumber);
  }

  private paginateTransactionsData(transactionsData: Array<any>, pageSize: number, pageNumber: number) {
    this.lengthTransactions = transactionsData.length;
    this.transactionsDataForView = this.paginatorPipe.transform(transactionsData, pageSize, pageNumber);
    this.transactionsDataSource = new TransactionsDataSource(this.transactionsDataForView);
  }

}

export class TransactionsDataSource extends DataSource<any> {

  constructor(private sanctions: any[]) {
    super();
  }

  connect(): Observable<any[]> {
    return Observable.of(this.sanctions);
  }

  disconnect() { }
}
