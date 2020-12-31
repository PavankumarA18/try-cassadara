import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getTests(email: any){
   return this.http.post<Message>('https://teenrizm4m.execute-api.us-east-2.amazonaws.com/stage1', email);
  }

  getRandomQuestions(test: any){
    return this.http.post<Message>('https://asgrqgv042.execute-api.us-east-2.amazonaws.com/stage1', test);
  }

  logCompletedTest(testdata: any){
    return this.http.post<Message>('https://fgglhnye8h.execute-api.us-east-2.amazonaws.com/stage1', testdata);
  }

  getHistory(email: any){
    return this.http.post<Message>('https://7m9y7jso90.execute-api.us-east-2.amazonaws.com/stage1', email);
  }
}
