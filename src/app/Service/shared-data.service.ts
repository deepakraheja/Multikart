import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Users } from '../modals/Users';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  // private LoggedInUser = new BehaviorSubject(Users);
  // currentUser = this.LoggedInUser.asObservable();

  public user: Users[] = JSON.parse(sessionStorage.getItem('LoggedInUser'));
  private LoggedInUser = new BehaviorSubject(this.user);
  currentUser = this.LoggedInUser.asObservable();

  constructor() { }
  // currentUser(obj: Users) {
  //   this.LoggedInUser.next(obj);
  // }
  AssignUser(_user: Users[]) {
    this.LoggedInUser.next(_user);

  }

}
