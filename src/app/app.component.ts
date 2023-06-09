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
    userMenu=[
      {title:'Logout', icon:'log-out-outline'},
      {title:'Configure',icon:'settings-outline', hidden:true},
      {title:'Publish to Market Place',icon:'cloud-upload-outline', hidden:true},
      {title:'Question Market',icon:'shopping-cart-outline', hidden:true} 
    ];
          
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
              this.userMenu[1].hidden=false;
              this.userMenu[2].hidden=false;
              this.userMenu[3].hidden=false;
 
            }
            
          });
        this.menuService.onItemClick().subscribe((event) => {
          this.onContecxtItemSelection(event.item.title);
        });
        
      }
  onContecxtItemSelection(title) {
    if(title==='Logout'){
      this.logout();
    } 
    else if(title ==='Configure'){
      this.router.navigate(['/settings'],{skipLocationChange: true});
      }
      else if(title=== 'Question Market'){
      this.router.navigate(['/marketPlace'],{skipLocationChange: true});
    }
    else if(title ==='Publish to Market Place'){
      
      this.router.navigate(['/publishmarketplace'],{skipLocationChange: true});
    }
  }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login'],{skipLocationChange: true});
    }
}