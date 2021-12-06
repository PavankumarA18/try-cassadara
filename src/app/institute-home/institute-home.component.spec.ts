import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteHomeComponent } from './institute-home.component';

describe('InstituteHomeComponent', () => {
  let component: InstituteHomeComponent;
  let fixture: ComponentFixture<InstituteHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
