import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarEstacionComponent } from './administrar-estacion.component';

describe('AdministrarEstacionComponent', () => {
  let component: AdministrarEstacionComponent;
  let fixture: ComponentFixture<AdministrarEstacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarEstacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarEstacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
