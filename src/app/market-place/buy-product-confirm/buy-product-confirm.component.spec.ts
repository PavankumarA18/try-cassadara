import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyProductConfirmComponent } from './buy-product-confirm.component';

describe('BuyProductConfirmComponent', () => {
  let component: BuyProductConfirmComponent;
  let fixture: ComponentFixture<BuyProductConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyProductConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyProductConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
