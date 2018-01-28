import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SancionesComponent } from './sanciones.component';

describe('SancionesComponent', () => {
  let component: SancionesComponent;
  let fixture: ComponentFixture<SancionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SancionesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
