import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { retryWhen, first } from 'rxjs/operators';

import { User } from 'src/app/_models/user';
import { UserSetting } from 'src/app/_models/UserSetting';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-institute-teachers',
  templateUrl: './institute-teachers.component.html',
  styleUrls: ['./institute-teachers.component.css']
})
export class InstituteTeachersComponent implements OnInit {

  loading=false;
  addError: string;
  createError: string;
  userSettings: UserSetting;
  selectedSystems: string[];
  selectedClass: string[];
  selectedSubjects: string[];
  disName:string;
  email:string;
  mobile:string;
  student: any;
  source: LocalDataSource;

  settings = {
    hideSubHeader:true,
    columns: {
      email: {
        title: 'Email',
        editable: false,
        sort: true,
        sortDirection:'asc',
        filter: false
      },
      displayName: {
        title: 'Display Name',
        editable: false,
        filter: false
      },
      mobile: {
        title: 'Mobile',
        editable: false,
        filter: false
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'editRec', title: '<img src=assets/img/nb-edit.svg width=30 height=30>'},
        { name: 'deleteRec', title: '<img src=assets/img/nb-trash.svg width=30 height=30>' }
      ],
      position: 'right'
    },
    pager:{
      display: true,
      perPage: 5
    }
  };
  constructor(
    private authService: AuthenticationService, 
    private userService: UserService,
    private nbDialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    if(this.authService.currentUserValue.userSettings){
      this.userSettings= this.authService.currentUserValue.userSettings.find(x => x.teacher === 'self');
    }
    this.selectedClass=[]; 
    this.selectedSystems=[]; 
    this.selectedSubjects=[];
    this.student=[];
  }

  addUser(){
    if(this.selectedClass.length==0 || this.selectedSystems.length==0 || this.selectedSubjects.length==0){
      this.addError="Please select systems, classes and subjects for students";
      return;
    }
    if(this.email == "" || this.disName =="" || this.mobile == ""){
      this.addError="Display Name, email and mobile fields are required";
      return;
    }
    this.loading=true;
    var stu=new User();
    stu['email']=this.email;
    stu['mobile']=this.mobile;
    stu['displayName']=this.disName;
    stu['role']='teacher';

    var stuSettings=new UserSetting();
    stuSettings['eduSystem']=this.selectedSystems;
    stuSettings['grade']=this.selectedClass;
    stuSettings['subject']=this.selectedSubjects;
    stuSettings['teacher']=this.authService.currentUserValue.email;
    stu['userSettings']=new Array();
    stu['userSettings'].push(stuSettings);
    stu['institute']=new Array();
    stu['institute'].push(this.authService.currentUserValue.email);
    stu['modTeacher']=this.authService.currentUserValue.email;
    stu['isNew']=true;
    console.log(JSON.stringify(stu));
    this.userService.registerInst(stu).pipe(first()).subscribe(
        data =>{
          if(data.statusCode == 200){
            this.loading=false;
            this.student.push(stu);
            this.source=new LocalDataSource(this.student);
            this.disName=this.mobile=this.email="";
            this.addError=null;
          }else {
            this.createError = data.message;
          }
        },
        error =>{
            this.createError = error;
        }
    )
  }

  goBack(){}

  onClickSystems(event){
    if(event.target.checked){
      this.selectedSystems.push(event.target.name);
    }else{
      this.selectedSystems.splice(this.selectedSystems.indexOf(event.target.name), 1);
    }
  }

  onClickClass(event){
    if(event.target.checked){
      this.selectedClass.push(event.target.name);
    }else{
      this.selectedClass.splice(this.selectedClass.indexOf(event.target.name), 1);
    }
  }

  onClickSubjects(event){
    if(event.target.checked){
      this.selectedSubjects.push(event.target.name);
    }else{
      this.selectedSubjects.splice(this.selectedSubjects.indexOf(event.target.name), 1);
    }
  }

}
