import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssessmentsComponent } from './student-assessments.component';

describe('StudentAssessmentsComponent', () => {
  let component: StudentAssessmentsComponent;
  let fixture: ComponentFixture<StudentAssessmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAssessmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
