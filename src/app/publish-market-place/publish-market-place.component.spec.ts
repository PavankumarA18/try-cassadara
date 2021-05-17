import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishMarketPlaceComponent } from './publish-market-place.component';

describe('PublishMarketPlaceComponent', () => {
  let component: PublishMarketPlaceComponent;
  let fixture: ComponentFixture<PublishMarketPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishMarketPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishMarketPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
