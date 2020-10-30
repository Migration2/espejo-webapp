import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsPerStationChartComponent } from './transactions-per-station-chart.component';

describe('TransactionsPerStationChartComponent', () => {
  let component: TransactionsPerStationChartComponent;
  let fixture: ComponentFixture<TransactionsPerStationChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsPerStationChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsPerStationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
