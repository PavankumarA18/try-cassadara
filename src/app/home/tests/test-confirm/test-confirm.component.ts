import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Test } from 'src/app/_models/test';
import { UserService } from 'src/app/_services/user.service';
import { first } from 'rxjs/operators';
import { Message } from 'src/app/_models/message';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './test-confirm.component.html',
  styleUrls: ['./test-confirm.component.css']
})
export class TestConfirmComponent implements OnInit {

  test: Test;
  title:string;
  constructor(protected dialogRef: NbDialogRef<any>, private userService: UserService) { }

  ngOnInit(): void {
    console.log("on Init "+JSON.stringify(this.test));
  }

  onSubmit(){
    var tId={};
    console.log('testId '+this.test.testId)
    tId['testId']=this.test.testId;

    console.log(tId);
    this.userService.deleteTest(tId).pipe(first()).subscribe(
      data=>{
        if(data.statusCode =200){
          
          this.close(this.test);
        }else{

        }
      },
      error =>{});
    }
    
      

  close(question){
    this.dialogRef.close(question);
  }

}
