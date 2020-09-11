import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestConfirmComponent } from './test-confirm.component';

describe('TestConfirmComponent', () => {
  let component: TestConfirmComponent;
  let fixture: ComponentFixture<TestConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
