import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/_models/Test';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { NbDialogRef } from '@nebular/theme';
import { first } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './test-dialog.component.html',
  styleUrls: ['./test-dialog.component.css']
})
export class TestDialogComponent implements OnInit {

  testRecord: Test;
  min:Date;
  max:Date;
  min2:Date;
  max2:Date;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private dialogRef: NbDialogRef<any>
  ) { }

  ngOnInit(): void {
    this.min=new Date();
    this.max=new Date();
    this.max.setMonth(this.min.getMonth()+3);
    this.min2=new Date();
    this.min2.setHours(this.min.getHours()+1);
    this.max2=new Date();
    this.max2.setMonth(this.min2.getMonth()+3);
  }

  onTestUpdate(){
    console.log(JSON.stringify(this.testRecord));
    this.userService.updateTest(this.testRecord).pipe(first()).subscribe(
      data=>{
        if(data.statusCode == 200){
            this.dialogRef.close(this.testRecord);
        }else{
          console.log(data.message);
        }

      },
      err=>{
        console.log(err);
      }
    )
  }

}
