import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarTotemComponent } from './administrar-totem.component';

describe('AdministrarTotemComponent', () => {
  let component: AdministrarTotemComponent;
  let fixture: ComponentFixture<AdministrarTotemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarTotemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarTotemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
