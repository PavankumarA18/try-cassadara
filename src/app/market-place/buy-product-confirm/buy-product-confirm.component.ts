import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/Product';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { NbDialogRef } from '@nebular/theme';
import { first } from 'rxjs/operators';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../_models/user';
import { stringify } from '@angular/compiler/src/util';


@Component({
  selector: 'app-buy-product-confirm',
  templateUrl: './buy-product-confirm.component.html',
  styleUrls: ['./buy-product-confirm.component.css']
})
export class BuyProductConfirmComponent implements OnInit {
  productRecord: Product;
  billingAddress: string;
  currentUser:User;
  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private dialogRef: NbDialogRef<any>
    
  ) { }

  ngOnInit(): void {

    console.log("product list in confirmdialog: "+JSON.stringify(this.productRecord));
    this.billingAddress="";
    this.currentUser = this.authService.currentUserValue;
    
  } 

  //Confirm
  onBuyProduct()
  {
    console.log(JSON.stringify(this.billingAddress));
/*
//-----------newly added----------------------------------------------------------------------------------------
//get encrypted Request
var orderDetails={};
//orderDetails['userStr']= this.userEmail;
console.log(JSON.stringify(this.currentUser));
//delete this.currentUser['token'];
orderDetails['userStr']= JSON.stringify(this.currentUser);
orderDetails['billingAddress']= JSON.stringify(this.billingAddress);
orderDetails['prodListStr']= new Array();
orderDetails['prodListStr'].push(JSON.stringify(this.productRecord));
orderDetails['redirectUrl']= "https://prod.cassadara.com/CcAvenueRedirectComponent";

console.log("order details: "+JSON.stringify(orderDetails));
const _this = this;
orderDetails = JSON.stringify(orderDetails);

//var dummyOrder ={"userStr":"{\"displayName\":\"Anu\",\"mobile\":\"9791033568\",\"role\":\"teacher\",\"userId\":1605065099442,\"firstLogin\":false,\"email\":\"anulaxmanan@gmail.com\",\"userSettings\":[{\"eduSystem\":[\"Other\",\"CBSE\"],\"teacher\":\"self\",\"subject\":[\"Physics\",\"Maths\"],\"grade\":[\"XI\",\"XII\"]}]}","billingAddress":"\"dsf\"","prodListStr":["{\"subject\":\"Physics\",\"setName\":\"\",\"authorPrice\":2400,\"grade\":\"XI\",\"cassadaraMargin\":12,\"tax\":12,\"setType\":\"All\",\"canPublish\":true,\"listingPrice\":3010,\"authorDiscount\":0,\"authorEmail\":\"anulaxmanan@gmail.com\",\"authorName\":\"Anu\",\"productImg\":\"\",\"productTitle\":\"Handbook of Physics\",\"authorDetail\":\"Compiled by professional scientists, engineers, and lecturers who are experts in the day-to-day use of physics, the \\\"Handbook\\\" covers topics from classical mechanics to elementary particles, electric circuits to error analysis. The previous editions in German are renowned for their clarity and completeness.\",\"productVersion\":\"1\",\"eduSystem\":\"Other\",\"productId\":1611199399809,\"cassadaraDiscount\":0,\"productDesc\":\"Handbook of Physics is a veritable toolbox for rapid access to a wealth of physics information for everyday use in problem solving, homework, and examinations.\"}"],"redirectUrl":"https://prod.cassadara.com/CcAvenueRedirectComponent"};
this.userService.createOrder(orderDetails).pipe(first()).subscribe(
  data=>{
    if(data.statusCode == null){
      console.log("Encrypted request is: "+data.message);
      this.dialogRef.close(data.message);
      
    }else{
      console.log(data.message)
    }
  },
  err=>{
     console.log(err);
  }
)

//--------------------------------------------------------newly added---------



*/


    
      this.dialogRef.close(this.billingAddress);

  }

  //Dialog close
  close(productRecord){
    this.dialogRef.close(productRecord);
  }

}
