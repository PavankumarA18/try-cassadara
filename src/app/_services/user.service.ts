import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../_models/question';
import {Message } from '../_models/message';
import {ApiResponse } from '../_models/response';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { Test } from '../_models/Test';
import {Product} from '../_models/Product';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /*getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`,{headers:{Authorization: 'Bearer fake-jwt-token'}});
  }*/
  validateCaptcha(captchaRes: any){
    return this.http.post<Message>('https://c4o2i0o2h5.execute-api.us-east-2.amazonaws.com/stage1', captchaRes);
  }

  uploadQuestion(question: Question) {
    return this.http.post<Message>('https://pyixijys0b.execute-api.us-east-2.amazonaws.com/stage1',question);
  }
  getQuestions(subject: any){
    return this.http.post<Message>('https://h526m1d5k8.execute-api.us-east-2.amazonaws.com/stage1',subject);
  }

  register(user: User){
    return this.http.post<Message>('https://biukm6kae9.execute-api.us-east-2.amazonaws.com/stage1', user);
  }

  updateUserSettings(userSettings: any){
    return this.http.put<Message>('https://ripju0k2mh.execute-api.us-east-2.amazonaws.com/stage1', userSettings);
  }

  deleteQuestion(qId: any){
    return this.http.post<Message>('https://ic6zcvaldg.execute-api.us-east-2.amazonaws.com/stage1',qId);
  }

  getStudents(teacher: any){
    return this.http.post<Message>('https://r9i2k11zj4.execute-api.us-east-2.amazonaws.com/stage1', teacher);
  }

  getUniqueChapters(subject: any){
    return this.http.post<Message>('https://jh7ik7x7s7.execute-api.us-east-2.amazonaws.com/stage1', subject);
  }
  getQuestionsForChapters(chapters: any){
    return this.http.post<Message>('https://cyfv2udj04.execute-api.us-east-2.amazonaws.com/stage1', chapters);
  }
  createTest(test: Test){
    return this.http.post<Message>('https://eq2ity8qgf.execute-api.us-east-2.amazonaws.com/stage1', test);
  }

  getTestsForCreator(email: any){
    return this.http.post<Message>('https://7ge002hkhi.execute-api.us-east-2.amazonaws.com/stage1', email);
  }

  updateTest(test: Test){
    return this.http.post<Message>('https://2e8et3wsu3.execute-api.us-east-2.amazonaws.com/stage1', test);
  }

  deleteTest(testId: any){
    return this.http.post<Message>('https://frhfu6i248.execute-api.us-east-2.amazonaws.com/stage1', testId);
  }

  gentempPwd(email:any){
    return this.http.post<Message>('https://ak6t3akuqc.execute-api.us-east-2.amazonaws.com/stage1', email);
  }

  updatePwd(pwd: any){
    return this.http.post<Message>('https://u9933bn99c.execute-api.us-east-2.amazonaws.com/stage1', pwd);
  }

  getHistory(email: any){
    return this.http.post<Message>('https://ff2jhdthif.execute-api.us-east-2.amazonaws.com/stage1', email);
  }

  fileUpload(file: any){
    return this.http.post<ApiResponse>('https://6e05zeqtnj.execute-api.us-east-2.amazonaws.com/upload', file);
  }

  getProducts(sys: any){
    return this.http.post<Message>('https://p3wy4gu820.execute-api.us-east-2.amazonaws.com/stage1', sys);
  }
  
  createProducts (product: Product){
    return this.http.post<Message>('https://wlziiwfwv6.execute-api.us-east-2.amazonaws.com/stage1',product);
  }

  createOrder(orderDetails: any)
  { 
    
    return this.http.post<Message>('https://bm5iswymc7.execute-api.us-east-2.amazonaws.com/stage1', orderDetails);
    
  }
  
  getUserProducts(products: any){
    return this.http.post<Message>('https://dpd7z7jvsh.execute-api.us-east-2.amazonaws.com/stage1/',products);
  }

 

  
}
