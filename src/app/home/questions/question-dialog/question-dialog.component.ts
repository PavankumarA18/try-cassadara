import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { Question } from 'src/app/_models/question';
import { UserService } from 'src/app/_services/user.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialogComponent implements OnInit {

  @ViewChild('autoInput') input;
  error: any;
  loading= false;
  submitted=false;
  success:string;
  isAddNew= false;
  isMath=false;
  hasImg=false;
  toFile: any;
  retImageUrl: string;
  mathText="";
  submitQuestion: Question;
  uniqChapters:string[];
  selectedEmail:string;
  selectedSystem:string;
  selectedClass:string;
  selectedSubject:string;
  filteredChapters:Observable<string[]>;
  options: string[];
  choices: string[];
  selectedChoice: string;
  mark: number;
  chapter: string;
  question:string;
    a:string;
    b:string;
    c:string;
    d:string;
    correct: string;
  addedQuestions: Question[];

  constructor(private userService: UserService, protected dialogRef: NbDialogRef<any>) { }

  ngOnInit(): void {
    this.choices=['a','b','c','d'];
    
    if(this.isAddNew){
      this.chapter="";
      this.question="";
      this.a="";
      this.b="";
      this.c="";
      this.d="";
      this.selectedChoice=null;
      this.mark=1;
    }else{
      var x=this.choices.indexOf(this.correct);
      this.selectedChoice=''+x;
    }
      
    
    this.filteredChapters=of(this.uniqChapters);
    this.addedQuestions=[];
  }

  private filter(value: string): string[] {
    
    return this.options.filter(optionValue => optionValue.includes(value));
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  onChange() {
    this.filteredChapters = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event) {
    this.filteredChapters = this.getFilteredOptions($event);
  }
  onSubmit(){
    this.submitted = true;
      this.loading=true;
      this.success="uploading...";
      if(this.isAddNew){
        this.submitQuestion=new Question();
        this.submitQuestion.email=this.selectedEmail;
        this.submitQuestion.edusystem=this.selectedSystem;
        this.submitQuestion.grade=this.selectedClass;
        this.submitQuestion.subject=this.selectedSubject;
      }
            
      if(this.chapter == "" ){
        this.error="Input chapter name";
        this.success="";
        this.loading=false;
        return;
      }
      this.submitQuestion.chapter=this.chapter;

      if(this.question == "" ){
        this.error="Input Question text";
        this.success="";
        this.loading=false;
        return;
      }
      this.submitQuestion.question=this.question;

      if(this.a == "" || this.b == "" || this.c == "" || this.d ==""){
        this.error="One of the provided options may be empty";
        this.success="";
        this.loading=false;
        return;
      }
      this.submitQuestion.a=this.a;
      this.submitQuestion.b=this.b;
      this.submitQuestion.c=this.c;
      this.submitQuestion.d=this.d;

      if(this.selectedChoice == null ){
        this.error="Choose correct answer";
        this.success="";
        this.loading=false;
        return;
      }
      this.submitQuestion.correct= this.choices[this.selectedChoice];

      if(this.mark < 0.5 || this.mark > 4){
        this.error="Invalid marks";
        this.success="";
        this.loading=false;
        return;
      }
      
      this.submitQuestion.mark = this.mark;
      if(this.hasImg && this.retImageUrl){
        this.submitQuestion.hasImg=this.hasImg;
        this.submitQuestion.image=this.retImageUrl;
      }else{
        this.submitQuestion.hasImg=false;
      }
      console.log(this.submitQuestion)
      this.userService.uploadQuestion(this.submitQuestion)
          .pipe().subscribe(
            
            data =>{
              if(data.statusCode == 200){
                this.question="";
                this.a=this.b=this.c=this.d="";
                this.selectedChoice=null;
                this.mark=1;
                this.error="";
                this.success ="Question uploaded successfully";
              if(this.isAddNew)  this.addedQuestions.push(this.submitQuestion);
                this.loading=false;
               if(!this.isAddNew) {
                      this.close();
               }
              }

            },
            error => {
              this.error = error;
              this.success="";
              this.loading=false;
            }
          )
  }

  close(){
    if(this.isAddNew){
        this.dialogRef.close(this.addedQuestions);
    }else {
      this.dialogRef.close(this.submitQuestion);
    }
  }

  doSomething(event){
  }

  onFileChange(event) {
    this.toFile = event.target.files;
    console.log(this.toFile);

  }

  fileSubmit(){
    this.loading=true;
    const file = this.toFile.item(0);
    const _this=this;
    var prom=this.userService.fileUpload(file).subscribe(
      data=>{
        if(data.statusCode==200){
          this.retImageUrl=data.body;
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

}
