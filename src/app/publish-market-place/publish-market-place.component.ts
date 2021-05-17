import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { UserSetting } from 'src/app/_models/UserSetting';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { first } from 'rxjs/operators';
import { Product } from 'src/app/_models/Product';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { PublishmarketconfirmComponent } from './publishmarketconfirm/publishmarketconfirm.component';



@Component({
  selector: 'app-publish-market-place',
  templateUrl: './publish-market-place.component.html',
  styleUrls: ['./publish-market-place.component.css']
})
export class PublishMarketPlaceComponent implements OnInit {
  @ViewChild('fileInput') myFileInput: ElementRef;
  @ViewChild('table')   smartTable: Ng2SmartTableComponent;  
  
  
  loading=false;
 
  userSettings:UserSetting;
  selectedSystem:string;
  selectedClass:string;
  selectedSubject:string;
  selectedSystem1:string;
  selectedClass1:string;
  selectedSubject1:string;
  setType: string;
  source: LocalDataSource;
  products:Product[];
  newProduct: Product;
  error2msg:string;
  error3msg: string;
  error21=true;
  error2=true;
  toFile: any;
  productImageUrl: string;
  uniqChapters: string[];

  authorPriceAfterDiscount: number;
  cassadaraCommissionAfterDiscount: number;
  priceBeforeTax: number;
  estimatedTax: number;

