import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarPuntosAnclajeComponent } from './administrar-puntos-anclaje.component';

describe('AdministrarPuntosAnclajeComponent', () => {
  let component: AdministrarPuntosAnclajeComponent;
  let fixture: ComponentFixture<AdministrarPuntosAnclajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarPuntosAnclajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarPuntosAnclajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
