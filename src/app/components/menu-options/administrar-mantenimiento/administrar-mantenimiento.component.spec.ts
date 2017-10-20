import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarMantenimientoComponent } from './administrar-mantenimiento.component';

describe('AdministrarMantenimientoComponent', () => {
  let component: AdministrarMantenimientoComponent;
  let fixture: ComponentFixture<AdministrarMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
