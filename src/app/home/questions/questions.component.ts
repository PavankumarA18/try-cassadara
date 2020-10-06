import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { first } from 'rxjs/operators';
import { Question } from 'src/app/_models/question';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { LocalDataSource } from 'ng2-smart-table';
import { User } from 'src/app/_models/user';
import { UserSetting } from 'src/app/_models/UserSetting';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  configMsg:string;
  userSettings:UserSetting;
  selectedSystem:string;
  selectedClass:string;
  selectedSubject:string;
  questions:Question[];
  source: LocalDataSource;
  error:any;
  Uniqchapters:string[];
  settings = {
    hideSubHeader:false,
    columns: {
      chapter: {
        title: 'Chapter',
        editable: false,
        sort: true,
        sortDirection:'asc',
        filter: true
      },
      question: {
        title: 'Question',
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
      perPage: 10
    }
  };
  constructor(
    private authenticationService: AuthenticationService, 
    private userService: UserService,
    private nbDialogService: NbDialogService
  ) { }

  ngOnInit(): void {
   
    
    if("userSettings" in this.authenticationService.currentUserValue){
      
      this.userSettings=this.authenticationService.currentUserValue.userSettings.find(x => x.teacher==='self');

    }else{
        this.userSettings=null;
    }
  }

  onViewQuestion(){
    var qry={};
    qry['email']=this.authenticationService.currentUserValue.email;
    qry['eduSystem']=this.userSettings.eduSystem[this.selectedSystem];
    qry['grade']=this.userSettings.grade[this.selectedClass];
    qry['subject']=this.userSettings.subject[this.selectedSubject];

    this.userService.getQuestions(qry)
    .pipe(first()).subscribe(
      data => {
        if(data.statusCode == 200){
          this.questions=JSON.parse(data.message)
          this.source=new LocalDataSource(this.questions);
          var chapters=[];
          for(var i=0;i<this.questions.length;i++){
            chapters.push(this.questions[i].chapter);
          }
          this.Uniqchapters= this.unique(chapters);
          console.log('uniq chapters '+JSON.stringify(this.Uniqchapters));
        }
        
      },
      err =>{
        this.error=err;
      
    });

  }

   unique(arr) {
    var u = {}, a = [];
    for(var i = 0, l = arr.length; i < l; ++i){
        if(!u.hasOwnProperty(arr[i])) {
            a.push(arr[i]);
            u[arr[i]] = 1;
        }
    }
    return a;
}

  onCustomAction(event){
    switch(event.action){
      case 'editRec':
        this.nbDialogService.open(QuestionDialogComponent,{
          context: {
            submitQuestion: event.data,
            chapter: event.data.chapter,
            question: event.data.question,
            a: event.data.a,
            b: event.data.b,
            c: event.data.c,
            d: event.data.d,
            correct: event.data.correct,
            mark: event.data.mark,
            hasImg:event.data.hasImg,
            retImageUrl: event.data.image,
            isAddNew: false

          },
          hasScroll: true
        }).onClose.subscribe(
          data =>{
            if(data){
              this.questions[this.questions.findIndex(v => v.questionId === data.questionId)]=data;
              this.source=new LocalDataSource(this.questions);
            }
          }
        )
        break;
      case 'deleteRec':
        console.log('event data '+JSON.stringify(event.data));
        this.nbDialogService.open(ConfirmDialogComponent,{
          context:{
            title: 'Confirm Delete Question',
            question: event.data
          }
        }).onClose.subscribe(
          data =>{
            if(data){
              console.log('Index'+this.questions.findIndex(v => v.questionId === data.questionId))
              this.questions.splice(this.questions.findIndex(v => v.questionId === data.questionId),1);
              this.source=new LocalDataSource(this.questions)
              
            }
          }
        )
        break;
    }
  }

  onAddNew(){
      this.nbDialogService.open(QuestionDialogComponent,{
        context: {
          uniqChapters: this.Uniqchapters,
          selectedEmail: this.authenticationService.currentUserValue.email,
          selectedSystem: this.userSettings.eduSystem[this.selectedSystem],
          selectedClass: this.userSettings.grade[this.selectedClass],
          selectedSubject: this.userSettings.subject[this.selectedSubject],
          isAddNew: true
        },
        hasScroll: true
      }).onClose.subscribe(
        data =>{
          if(this.questions && data){
            this.questions=this.questions.concat(data);
            this.source=new LocalDataSource(this.questions)
          }
        }
      )
  }

  isAdd(){
    return !(this.selectedSystem!=null && this.selectedSubject != null && this.selectedClass!=null);
     
 
  }

}
