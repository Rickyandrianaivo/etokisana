import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RESET_TABLES_URL, USER_LOGIN_URL, USER_REGISTER_URL, USER_UPDATE_URL, USER_UPLOAD_PDP_URL, USER_URL } from '../shared/constant/urls';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/Interfaces/IUserLogin';
import { IUserRegister } from '../shared/Interfaces/IUserRegister';


const USER_KEY = "User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User> ( this.getUserFromLocalStorage());
  public userObservable : Observable<User>;
  constructor(private http : HttpClient,
    // private toastrService : ToastrService,
    private router :Router) {
    this.userObservable = this.userSubject.asObservable();
  }

  resetTables(){
    console.log("we're on the service")
    return this.http.get(RESET_TABLES_URL);
  }

  getAll() : Observable<User[]>{
    return this.http.get<User[]>(USER_URL);
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    this.router.navigateByUrl('/');
   }

  registerUser(registerUserData : IUserRegister){
    return this.http.post<User>(USER_REGISTER_URL,registerUserData)
  }
  uploadFile(formData:FormData){
    console.log("image uploaded !! ")
    return this.http.post(USER_UPLOAD_PDP_URL, formData)
  }

  login(loginData : IUserLogin){
    return this.http.post<User>(USER_LOGIN_URL,loginData).pipe(
      tap({
        next : (user) => {
          this.setUserToLocalStorage(user);
          // this.toastrService.success(`Successful login ! Welcome ${user.name}`)
        },
        error:(errorResponse) => {
          // this.toastrService.error(errorResponse, 'Login failed')
        }
      })
    );
  }

  update(updateData : IUserRegister, userId : string){
    return this.http.put<User>(USER_UPDATE_URL + userId, updateData)
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY,JSON.stringify(user));
  }

  public getUserFromLocalStorage() : User{ 
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
    }
}
