import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 tabs: any[]=[
   {
     title: 'Students',
     icon: 'people-outline',
     route: '/students',
     responsive:true
   },
   {
     title: 'Questions',
     icon: 'question-mark-circle-outline',
     route:'/questions',
     responsive:true
   },
   {
      title: 'Assessments',
      icon: 'compass-outline',
      route: '/tests',
      responsive:true
   },
   {
     title: 'Progress',
     icon: 'monitor-outline',
     route:'/progress',
     responsive: true
   }
 ];

 
 
  currentUser:User;
  constructor(
    private router: Router, 
    private authenticationService: AuthenticationService,
    private sidebarService: NbSidebarService ) { }

  ngOnInit(): void {
    
    this.currentUser = this.authenticationService.currentUserValue;
    if(!this.currentUser.userSettings){
      this.router.navigate(['settings'],{skipLocationChange: true});
    }
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['login'],{skipLocationChange: true});
  }

  toggle(){
    this.sidebarService.toggle(true, 'left');
  }

}
