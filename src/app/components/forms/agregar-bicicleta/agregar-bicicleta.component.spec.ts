import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarBicicletaComponent } from './agregar-bicicleta.component';

describe('AgregarBicicletaComponent', () => {
  let component: AgregarBicicletaComponent;
  let fixture: ComponentFixture<AgregarBicicletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarBicicletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarBicicletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
