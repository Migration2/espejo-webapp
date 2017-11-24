import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarTarjetaComponent } from './asignar-tarjeta.component';

describe('AsignarTarjetaComponent', () => {
  let component: AsignarTarjetaComponent;
  let fixture: ComponentFixture<AsignarTarjetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarTarjetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
