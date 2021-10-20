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
  errorMessage: string;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.email="";
  }

  onForgot(){
    var obj={};
    if(this.email === "") return;
    var emailFormat = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    if(!this.email.match(emailFormat))
    {
     
      this.errorMessage="Incorrect email format";
      return;
    }

    obj['email']=this.email;
    this.userService.gentempPwd(obj).pipe(first()).subscribe(
      data=>{
        if(data.statusCode == 200){
          this.errorMessage="";
          this.message=data.message;
          this.email="";
        }else {
          this.errorMessage=data.message;
        }
      }
    )
  }

}
