import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../_services/settings.service'
import { first } from 'rxjs/operators';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { NbToastrService } from '@nebular/theme';
import { UserSetting } from '../_models/UserSetting';
import { User } from '../_models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  defaultSettings: any;
  defaultSubjects: string[];
  defaultSystems: string[];
  defaultClass: string[];
  error: any;
  otherOpt:string;
  otherClsOpt:string;
  otherSubOpt:string;
  selectedSubjects:string[];
  selectedClass:string[];
  selectedSystems:string[];
  userSettings:UserSetting[];
  mySettings:UserSetting;
  constructor(private router: Router, private settingsService: SettingsService, private userService: UserService, private authenticationService: AuthenticationService, private toastrService: NbToastrService) {
    
   }

  ngOnInit(): void {
      this.otherOpt="";
      this.otherClsOpt="";
      this.otherSubOpt="";
      this.selectedClass=[];
      this.selectedSystems=[];
      this.selectedSubjects=[];
    if(this.authenticationService.currentUserValue.userSettings){
      
        this.userSettings=this.authenticationService.currentUserValue.userSettings;
    }
      this.settingsService.getDefaultSettings()
      .pipe(first())
      .subscribe(
        data =>{
            if(data.statusCode == 200){
              this.defaultSettings = JSON.parse(data.message);
              this.defaultSystems=this.defaultSettings.Item.eduSystem;
              this.defaultClass=this.defaultSettings.Item.grade;
              this.defaultSubjects=this.defaultSettings.Item.subject;
              if(this.userSettings){
                this.mySettings = this.userSettings.find(x => x.teacher === 'self');
                if(this.mySettings){
                  console.log(this.mySettings);
                  this.compareAndClean(this.mySettings.eduSystem, this.defaultSystems);
                  this.compareAndClean(this.mySettings.grade, this.defaultClass);
                  this.compareAndClean(this.mySettings.subject, this.defaultSubjects);
                }
              }
            }
        },
        error =>{
          this.error=error;
        }
      );
  }

  addSysOption(){
    if(this.otherOpt.trim() === ""){
      return;
    }
    this.defaultSystems.push(this.otherOpt);
    this.otherOpt="";
  }
  addClsOption(){
    if(this.otherClsOpt.trim() === ""){
      return;
    }
    this.defaultClass.push(this.otherClsOpt);
    this.otherClsOpt="";
  }
  addSubOption(){
    if(this.otherSubOpt.trim() === ""){
      return;
    }
    this.defaultSubjects.push(this.otherSubOpt);
    this.otherSubOpt="";
  }

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

  saveUserSettings(){
    console.log('saving user settings');
    //check if the user adds anything new before submitting 'save' button

   

    if (this.selectedSystems.toString()== "" && this.selectedClass.toString()=="" && this.selectedSubjects.toString()=="")
    {
      this.toastrService.danger("Please add System, Class or Subjects", "UserSettings");
      return;
    }
    
    if(this.authenticationService.currentUserValue.userSettings){
      console.log('inside if');
      this.mySettings.eduSystem=this.mySettings.eduSystem.concat(this.selectedSystems);
      this.mySettings.grade=this.mySettings.grade.concat(this.selectedClass);
      this.mySettings.subject=this.mySettings.subject.concat(this.selectedSubjects);
      this.mySettings.teacher='self';
      
    } 
    else{
      console.log('inside else');
      this.authenticationService.currentUserValue.userSettings=new Array();
      this.mySettings=new UserSetting();
      this.mySettings['eduSystem']=this.selectedSystems;
      this.mySettings['grade']=this.selectedClass;
      this.mySettings['subject']=this.selectedSubjects;
      this.mySettings['teacher']='self';
      this.authenticationService.currentUserValue.userSettings.push(this.mySettings);
    }

    /*if(!this.authenticationService.currentUserValue.userSettings){
      console.log('inside here...')
    this.authenticationService.currentUserValue.userSettings=new Array();
    this.authenticationService.currentUserValue.userSettings.push(this.mySettings);
    }*/
    

    var saveSettings={};
    saveSettings['email']= this.authenticationService.currentUserValue.email;
    saveSettings['userSettings']=this.authenticationService.currentUserValue.userSettings;
    
    this.userService.updateUserSettings(saveSettings)
    .pipe(first())
    .subscribe(
      data => {
        if(data.statusCode == 200){
          this.toastrService.success("Settings Updated Successfully", "UserSettings");
          
          localStorage.setItem('currentUser', JSON.stringify(this.authenticationService.currentUserValue));
          window.location.reload();
        }else {
          this.toastrService.danger(data.message, "UserSettings");
        }
      },err =>{
          this.error=err;
      });
    
    
  }

  compareAndClean(one, two){
    for(var i=0;i<one.length;i++){
      for(var j=0;j<two.length; j++){
        if(one[i]===two[j]){
          two.splice(two.indexOf(one[i]),1);
        }
      }
    }
  }

  goBack(){
    this.router.navigate([''],{skipLocationChange:true});
  }

}
