import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MustMatch } from '../_helpers/must.match';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service'
import { NbToastrService } from '@nebular/theme';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    cantSubmit = true;
    returnUrl: string;
    error = '';
    user: User;
  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private toastrService: NbToastrService,
        
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirmpassword:['',Validators.required],
      disname:['',Validators.required],
      mobile:['',Validators.required]
  },  {validator: MustMatch('password','confirmpassword') });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  

  get f() { return this.registerForm.controls; }

  onSubmit() {
    
    this.submitted = true;
    console.log("form Invalid "+this.registerForm.invalid);
   
        // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    console.log('form is valid');
    this.loading = true;
    this.user=new User();
    this.user.displayName=this.f.disname.value;
    this.user.email=this.f.email.value;
    this.user.mobile=this.f.mobile.value;
    this.user.password=this.f.password.value;
    this.user.role='teacher';

    this.userService.register(this.user)
    
        .pipe(first())
        .subscribe(
            data => {
              console.log(data);
              if(data.statusCode == 200){
                this.toastrService.success("Registration Successful", "Registration Status");
                this.router.navigate([this.returnUrl]);
              }else {
                this.toastrService.danger(data.message, "Registration Status");
                this.loading=false;
              }
            },
            error => {
                this.error = error;
                this.loading = false;
            });
}

onReset(){
  this.router.navigate(['/login'],{skipLocationChange: true});
}

resolved(captchaResponse: string) {
  console.log(`Resolved captcha with response: ${captchaResponse}`);
  var obj={};
  obj['captchaResponse']=captchaResponse;
  this.userService.validateCaptcha(obj).pipe(first()).subscribe(
    data=>{
      if(data.statusCode == 200) {
        this.cantSubmit=false;
      }else {
        console.log(data.message);
        
      }
    },
    err=>{
      console.log(err);
    }
  )
  
  
}



}