  settings = {
    //hideSubHeader:true,

    // mode: 'inline', 
    columns: {
      productTitle: {
        title: 'Product Title',
        editable: true,
        sort: true,
        sortDirection:'asc',
        filter: true
      },
      productDesc: {
        title: 'Product Description',
        editable: true,
        filter: false
      },
      authorName: {
        title: 'Author Name',
        editable: true,
        filter: false
      },
      authorDetail: {
        title: 'Author Detail',
        editable: true,
        filter: false
      },
      canPublish: {
        title: 'Can Publish?',
        
        filter: false  
        } 
    },
    actions: {
      custom: [
        { name: 'editRec', title: '<img src=assets/img/nb-edit.svg width=30 height=30>'}
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right',    
         
      
    },

    pager:{
      display: true,
      perPage: 5
    }
  };
  isFileSize = false;
  isFileLarge = false;
  isFileType = false;
  isFileSelected= false;
  canDisplayradio= false;
  currentRow: any;
  
  
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private nbDialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.newProduct=new Product();
    this.newProduct.productTitle = '';
    this.newProduct.authorEmail = this.authenticationService.currentUserValue.email;
    this.newProduct.productDesc = '';
    this.newProduct.productVersion='';
    this.newProduct.authorName = '';
    this.newProduct.authorDetail='';
    this.newProduct.productImg='';
    this.setType='';
    this.newProduct.setType='';
    this.newProduct.authorPrice;
    this.newProduct.authorDiscount=0;
    this.newProduct.cassadaraMargin=12.0;
    this.newProduct.tax = 12;
    this.newProduct.cassadaraDiscount = 0;
    this.newProduct.listingPrice = 0; 
    
    this.newProduct.canPublish = false;
    this.authorPriceAfterDiscount =0;
    this.cassadaraCommissionAfterDiscount=0;
    this.estimatedTax =0;
    
    if("userSettings" in this.authenticationService.currentUserValue){
      
      this.userSettings=this.authenticationService.currentUserValue.userSettings.find(x => x.teacher==='self');
      
    }else{
        this.userSettings=null;
    }
  }
  //method called when author price is entered
  onKeyUpEvent($event)
  {
    if (this.newProduct.authorPrice==0 || this.newProduct.authorPrice==null)
    {
      this.newProduct.authorDiscount=0;
      this.newProduct.cassadaraDiscount=0;
    }
  }
  //method called when author price is changed
  onChangeEvent($event)
  {
    
    this.onFinalPrice();
    
  }
  //method called when author discount is entered
  onauthorDiscountEvent($event)
  {
    this.onFinalPrice();
  }
  onCassadaraDiscountEvent($event)
  {
    this.onFinalPrice();
  }
//method to calculate final price
  onFinalPrice()
  {
    this.authorPriceAfterDiscount= this.newProduct.authorPrice - (this.newProduct.authorPrice*(this.newProduct.authorDiscount/100));
   
    this.cassadaraCommissionAfterDiscount=this.authorPriceAfterDiscount + (this.authorPriceAfterDiscount*((this.newProduct.cassadaraMargin-this.newProduct.cassadaraDiscount)/100));
   
    this.estimatedTax=(this.cassadaraCommissionAfterDiscount*12)/100;
   
    this.newProduct.listingPrice = this.cassadaraCommissionAfterDiscount + this.estimatedTax;
    //round to 2 decimal places
    this.authorPriceAfterDiscount = Number(this.authorPriceAfterDiscount.toFixed(0));
    this.cassadaraCommissionAfterDiscount = Number(this.cassadaraCommissionAfterDiscount.toFixed(0));
    this.estimatedTax = Number(this.estimatedTax.toFixed(0));
    this.newProduct.listingPrice =  Number(this.newProduct.listingPrice.toFixed(0));
    

  }
  onProductForm(){
    console.log(this.newProduct);
    return true;
  }
  onAuthorForm()
  {
    console.log(this.newProduct);
   this.error2=true;
  }
  onProductContentForm(){
    console.log(this.newProduct);
    //this.error2=true;
   }
     //method to display the chapters for respective System, grade and subject
   onGo(){
    if(this.selectedSystem && this.selectedClass && this.selectedSubject)this.error2=false;
    
    this.error3msg = "No questions created";
    
    if(!this.error2){
     
      this.loading=true;
    this.newProduct.eduSystem = this.userSettings.eduSystem[this.selectedSystem];
    this.newProduct.grade = this.userSettings.grade[this.selectedClass];
    this.newProduct.subject = this.userSettings.subject[this.selectedSubject];
    var sub={};
    sub['email']=this.authenticationService.currentUserValue.email;
    sub['eduSystem']=this.newProduct.eduSystem;
    sub['grade']=this.newProduct.grade;
    sub['subject']=this.newProduct.subject;
    this.userService.getUniqueChapters(sub).pipe(first()).subscribe(
      data => {
        if(data.statusCode == 200){
          this.uniqChapters = JSON.parse(data.message);
          this.loading=false;
          this.canDisplayradio = true;
          this.setType='All';
          this.newProduct.setType='All';
          this.error21=false;
          
        }
        else{          
          
          console.log(data.message);
          this.loading=false;
          this.canDisplayradio = false;
          this.setType='';
          this.newProduct.setType='';
          this.error21=true;
        }
      },
      err =>{
        console.log(err);
        this.loading=false;
        this.canDisplayradio = false;
      }
    )
    }else{
      this.error2msg="Please select system, class and subject";
      
    }
  }
//method called when clicked on the All radio button
  onClickAllradio($event)
  {
    this.newProduct.setType='All';
    this.error21=false;
    
    this.newProduct.chapters=[];
    

  }
  //method when clicked on the Chapters radio button
  onClickChapterradio($event)
  {
   
    this.newProduct.setType='ChapterWise';
          this.error21=true;
  }
//when chapters are selected
onClickChapters(event){
    
  this.newProduct.setType="ChapterWise";
  if(event.target.checked){
    if(!this.newProduct.chapters) this.newProduct.chapters=new Array();
    this.newProduct.chapters.push(event.target.name);
    
  }else{
    this.newProduct.chapters.splice(this.newProduct.chapters.indexOf(event.target.name), 1);
    
  }
  if(this.newProduct.chapters.length == 0){
    this.error21=true
  }else{
    this.error21=false;
  }
}
//method called when Can publish checkbox is selected
onClickPublish(event)
{
  if(event.target.checked) this.newProduct.canPublish = true;
  else this.newProduct.canPublish = false;

}
//when image selected
  onFileChange(event) {
    this.toFile = event.target.files;
    var fileSize = this.toFile[0].size / 1024;
    this.isFileSelected=false;
  //check for the file extension
  var fileName = this.toFile[0].name;
  
  var index = fileName.lastIndexOf(".");
  
  
   var strsubstring = fileName.substring(index, this.toFile[0].length);
   strsubstring = strsubstring.toLowerCase();
   
                
//if file size is more than 40kb or files are not in the expected extension
    if ((fileSize > 40) || (strsubstring != '.jpg' && strsubstring != '.png' && strsubstring != '.jpeg' && strsubstring != '.gif') ){
     
      this.isFileSize=false;
      this.isFileLarge = true;
      //clear the file name
      this.myFileInput.nativeElement.value = "";
      this.productImageUrl="";
      //alert("File size is larze; maximum file size 40 KB");
      
          } else
          {
          console.log(this.toFile); 
          //enables upload button

          this.isFileSize=true;
          this.isFileLarge = false;
        }
 
  }

