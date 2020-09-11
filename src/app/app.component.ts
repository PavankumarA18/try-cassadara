import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';
import { NbMenuService } from '@nebular/theme';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
    name: string;
    role: string;
    userMenu=[{title:'Logout', icon:'log-out-outline'}];
      
    
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private menuService: NbMenuService
    ) {
        this.authenticationService.currentUser.subscribe(
          x => {
            this.currentUser=x;
            console.log('In App Component'+ JSON.stringify(x));
            if(x && x.role === 'teacher'){
              console.log('role '+x.role);
              
              if(this.userMenu.filter(menu =>(menu.title==='configure')).length==0){
                this.userMenu.push({title:'Configure',icon:'settings-outline'});
              }
            }
          });
        this.menuService.onItemClick().subscribe((event) => {
          this.onContecxtItemSelection(event.item.title);
        });
        
      }
  onContecxtItemSelection(title) {
    if(title==='Logout'){
      this.logout();
    } else if(title ==='Configure'){
      this.router.navigate(['/settings'],{skipLocationChange: true});
    }
  }

        
    

      
    

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login'],{skipLocationChange: true});
    }
}