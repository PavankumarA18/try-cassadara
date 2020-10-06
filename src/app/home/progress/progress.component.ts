import { Component, OnInit } from '@angular/core';
import {CompletedTest } from '../../_models/completedtest'
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  completedTests: CompletedTest[];
  constructor(private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {
    var obj={};
    obj['email']=this.authService.currentUserValue.email;
    this.userService.getHistory(obj).pipe(first()).subscribe(
      data =>{
        if(data.statusCode == 200){
          this.completedTests = JSON.parse(data.message);
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
