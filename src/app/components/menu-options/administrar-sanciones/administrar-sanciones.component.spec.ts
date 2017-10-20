import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarSancionesComponent } from './administrar-sanciones.component';

describe('AdministrarSancionesComponent', () => {
  let component: AdministrarSancionesComponent;
  let fixture: ComponentFixture<AdministrarSancionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarSancionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarSancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
