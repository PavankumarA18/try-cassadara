import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { StudentService} from '../../_services/student.service';
import { first } from 'rxjs/operators';
import { Test } from 'src/app/_models/Test';
import { NbDialogService } from '@nebular/theme';
import { RunTestComponent } from './run-test/run-test.component';

@Component({
  selector: 'app-student-assessments',
  templateUrl: './student-assessments.component.html',
  styleUrls: ['./student-assessments.component.css']
})
export class StudentAssessmentsComponent implements OnInit {

  tests: Test[];
  constructor(
    private authService: AuthenticationService, 
    private stuService: StudentService,
    private nbDialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    var obj={};
    obj['email']=this.authService.currentUserValue.email;
    this.stuService.getTests(obj).pipe(first()).subscribe(
      data => {
        if(data.statusCode == 200){
          this.tests = JSON.parse(data.message);
        }else {
          console.log(data.message);
        }
      },
      err=>{
        console.log(err);
      }
    )
  }

  hasEnded(test: Test){
   
    if(new Date().getTime() > new Date(test.startDateTime).getTime() && new Date().getTime() < new Date(test.endDateTime).getTime() ){ return true;}else { return false; }
  }

  startTest(testEvent: Test){
    this.nbDialogService.open(RunTestComponent,{
      context:{
        test: testEvent
      },
      hasScroll:true,
      closeOnBackdropClick: false,
      closeOnEsc: false

    });
  }

}
