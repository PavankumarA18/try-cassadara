import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard'
import { RegisterComponent } from './register/register.component';
import { StudentsComponent } from './home/students/students.component';
import { QuestionsComponent } from './home/questions/questions.component';
import { ProgressComponent } from './home/progress/progress.component';
import { SettingsComponent } from './settings/settings.component';
import { TestsComponent } from './home/tests/tests.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentAssessmentsComponent } from './student-home/student-assessments/student-assessments.component';
import { StudentScoresComponent } from './student-home/student-scores/student-scores.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { PublishMarketPlaceComponent } from './publish-market-place/publish-market-place.component';
import {PolicyPageComponent} from './market-place/policy-page/policy-page.component';
import {CcAvenueRedirectComponent} from './market-place/cc-avenue-redirect/cc-avenue-redirect.component';

import { RegisterInstituteComponent } from './register-institute/register-institute.component';
import { InstituteHomeComponent } from './institute-home/institute-home.component';
import { InstituteTeachersComponent } from './institute-home/institute-teachers/institute-teachers.component';
import { InstituteProgressComponent } from './institute-home/institute-progress/institute-progress.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], children:[
    { path: '', redirectTo: 'students', pathMatch: "full"},
    { path:'students', component: StudentsComponent  },
    { path: 'questions', component: QuestionsComponent },
    { path: 'tests', component: TestsComponent},
    { path: 'progress', component: ProgressComponent}
  ]},
  { path: 'student-home', component: StudentHomeComponent, canActivate: [AuthGuard], children:[
    { path: '', redirectTo: 'studentAssessments', pathMatch:"full"},
    { path: 'studentAssessments', component: StudentAssessmentsComponent },
    { path: 'studentScores', component: StudentScoresComponent}
  ]},
  {path: 'institute-home', component: InstituteHomeComponent, canActivate: [AuthGuard], children:[
    { path: '', redirectTo: 'teachers', pathMatch: "full"},
    { path:'teachers', component: InstituteTeachersComponent  },
    { path: 'progress', component: InstituteProgressComponent }
  ] },
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegisterComponent },
  { path: 'inst-reg', component: RegisterInstituteComponent},
  { path: 'settings', component: SettingsComponent },
  { path: 'forgot', component: ResetPasswordComponent },
  { path: 'updatepwd/:email', component: UpdatePasswordComponent},
  { path: 'marketPlace', component: MarketPlaceComponent},
  { path: 'publishmarketplace', component: PublishMarketPlaceComponent},
  {path:'policyPage', component: PolicyPageComponent},
  {path:'ccavenueRedirect', component: CcAvenueRedirectComponent}  ,

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
