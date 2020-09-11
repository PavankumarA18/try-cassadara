import { Component, OnInit } from '@angular/core';
import {Test } from '../../_models/Test'
import { UserSetting } from 'src/app/_models/UserSetting';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { first } from 'rxjs/operators';
import { NbDialogService } from '@nebular/theme';
import { SelectQuestionComponent } from './select-question/select-question.component';
import { SelectStudentComponent } from './select-student/select-student.component';
import { pipe } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { TestDialogComponent } from './test-dialog/test-dialog.component';
import { TestConfirmComponent } from './test-confirm/test-confirm.component';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  
  loading=false;
  error2=true;
  error21=true;
  error3=true;
  defaultChecked=true;
  error2msg:string;
  newTest:Test;
  userSettings:UserSetting;
  uniqChapters: string[];
  selectedSystem:string;
  selectedClass:string;
  selectedSubject:string;
  selectedSystem1:string;
  selectedClass1:string;
  selectedSubject1:string;
  min:Date;
  max:Date;
  min2:Date;
  max2:Date;
  startTime:string;
  endTime:string;
  tests: Test[];

  source: LocalDataSource;

  settings = {
    columns: {
      testName: {
        title: 'Assessment Name',
        
      },
      testDescription: {
        title: 'Description',
        editable: false,
        filter: false
      }
      
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'editRec', title: '<img src=assets/img/nb-edit.svg width=30 height=30>'},
        { name: 'deleteRec', title: '<img src=assets/img/nb-trash.svg width=30 height=30>' }
      ],
      position: 'right'
    },
    pager:{
      display: true,
      perPage: 5
    }
  };
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private nbDialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.newTest= new Test();
    this.newTest.testName='';
    this.newTest.creator=this.authenticationService.currentUserValue.email;
    this.uniqChapters=[];
    this.newTest.chapters=[];
    this.newTest.testType="";
    this.newTest.randomQuestions=true;
    this.newTest.allStudents=true;
    this.min=new Date();
    this.max=new Date();
    this.max.setMonth(this.min.getMonth()+3);
    this.min2=new Date();
    this.min2.setHours(this.min.getHours()+1);
    this.max2=new Date();
    this.max2.setMonth(this.min2.getMonth()+3);
    this.startTime="";
    this.endTime="";
    this.tests=new Array();
    console.log(this.max);
    if("userSettings" in this.authenticationService.currentUserValue){
      
      this.userSettings=this.authenticationService.currentUserValue.userSettings.find(x => x.teacher==='self');

    }else{
        this.userSettings=null;
    }

  }

  onGo(){
    if(this.selectedSystem && this.selectedClass && this.selectedSubject)this.error2=false;
    
    
    if(!this.error2){
      this.loading=true;
    this.newTest.eduSystem = this.userSettings.eduSystem[this.selectedSystem];
    this.newTest.grade = this.userSettings.grade[this.selectedClass];
    this.newTest.subject = this.userSettings.subject[this.selectedSubject];
    var sub={};
    sub['email']=this.authenticationService.currentUserValue.email;
    sub['eduSystem']=this.newTest.eduSystem;
    sub['grade']=this.newTest.grade;
    sub['subject']=this.newTest.subject;
    this.userService.getUniqueChapters(sub).pipe(first()).subscribe(
      data => {
        if(data.statusCode == 200){
          this.uniqChapters = JSON.parse(data.message);
          this.loading=false;
        }else{
          console.log(data.message);
          this.loading=false;
        }
      },
      err =>{
        console.log(err);
        this.loading=false;
      }
    )
    }else{
      this.error2msg="please select system, class and subject";
      
    }
  }

  onClickChapters(event){
    if(event.target.checked){
      if(!this.newTest.chapters) this.newTest.chapters=new Array();
      this.newTest.chapters.push(event.target.name);
    }else{
      this.newTest.chapters.splice(this.newTest.chapters.indexOf(event.target.name), 1);
    }
    if(this.newTest.chapters.length == 0){
      this.error21=true
    }else{
      this.error21=false;
    }
  }

   isError2(){
    return this.error2;
   }

  onNameForm(){
    console.log(this.newTest);
    return true;
  }

  onContentForm(){
   console.log(this.newTest);
   this.error2=true;
  }

  showQuestions(){
    this.nbDialogService.open(SelectQuestionComponent, {
      context:{
        newTest: this.newTest
      }
    });
  }
  
  showStudents(){
    this.nbDialogService.open(SelectStudentComponent,{
      context:{
        newTest: this.newTest
      }
    });
  }

  createTest(){
    //this.newTest.canList=true;
    this.userService.createTest(this.newTest).pipe(first()).subscribe(
      data=>{
        if(data.statusCode == 200){
          this.newTest= new Test();
          this.newTest.testName='';
          this.uniqChapters=[];
          this.newTest.chapters=[];
          this.newTest.testType="";
          this.newTest.randomQuestions=true;
          this.newTest.allStudents=true;
          this.newTest.creator=this.authenticationService.currentUserValue.email;
          return true;
        }else {
          console.log(data.message);
          return false;
        }
      },
      err=>{
        console.log(err);
        return false;
      }
    );
  }

  onFindTests(){
    var parm={};
    parm['email']=this.authenticationService.currentUserValue.email;
    parm['eduSystem']=this.userSettings.eduSystem[this.selectedSystem1];
    parm['grade'] = this.userSettings.grade[this.selectedClass1];
    parm['subject'] = this.userSettings.subject[this.selectedSubject1];

    this.userService.getTestsForCreator(parm).pipe(first()).subscribe(
      data=>{
        if(data.statusCode == 200){
          this.tests = JSON.parse(data.message);
          this.source = new LocalDataSource(this.tests);
        }else {
          console.log(data.message);
        }

      },
      err=>{
        console.log(err);
      }
    )
  }

  onCustomAction(event){
    switch(event.action){
      case 'editRec':
        this.nbDialogService.open(TestDialogComponent,{
          context:{
            testRecord: event.data
          }
        }).onClose.subscribe(
          data=>{
            if(data){
              this.tests[this.tests.findIndex(v => v.testId === data.testId)]=data;
              this.source=new LocalDataSource(this.tests);
            }
          }
        )
        break;
        case 'deleteRec':
          this.nbDialogService.open(TestConfirmComponent,{
            context:{
              test: event.data,
              title: 'Confirm Delete Test'
            }
          }).onClose.subscribe(
            data=>{
              if(data){
                this.tests.splice(this.tests.findIndex(v => v.testId === data.testId),1);
                this.source=new LocalDataSource(this.tests);
              }
            }
          )
          break;
        
        break;
      }

  }

}
