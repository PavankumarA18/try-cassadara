import { Component, OnInit } from '@angular/core';
import { UserSetting } from '../_models/UserSetting';
import { Product } from '../_models/product';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.css']
})
export class MarketPlaceComponent implements OnInit {

  userSettings:UserSetting;
  selectedSystem:string;
  selectedClass:string;
  selectedSubject:string;
  products:Product[];
  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.products=[];
    if("userSettings" in this.authService.currentUserValue){
      
      this.userSettings=this.authService.currentUserValue.userSettings.find(x => x.teacher==='self');

    }else{
        this.userSettings=null;
    }
  }

  getProducts(){
    var obj={};
    obj['eduSystem']=this.userSettings.eduSystem[this.selectedSystem];
    obj['grade']=this.userSettings.grade[this.selectedClass];
    obj['subject']=this.userSettings.subject[this.selectedSubject];
    this.userService.getProducts(obj).pipe(first()).subscribe(
      data=>{
        if(data.statusCode == 200){
          this.products=JSON.parse(data.message);
        }else{
          console.log(data.message)
        }
      },
      err=>{
        console.log(err);
      }
    )
  }

}
