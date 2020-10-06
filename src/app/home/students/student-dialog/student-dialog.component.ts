import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserSetting } from 'src/app/_models/UserSetting';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NbDialogRef } from '@nebular/theme';
import { UserService } from 'src/app/_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {
loading=false;
userSettings:any;
submitStudent: User;
stuSettings: UserSetting[];
myStuSettings: UserSetting;
  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    protected dialogRef: NbDialogRef<any>
  ) { }

  ngOnInit(): void {
    this.stuSettings=this.submitStudent.userSettings;
    this.myStuSettings = this.stuSettings.find(x => x.teacher === this.authService.currentUserValue.email);
    console.log(this.myStuSettings);
    this.addCheck(this.userSettings.eduSystem, this.myStuSettings.eduSystem);
    this.addCheck(this.userSettings.grade, this.myStuSettings.grade);
    this.addCheck(this.userSettings.subject, this.myStuSettings.subject);

   
    
  }

  addCheck(arr1, arr2){
    
    for(var i=0;i<arr1.length;i++){
      var obj={};
      obj['value']=arr1[i];
      obj['check']=false;
      for(var j=0;j<arr2.length;j++){
       
        if(arr1[i]===arr2[j]){
          obj['check']=true;
          break;
        }
      }
      arr1[i]=obj;
    }

  }

  onClickSystems(event){
    if(event.target.checked){
      this.myStuSettings.eduSystem.push(event.target.name);
      this.userSettings.eduSystem.find(x => x.value === event.target.name).check=true;
    }else{
      this.myStuSettings.eduSystem.splice(this.myStuSettings.eduSystem.indexOf(event.target.name), 1);
      this.userSettings.eduSystem.find(x => x.value === event.target.name).check=false;
    }
   
  }
  onClickClass(event){
    if(event.target.checked){
      this.myStuSettings.grade.push(event.target.name);
      this.userSettings.grade.find(x => x.value === event.target.name).check=true;
    }else{
      this.myStuSettings.grade.splice(this.myStuSettings.grade.indexOf(event.target.name), 1);
      this.userSettings.grade.find(x => x.value === event.target.name).check=false;
    }
    
  }
  onClickSubjects(event){
    if(event.target.checked){
      this.myStuSettings.subject.push(event.target.name);
      this.userSettings.subject.find(x => x.value === event.target.name).check=true;
    }else{
      this.myStuSettings.subject.splice(this.myStuSettings.subject.indexOf(event.target.name), 1);
      this.userSettings.subject.find(x => x.value === event.target.name).check=false;
    }
    
  }

  onUpdate(){
    this.loading=true;
    this.submitStudent['modTeacher']=this.authService.currentUserValue.email;
    this.submitStudent['isNew']=false;
    console.log(JSON.stringify(this.submitStudent));
    this.userService.register(this.submitStudent).pipe(first()).subscribe(
      data=>{
        if(data.statusCode == 200){
          this.loading=false;
          this.dialogRef.close(this.submitStudent);
        }
      }
    )
    
  }

}
