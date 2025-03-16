import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RESET_TABLES_URL, USER_BY_EMAIL_URL, USER_BY_ID_URL, USER_EMAIL_CONFIRMATION_URL, USER_LOGIN_URL, USER_REGISTER_URL, USER_REQUESTRESETPASSWORD_URL, USER_RESETPASSWORD_URL, USER_TOKEN_VERIFICATION_URL, USER_UPDATE_URL, USER_UPLOAD_PDP_URL, USER_URL } from '../shared/constant/urls';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/Interfaces/IUserLogin';
import { IUserRegister } from '../shared/Interfaces/IUserRegister';
import { IUserToken } from '../shared/Interfaces/IUserToken';
import { Token } from '../shared/models/Token';
import { TokenVerification } from '../shared/models/TokenVerification';


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
  getUserById(userId :string) : Observable<User>{
    console.log(USER_BY_ID_URL+userId)
    return this.http.get<User>(USER_BY_ID_URL+ userId);
  }
  getUserByEmail(userEmail :string) : Observable<User>{
    return this.http.get<User>(USER_BY_EMAIL_URL + userEmail);
  }

  requestResetPassword(token : any ){
    return this.http.post(USER_REQUESTRESETPASSWORD_URL,token);
  }
  idByToken(token : any){
    console.log(token);
    return this.http.get(USER_TOKEN_VERIFICATION_URL+token);
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    this.router.navigateByUrl('/');
   }
  registerUser(registerUserData : IUserRegister){
    return this.http.post<User>(USER_REGISTER_URL,registerUserData).pipe(
      tap({
        next: () =>{
          alert("Inscription réussi !");
          this.router.navigateByUrl("login");
        }
      })
    )
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
          alert("Identifiant ou mot de passe incorrect")
          console.log(errorResponse.error)
          // this.toastrService.error(errorResponse, 'Login failed')
        }
      })
    );
  }

  confirmationEmail(token:string){
    return this.http.get(USER_EMAIL_CONFIRMATION_URL + token);
  }

  activateUser(updateData : IUserRegister, userId : string){
    return this.http.put<User>(USER_UPDATE_URL + userId, updateData)
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
