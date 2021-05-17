import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishmarketconfirmComponent } from './publishmarketconfirm.component';

describe('PublishmarketconfirmComponent', () => {
  let component: PublishmarketconfirmComponent;
  let fixture: ComponentFixture<PublishmarketconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishmarketconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishmarketconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
