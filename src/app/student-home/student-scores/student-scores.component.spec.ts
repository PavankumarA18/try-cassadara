import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentScoresComponent } from './student-scores.component';

describe('StudentScoresComponent', () => {
  let component: StudentScoresComponent;
  let fixture: ComponentFixture<StudentScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
