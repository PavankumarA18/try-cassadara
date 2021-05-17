import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcAvenueRedirectComponent } from './cc-avenue-redirect.component';

describe('CcAvenueRedirectComponent', () => {
  let component: CcAvenueRedirectComponent;
  let fixture: ComponentFixture<CcAvenueRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcAvenueRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcAvenueRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
