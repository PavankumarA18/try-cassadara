import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { CompletedTest } from 'src/app/_models/completedtest';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { StudentService } from 'src/app/_services/student.service';
import { StudentHomeComponent } from '../student-home.component';

@Component({
  selector: 'app-student-scores',
  templateUrl: './student-scores.component.html',
  styleUrls: ['./student-scores.component.css']
})
export class StudentScoresComponent implements OnInit {
  scores: CompletedTest[];

  constructor(
    private authService: AuthenticationService,
    private stuService: StudentService
  ) { }
  
  ngOnInit(): void {
    var obj={};
    obj['email']=this.authService.currentUserValue.email;
    this.stuService.getHistory(obj).pipe(first()).subscribe(
      data=>{
        if(data.statusCode == 200){
          this.scores=JSON.parse(data.message);
        }else {
          console.log(data.message);
        }
      },
      err=>{
        console.log(err);
      }
    )
  }

}
