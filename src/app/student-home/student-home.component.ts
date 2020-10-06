import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { NbSidebarService } from '@nebular/theme';
import { User } from '../_models/user';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  stutabs: any[]=[
    {
      title:"Assessments",
      icon:'compass-outline',
      route:'/student-home/studentAssessments',
      responsive:true
    },
    {
      title:"Scores",
      icon:'monitor-outline',
      route:'/student-home/studentScores',
      responsive:true
    }
   ];
   currentUser:User;
  constructor( 
    private router: Router, 
    private authenticationService: AuthenticationService,
    private sidebarService: NbSidebarService) { }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['login'],{skipLocationChange: true});
  }

  toggle(){
    this.sidebarService.toggle(true, 'left');
  }

}
