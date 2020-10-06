import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StudentService } from 'src/app/_services/student.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NbDialogRef, NbRadioGroupComponent, NbRadioComponent } from '@nebular/theme';
import { Test } from 'src/app/_models/Test';
import { Question } from 'src/app/_models/question';
import { first } from 'rxjs/operators';
import { Chronometer } from 'ngx-chronometer';

@Component({
  selector: 'app-run-test',
  templateUrl: './run-test.component.html',
  styleUrls: ['./run-test.component.css']
})
export class RunTestComponent implements OnInit {

  @ViewChild('radA') radA: NbRadioComponent;
  @ViewChild('radB') radB: NbRadioComponent;
  @ViewChild('radC') radC: NbRadioComponent;
  @ViewChild('radD') radD: NbRadioComponent;
  test: Test;
  questions: Question[];
  chronometer: Chronometer;
  isStart=true;
  format="00:00";
  count=0;
  curQn: Question;
  constructor(
    private authService: AuthenticationService,
    private stuService: StudentService,
    private dialogRef: NbDialogRef<any>) { }

  ngOnInit(): void {

    this.chronometer=new Chronometer();

    if(!this.test.randomQuestions){
      this.questions=this.test.questions;
    }else {
      var obj={};
      obj['creator']=this.test.creator;
      obj['eduSystem']=this.test.eduSystem;
      obj['grade']=this.test.grade;
      obj['subject']=this.test.subject;
      obj['chapters']=this.test.chapters;
      obj['testType']=this.test.testType;
      console.log(obj);
      this.stuService.getRandomQuestions(obj).pipe(first()).subscribe(
        data => {
          console.log(data);
          if(data.statusCode == 200){
            this.questions=JSON.parse(data.message);
          }else {
            console.log(data.message);
          }
        },
        err => {
          console.log(err);
        }
      )

    }
 }

  startRun(){
    this.isStart=false;
    this.curQn=this.questions[this.count];
    this.chronometer.maxMinute=this.curQn.mark;
    this.chronometer.start();
  }

  onDone(){
    this.count++;
    if(this.count<this.questions.length){
      this.radA.input.nativeElement.checked=false;
      this.radB.input.nativeElement.checked=false;
      this.radC.input.nativeElement.checked=false;
      this.radD.input.nativeElement.checked=false;
      this.curQn=this.questions[this.count];
    }else{
      this.dialogRef.close(); 
    }
     
  }

}
