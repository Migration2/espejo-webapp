import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoAnclajeComponent } from './punto-anclaje.component';

describe('PuntoAnclajeComponent', () => {
  let component: PuntoAnclajeComponent;
  let fixture: ComponentFixture<PuntoAnclajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntoAnclajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntoAnclajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
