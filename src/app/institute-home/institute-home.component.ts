import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-institute-home',
  templateUrl: './institute-home.component.html',
  styleUrls: ['./institute-home.component.css']
})
export class InstituteHomeComponent implements OnInit {
  tabs: any[]=[
    {
      title: 'Teachers',
      icon: 'people-outline',
      route: 'teachers',
      responsive:true
    },
    {
      title: 'Progress',
      icon: 'monitor-outline',
      route:'progress',
      responsive: true
    }
  ];

  currentUser:User;
  constructor(
    private router: Router, 
    private authenticationService: AuthenticationService,
    private sidebarService: NbSidebarService
  ) { }

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
