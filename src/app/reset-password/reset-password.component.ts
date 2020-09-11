import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email:string;
  message: string;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.email="";
  }

  onForgot(){
    var obj={};
    if(this.email === "") return;
    obj['email']=this.email;
    this.userService.gentempPwd(obj).pipe(first()).subscribe(
      data=>{
        if(data.statusCode == 200){
          this.message=data.message;
        }else {
          this.message=data.message;
        }
      }
    )
  }

}
