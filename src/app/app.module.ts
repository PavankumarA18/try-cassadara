import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbInputModule, NbButtonModule, NbActionsModule, NbIconModule, NbSpinnerModule, NbToastrModule, NbSidebarModule, NbUserModule, NbContextMenuModule, NbMenuModule, NbTabsetModule, NbRouteTabsetModule, NbSelectModule, NbDialogModule, NbAutocompleteModule, NbStepperModule, NbListModule, NbRadioModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChronometerModule } from 'ngx-chronometer';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { config } from 'rxjs';
import {  RecaptchaModule } from 'ng-recaptcha';
import { StudentsComponent } from './home/students/students.component';
import { QuestionsComponent } from './home/questions/questions.component';
import { ProgressComponent } from './home/progress/progress.component';
import { SettingsComponent } from './settings/settings.component';
import { JwtInterceptor }  from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { QuestionDialogComponent } from './home/questions/question-dialog/question-dialog.component';
import { ConfirmDialogComponent } from './home/questions/confirm-dialog/confirm-dialog.component';
import { StudentDialogComponent } from './home/students/student-dialog/student-dialog.component';
import { TestsComponent } from './home/tests/tests.component';
import { SelectQuestionComponent } from './home/tests/select-question/select-question.component';
import { SelectStudentComponent } from './home/tests/select-student/select-student.component';
import { TestDialogComponent } from './home/tests/test-dialog/test-dialog.component';
import { TestConfirmComponent } from './home/tests/test-confirm/test-confirm.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { MathjaxComponent } from './mathjax/mathjax.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentAssessmentsComponent } from './student-home/student-assessments/student-assessments.component';
import { StudentScoresComponent } from './student-home/student-scores/student-scores.component';
import { RunTestComponent } from './student-home/student-assessments/run-test/run-test.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    StudentsComponent,
    QuestionsComponent,
    ProgressComponent,
    SettingsComponent,
    QuestionDialogComponent,
    ConfirmDialogComponent,
    StudentDialogComponent,
    TestsComponent,
    SelectQuestionComponent,
    SelectStudentComponent,
    TestDialogComponent,
    TestConfirmComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
    MathjaxComponent,
    StudentHomeComponent,
    StudentAssessmentsComponent,
    StudentScoresComponent,
    RunTestComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbActionsModule,
    NbSpinnerModule,
    NbToastrModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbUserModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbRouteTabsetModule,
    NbSelectModule,
    Ng2SmartTableModule,
    NbDialogModule.forRoot(),
    NbAutocompleteModule,
    NbStepperModule,
    NbListModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NbRadioModule,
    RecaptchaModule,
    NgxChronometerModule
          
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
