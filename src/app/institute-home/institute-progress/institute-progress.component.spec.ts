import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteProgressComponent } from './institute-progress.component';

describe('InstituteProgressComponent', () => {
  let component: InstituteProgressComponent;
  let fixture: ComponentFixture<InstituteProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
