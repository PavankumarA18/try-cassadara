import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Question } from 'src/app/_models/question';
import { UserService } from 'src/app/_services/user.service';
import { first } from 'rxjs/operators';
import { Message } from 'src/app/_models/message';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  question: Question;
  title:string;
  constructor(protected dialogRef: NbDialogRef<any>, private userService: UserService) { }

  ngOnInit(): void {
    console.log("on Init "+JSON.stringify(this.question));
  }

  onSubmit(){
    var qId={};
    console.log('questionId '+this.question.questionId)
    qId['questionId']=this.question.questionId;

    console.log(qId);
    this.userService.deleteQuestion(qId).pipe(first()).subscribe(
      data=>{
        if(data.statusCode =200){
          
          this.close(this.question);
        }else{

        }
      },
      error =>{});
    }
    
      

  close(question){
    this.dialogRef.close(question);
  }

}
