import { Component, OnInit, ViewChild } from '@angular/core';
import { UserSetting } from '../_models/UserSetting';

import { Product } from 'src/app/_models/Product';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';

import { first } from 'rxjs/operators';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import { NbDialogService } from '@nebular/theme';

import { BuyProductConfirmComponent } from './buy-product-confirm/buy-product-confirm.component';



@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.css']
})
export class MarketPlaceComponent implements OnInit {
  @ViewChild('form') form: ElementRef;

  currentUser:User;
 productid : any[];
 userEmail: any;
 newProduct: Product;
  merchant_id: any;
  accessCode: any;
  encRequestRes : any;
  userSettings:UserSetting;
  selectedSystem:string;
  selectedClass:string;
  selectedSubject:string;
  products:Product[];
  products1: Product;
  encRequest: any;
  working_key: any;
  billingAddress: string;
  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private userService1: UserService,
    private router: Router,
    private nbDialogService: NbDialogService
    
  ) { }

  ngOnInit(): void {
   
    this.accessCode = 'AVFO01IB87AK45OFKA';
    this.working_key = 'B04DD0EFD7BBB0476D716E7DB3A05F1F';
    this.merchant_id = '326607';
    this.products=[];
    this.products1= new Product();
   
    
    this.currentUser = this.authService.currentUserValue;
    this.userEmail = this.currentUser.email;    

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

  //method when buynow is clicked
  buyNow(prodid: any)
  {
    this.productid= prodid;
    //get the product details for the particular product id
     this.products1= this.products.find(v =>  v.productId === prodid);
     console.log("product list: "+JSON.stringify(this.products1));
     
     
    
     this.nbDialogService.open(BuyProductConfirmComponent,{
      context:{
        productRecord: this.products1
      }
    }).onClose.subscribe(
      data=>{
        if(data){
   
          console.log("Billing address from dialog: "+JSON.stringify(data));
          this.billingAddress = JSON.stringify(data);
    //get encrypted Request
      var orderDetails={};
      //orderDetails['userStr']= this.userEmail;
      
     
      var userObject = Object.assign({},this.currentUser);

      delete userObject['token'];
      orderDetails['userStr']= JSON.stringify(userObject);
      orderDetails['billingAddress']= this.billingAddress;
      orderDetails['prodListStr']= new Array();
      orderDetails['prodListStr'].push(JSON.stringify(this.products1));
      orderDetails['redirectUrl']= "https://prod.cassadara.com/CcAvenueRedirectComponent";
  
      console.log("order details: "+JSON.stringify(orderDetails));
      const _this = this;
  
     this.userService1.createOrder(JSON.stringify(orderDetails)).pipe(first()).subscribe(
        details=>{
          if(details.statusCode == 200){
            this.encRequestRes=details.message;
            console.log("Encrypted request is: "+this.encRequestRes);
            this.form.nativeElement.submit();
          }else{
            console.log(details.message)
          }
        },
        err=>{
           console.log(err);
        }
      )
       
       /*    setTimeout(()=>{
                this.form.nativeElement.submit();
            },1000)
        */
        											
        }
        else
        {

        }
      
      }, 
      err=>{
        console.log(err);
      }
    )





    
    
    





  }

}