  fileSubmit(){
    this.loading=true;
    const file = this.toFile.item(0);
    
    //get the image url
    
    var prom=this.userService.fileUpload(file).subscribe(
      data=>{ 
        if(data.statusCode==200){
          this.productImageUrl=data.body; 
          this.loading = false;
        }else{
          
          console.log(data);
        }
      },
      err=>{
        
        console.log(err);
        this.loading=false;
      }
    )
  }

//method to create products
createProduct()
{
  
    if(this.productImageUrl){
      
      this.newProduct.productImg=this.productImageUrl;
    }
    this.newProduct.setName='';
  this.userService.createProducts(this.newProduct).pipe(first()).subscribe(
    data=>{
      if(data.statusCode == 200){
      
        this.newProduct= new Product();
       
        this.newProduct.productTitle = '';
        this.newProduct.productImg='';
    this.newProduct.authorEmail = this.authenticationService.currentUserValue.email;
    this.newProduct.productDesc = '';
    this.newProduct.productVersion='';
    this.newProduct.setName='';
    this.newProduct.authorName = '';
    this.newProduct.authorDetail='';
    this.newProduct.productImg='';
    this.setType='';
    this.newProduct.setType='';
    this.newProduct.authorPrice=0;
    this.newProduct.authorDiscount=0;
    this.newProduct.cassadaraMargin=12.0;
    this.newProduct.tax = 12;
    this.newProduct.cassadaraDiscount = 0;
    this.newProduct.listingPrice = 0; 
    this.newProduct.chapters=[];
    
    this.newProduct.canPublish = false;
    this.myFileInput.nativeElement.value = "";
    this.productImageUrl = '';
    this.authorPriceAfterDiscount =0;
    this.cassadaraCommissionAfterDiscount=0;
    this.estimatedTax =0;
    this.uniqChapters=[];
    this.selectedSystem='';
    this.selectedClass='';
    this.selectedSubject='';
  
    
    
    this.error21=true;
    this.error2=true;
    this.isFileSize = false;
    this.isFileLarge = false;
    this.isFileType = false;
    this.isFileSelected= false;
    this.canDisplayradio= false;
  
    
        return true;
      }else {
        console.log(data.message);
        return false;
      }
    },
    err=>{
      console.log(err);
      return false;
    }
  );

}
  
onCustomAction(event){
  
  this.nbDialogService.open(PublishmarketconfirmComponent,{
    context:{
      productRecord: event.data
    }
  }).onClose.subscribe(
    data=>{
      if(data){
        this.products[this.products.findIndex(v => v.productId === data.productId)]=data;
        this.source=new LocalDataSource(this.products);
      }
    }
  )
  
}

  //method to display the user's products
  getProducts(){
    var obj={};
    obj['eduSystem']=this.userSettings.eduSystem[this.selectedSystem1];
    obj['grade']=this.userSettings.grade[this.selectedClass1];
    obj['subject']=this.userSettings.subject[this.selectedSubject1];    
    obj['authorEmail']=this.authenticationService.currentUserValue.email.toString();
    
    this.userService.getUserProducts(obj).pipe(first()).subscribe(
      data=>{ 
        if(data.statusCode == 200){
         
          this.products=JSON.parse(data.message);
          
          this.source = new LocalDataSource(this.products);
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

