import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  email: string;
  password:string;
  confirmPassword:string;
  message:string;
  successMessage: string;
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void{
    this.email = this.route.snapshot.params.email;
    this.password="";
    this.confirmPassword="";
    this.message ="";
    this.successMessage="";
    console.log('got email '+this.email);
  }

  onUpdatePwd(){

    var pwdLength = 6;
    if(this.password.length < pwdLength)
    {
     
      this.message="Password should be at least 6 characters long";
      return;
    }

    if(this.password === this.confirmPassword){
      var obj={};
      obj['email']=this.email;
      obj['password']=this.password;
      this.userService.updatePwd(obj).pipe(first()).subscribe(
        data=>{
          if(data.statusCode == 200){
            this.successMessage=data.message;
            this.message ="";
            this.password=this.confirmPassword="";
          }else{
            this.message=data.message;
          }
      
        }
      )
    }else{
      this.message='Password and confirm password does not match';
      return;
    }
  }
}
