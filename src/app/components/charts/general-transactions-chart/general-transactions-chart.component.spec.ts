import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTransactionsChartComponent } from './general-transactions-chart.component';

describe('GeneralTransactionsChartComponent', () => {
  let component: GeneralTransactionsChartComponent;
  let fixture: ComponentFixture<GeneralTransactionsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralTransactionsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTransactionsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
