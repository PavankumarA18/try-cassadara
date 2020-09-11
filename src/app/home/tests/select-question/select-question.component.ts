import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/_models/Test';
import { UserService } from 'src/app/_services/user.service';
import { NbDialogRef } from '@nebular/theme';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Question } from 'src/app/_models/question';
import { first } from 'rxjs/operators';
import { TheadFitlersRowComponent } from 'ng2-smart-table/lib/components/thead/rows/thead-filters-row.component';

@Component({
  selector: 'app-select-question',
  templateUrl: './select-question.component.html',
  styleUrls: ['./select-question.component.css']
})
export class SelectQuestionComponent implements OnInit {

  newTest:Test;
  loadedQuestions: Question[];
  qnCount: number;
  toSelect:number;
  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private dialogRef: NbDialogRef<any>
  ) { }

  ngOnInit(): void {

    this.newTest.questions=new Array();
    this.qnCount=0;
    this.toSelect=this.newTest.testType==='slip'?10-this.qnCount:30-this.qnCount;
    var chap={};
    chap['email']=this.authService.currentUserValue.email;
    chap['eduSystem']=this.newTest.eduSystem;
    chap['grade']=this.newTest.grade;
    chap['subject']=this.newTest.subject;
    chap['chapters']=[].concat(this.newTest.chapters);
    this.userService.getQuestionsForChapters(chap).pipe(first()).subscribe(
      data=>{
        if(data.statusCode==200){
          this.loadedQuestions=JSON.parse(data.message);
          
        }else{
          console.log(data.message);
        }
      },err=>{
        console.log(err);
      }
    )
  }

  

  onClickQn(event){
    if(event.target.checked){
      if(!this.newTest.questions) this.newTest.questions=new Array();
      this.newTest.questions.push(this.loadedQuestions.find(x => x.questionId == event.target.name));
     this.toSelect--;
    } else {
      this.newTest.questions.splice(this.newTest.questions.indexOf(event.target.name),1);
     // this.loadedQuestions.find(x => x.questionId === event.target.name);
      this.toSelect++;
    }

  }

  onCloseBtn(){
    if(this.toSelect>0) return;
    console.log(this.newTest);
    this.dialogRef.close();
  }

}
