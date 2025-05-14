import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CORPORATE_BY_EMAIL_URL, CORPORATE_BY_ID_URL, CORPORATE_DELETE_URL, CORPORATE_EMAIL_CONFIRMATION_URL, CORPORATE_GET_LOGO_URL, CORPORATE_LOGIN_URL, CORPORATE_NEW_URL, CORPORATE_REGISTER_URL, CORPORATE_REQUESTRESETPASSWORD_URL, CORPORATE_RESETPASSWORD_URL, CORPORATE_TOKEN_VERIFICATION_URL, CORPORATE_UPDATE_URL, CORPORATE_UPLOAD_LOGO_URL, CORPORATE_URL, CORPORATE_VALIDATE_URL } from '../shared/constant/urls';
import { HttpClient } from '@angular/common/http';
import { CorporateUser } from '../shared/models/CorporateUser';
import { Token } from '../shared/models/Token';
import { TokenVerification } from '../shared/models/TokenVerification';
import { ICorporateUserLogin } from '../shared/Interfaces/ICorporateUserLogin';
import { ICorporateUserRegister } from '../shared/Interfaces/ICorporateUserRegister';


const CORPORATE_KEY = "Corporate";

@Injectable({
  providedIn: 'root'
})
export class CorporateService {
  private CorporateSubject = new BehaviorSubject<CorporateUser> ( this.getCorporateFromLocalStorage());
  public CorporateObservable : Observable<CorporateUser>;
  constructor(private http : HttpClient,
    // private toastrService : ToastrService,
    private router :Router) {
    this.CorporateObservable = this.CorporateSubject.asObservable();
  }

  getAll() : Observable<CorporateUser[]>{
    return this.http.get<CorporateUser[]>(CORPORATE_URL);
  }
  getCorporateById(CorporateId :string) : Observable<CorporateUser>{
    console.log(CORPORATE_BY_ID_URL+CorporateId)
    return this.http.get<CorporateUser>(CORPORATE_BY_ID_URL+ CorporateId);
  }
  getCorporateByCorporateId(CorporateId :string) : Observable<CorporateUser>{
    console.log(CORPORATE_BY_ID_URL+CorporateId)
    return this.http.get<CorporateUser>(CORPORATE_BY_ID_URL+ CorporateId);
  }
  getCorporateByEmail(CorporateEmail :string) : Observable<CorporateUser>{
    return this.http.get<CorporateUser>(CORPORATE_BY_EMAIL_URL + CorporateEmail);
  }

  requestResetPassword(CorporateInfo:any){
    return this.http.post(CORPORATE_REQUESTRESETPASSWORD_URL,CorporateInfo);
  }
  resetPassword(data:any){
    return this.http.put(CORPORATE_RESETPASSWORD_URL,data);
  }
  idByToken(token : any){
    console.log(token);
    return this.http.get(CORPORATE_TOKEN_VERIFICATION_URL+token);
  }

  logout(){
    this.CorporateSubject.next(new CorporateUser());
    localStorage.removeItem(CORPORATE_KEY);
    this.router.navigateByUrl('/');
   }
  registerCorporate(registerCorporateData : ICorporateUserRegister){
    return this.http.post<CorporateUser>(CORPORATE_REGISTER_URL,registerCorporateData).pipe(
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
    return this.http.post(CORPORATE_UPLOAD_LOGO_URL, formData)
  }

  login(loginData : ICorporateUserLogin){
    return this.http.post<CorporateUser>(CORPORATE_LOGIN_URL,loginData).pipe(
      tap({
        next : (Corporate) => {
          this.setCorporateToLocalStorage(Corporate);
          // this.toastrService.success(`Successful login ! Welcome ${Corporate.name}`)
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
    return this.http.get(CORPORATE_EMAIL_CONFIRMATION_URL + token);
  }
  getNewCorporates() : Observable<CorporateUser[]>{
    return this.http.get<CorporateUser[]>(CORPORATE_NEW_URL)
  }
  validateCorporate(CorporateId:string, CorporateValidationData : any){
    return this.http.patch<CorporateUser>(CORPORATE_VALIDATE_URL + CorporateId,CorporateValidationData)
  }
  activateCorporate(updateData : ICorporateUserRegister, CorporateId : string){
    return this.http.put<CorporateUser>(CORPORATE_UPDATE_URL + CorporateId, updateData)
  }
  update(updateData : ICorporateUserRegister, CorporateId : string){
    return this.http.patch<CorporateUser>(CORPORATE_UPDATE_URL + CorporateId, updateData)
  }
  delete(CorporateId:string){
    return this.http.delete(CORPORATE_DELETE_URL + CorporateId);
  }

  private setCorporateToLocalStorage(Corporate:CorporateUser){
    localStorage.setItem(CORPORATE_KEY,JSON.stringify(Corporate));
  }

  public getCorporateFromLocalStorage() : CorporateUser{ 
    const CorporateJson = localStorage.getItem(CORPORATE_KEY);
    if (CorporateJson) return JSON.parse(CorporateJson) as CorporateUser;
    return new CorporateUser();
    }

  
    
  get_image(){
    return this.http.get(CORPORATE_GET_LOGO_URL)
  }
}
