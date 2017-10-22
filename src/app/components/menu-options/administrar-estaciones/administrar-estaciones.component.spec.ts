import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarEstacionesComponent } from './administrar-estaciones.component';

describe('AdministrarEstacionComponent', () => {
  let component: AdministrarEstacionesComponent;
  let fixture: ComponentFixture<AdministrarEstacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarEstacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarEstacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
