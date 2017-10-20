import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarBicicletasComponent } from './administrar-bicicletas.component';

describe('AdministrarBicicletasComponent', () => {
  let component: AdministrarBicicletasComponent;
  let fixture: ComponentFixture<AdministrarBicicletasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarBicicletasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarBicicletasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
