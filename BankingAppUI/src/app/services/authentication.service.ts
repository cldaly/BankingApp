import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject:BehaviorSubject<User>;
  public currentUser:Observable<User>;

  constructor(private http: HttpClient) { }

  login(username:string, password:string) {

  }
}
