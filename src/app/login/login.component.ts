import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    cantSubmit=true;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue && this.authenticationService.currentUserValue.role==='teacher') { 
            
            this.router.navigate(['/']);
        }else if(this.authenticationService.currentUserValue && this.authenticationService.currentUserValue.role==='student'){
            this.router.navigate(['/student-home'])
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    if(data.statusCode ==200){
                        var user = JSON.parse(data.message);
                        if(user.firstLogin){
                            this.router.navigate(['/updatepwd/'+user.email],{skipLocationChange:true});
                        }else {
                            console.log('user role....', user.role);
                            if(user.role === 'teacher'){
                                this.router.navigate([this.returnUrl]);
                            }else if(user.role === 'student'){
                                this.router.navigate(['/student-home']);
                            }else if(user.role === 'institute'){
                                this.router.navigate(['/institute-home']);
                            }
                            
                        }
                    }else {
                        this.error = data.message;
                        this.loading = false;
                    }
                },
                error => {
                    this.error = error;
                    
                    this.loading = false;
                });
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