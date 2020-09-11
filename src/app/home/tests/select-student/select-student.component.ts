import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/_models/Test';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NbDialogRef } from '@nebular/theme';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-select-student',
  templateUrl: './select-student.component.html',
  styleUrls: ['./select-student.component.css']
})
export class SelectStudentComponent implements OnInit {

  newTest: Test;
  existingStudents: User[];
  subStudents: User[];
  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private nbDialogRef: NbDialogRef<any>
  ) { }

  ngOnInit(): void {
    var teacher={};
    this.subStudents=new Array();
    teacher['email']=new Array();
    teacher['email'].push(this.authService.currentUserValue.email);
    this.userService.getStudents(teacher).pipe(first()).subscribe(
      data=>{
        if(data.statusCode==200){
          var students=JSON.parse(data.message);
          console.log(students);
         for (var i=0;i<students.length;i++){
            var settings=students[i].userSettings;
            for(var j=0;j<settings.length;j++){
              if(settings[j].teacher === this.authService.currentUserValue.email){
                if(settings[j].eduSystem.includes(this.newTest.eduSystem) && 
                      settings[j].grade.includes(this.newTest.grade) && 
                        settings[j].subject.includes(this.newTest.subject)){
                          this.subStudents.push(students[i]);
                        }
              }
            }
         }
          console.log(this.subStudents);
        }
        else{
          console.log(data.message);
        }
      },
        err=>{
          console.log(err);
        }
      
    );
  }

  onClickStu(event){
    if(event.target.checked){
      if(!this.newTest.students) this.newTest.students=new Array();
      this.newTest.students.push(this.subStudents.find(x => x.userId == event.target.name));
    } else {
      this.newTest.students.splice(this.newTest.students.indexOf(event.target.name),1);
      //this.subStudents.find(x => x.userId === event.target.name);
    }

  }

  onCloseBtn(){
    this.newTest.canList=true;
    console.log(JSON.stringify(this.newTest));
    this.nbDialogRef.close();
  }

}
