import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/Product';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { NbDialogRef } from '@nebular/theme';
import { first } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-publishmarketconfirm',
  templateUrl: './publishmarketconfirm.component.html',
  styleUrls: ['./publishmarketconfirm.component.css']
})
export class PublishmarketconfirmComponent implements OnInit {

  productRecord: Product;
  canPublishRecord: boolean;
  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private dialogRef: NbDialogRef<any>
  ) { }

  ngOnInit(): void {
    
  if (this.productRecord.canPublish === true)
  this.canPublishRecord = true;
  else
  this.canPublishRecord = false;
 
  }

  //method called when Can publish checkbox is selected
onClickPublish(event)
{
  if(event.target.checked) this.productRecord.canPublish = true;
  else this.productRecord.canPublish = false;

}
  onProductUpdate(){
    
    console.log(JSON.stringify(this.productRecord));
    this.userService.createProducts(this.productRecord).pipe(first()).subscribe(
      data=>{
        if(data.statusCode == 200){
          
            this.dialogRef.close(this.productRecord);
        }else{
          console.log(data.message);
        }

      },
      err=>{
        console.log(err);
      }
    )
  }
}
