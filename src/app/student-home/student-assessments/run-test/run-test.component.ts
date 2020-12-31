import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StudentService } from 'src/app/_services/student.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NbDialogRef, NbRadioGroupComponent, NbRadioComponent, NbButtonComponent } from '@nebular/theme';
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
  isComplete=false;
  canClose=false;
  format="00:00";
  count=0;
  startedTime:Date;
  curQn: Question;
  selectedAns: string;
  scores: number[];
  times: number[];
  finalScore=0;
  timeTaken=0;
  sOptA:any;
  sOptB:any;
  sOptC:any;
  sOptD:any;
  btnTxt='Next';
  constructor(
    private authService: AuthenticationService,
    private stuService: StudentService,
    private dialogRef: NbDialogRef<any>) { }

  ngOnInit(): void {

    this.chronometer=new Chronometer();
    this.scores=[];
    this.times=[];
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
    this.shuffleOpt();
    this.chronometer.maxMinute=this.curQn.mark;
    this.chronometer.start();
    this.startedTime=new Date();
  }

  onDone(){
    if(this.isComplete == true){
      this.dialogRef.close();
    }
    
    if(this.selectedAns === this.curQn.correct){
      this.scores.push(this.curQn.mark);
      this.times.push(this.chronometer.time[2]);
    }else{
      this.scores.push(0);
      this.times.push(this.chronometer.time[2]);
    }
    console.log(this.times);
    this.count++;
    if(this.count<this.questions.length){
     
      this.radA.input.nativeElement.checked=false;
      this.radB.input.nativeElement.checked=false;
      this.radC.input.nativeElement.checked=false;
      this.radD.input.nativeElement.checked=false;
      this.curQn=this.questions[this.count];
      this.shuffleOpt();
      this.chronometer.maxMinute=this.curQn.mark;
      this.chronometer.restart();
    }else{
      this.chronometer.stop();
      for(var i=0;i<this.scores.length;i++){
        this.finalScore+=this.scores[i];
      }
      for(var i=0;i<this.times.length;i++){
        this.timeTaken+=this.times[i];
      }
      var obj={};
      obj['testId']=this.test.testId;
      obj['testName']=this.test.testName;
      obj['testType']=this.test.testType;
      obj['creator']=this.test.creator;
      obj['startedTime']=this.startedTime.toISOString();
      obj['email']=this.authService.currentUserValue.email;
      obj['score']=this.finalScore;
      obj['timeTaken']=this.timeTaken;

      this.stuService.logCompletedTest(obj).pipe(first()).subscribe(
        data=>{
          if(data.statusCode == 200){
            console.log(data.message);
          }else{
            console.log(data.message);
          }
          
        },err=>{
          console.log(err);
        }

      )
      
      this.btnTxt='Close';
      this.isComplete=true;
      //this.dialogRef.close(); 
    }
     
  }

  onChronoEvent(chronometer: Chronometer) {
    if(chronometer.time[2] == this.curQn.mark*60 -1){
      if(this.selectedAns === this.curQn.correct){
        this.scores.push(this.curQn.mark);
        
      }else{
        this.scores.push(0);
      }
      this.times.push(this.curQn.mark*60);
      console.log(this.times);
      this.count++;
      this.radA.input.nativeElement.checked=false;
      this.radB.input.nativeElement.checked=false;
      this.radC.input.nativeElement.checked=false;
      this.radD.input.nativeElement.checked=false;
      this.curQn=this.questions[this.count];
      this.shuffleOpt();
      this.chronometer.maxMinute=this.curQn.mark;
      this.chronometer.restart();
    }
  }

  shuffleOpt() {
   var a=['a','b','c','d'];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }

    for(var i=0;i<a.length;i++){
      var obj={};
      obj['val']=a[i];
      if(a[i]==='a'){
        obj['ans']=this.curQn.a;
      }else if(a[i]==='b'){
        obj['ans']=this.curQn.b;
      }else if(a[i]==='c'){
        obj['ans']=this.curQn.c;
      }else if(a[i]==='d'){
        obj['ans']=this.curQn.d;
      }

      if(i==0){
        this.sOptA=obj;
      }else if(i==1){
        this.sOptB=obj;
      }else if(i==2){
        this.sOptC=obj;
      }else if(i==3){
        this.sOptD=obj;
      }

    }
  }

  
}


