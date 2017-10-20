import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarInformacionGeneralComponent } from './administrar-informacion-general.component';

describe('AdministrarInformacionGeneralComponent', () => {
  let component: AdministrarInformacionGeneralComponent;
  let fixture: ComponentFixture<AdministrarInformacionGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarInformacionGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarInformacionGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
