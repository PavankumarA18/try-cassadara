import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }
  
  getDefaultSettings(){
    return this.http.get<Message>(' https://3di7orboz9.execute-api.us-east-2.amazonaws.com/stage1');
  }
}