import { ChangeDetectionStrategy, Component,computed,inject,OnInit,signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../shared/models/User';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { MatIcon } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatDatepickerIntl,MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import * as nodemailer from 'nodemailer';
import { TextareaComponent } from '../../partials/textarea/textarea.component';
import { PasswordInputComponent } from '../../partials/password-input/password-input.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { HeaderComponent } from '../../partials/header/header.component';
import { PasswordMatchValidator } from 'src/app/shared/validators/password_match_validator';
import { MatButtonModule } from '@angular/material/button';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import { RadioInputComponent } from '../../partials/radio-input/radio-input.component';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    // MatIcon,
    // MatLabel,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    CommonModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    // TextareaComponent,
    MatCheckboxModule,
    MatFormFieldModule,
    TextInputComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    DefaultButtonComponent,
    PasswordInputComponent,
    HeaderComponent,
    MatFormFieldModule, 
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    RadioInputComponent,
    MatSnackBarModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers :[// The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},

    // Moment can be provided globally to your app by adding `provideMomentDateAdapter`
    // to your app config. We provide it at the component level here, due to limitations
    // of our example generation script.
    provideNativeDateAdapter(),],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  
  simpleSb !: MatSnackBarRef<SimpleSnackBar>;

  registerForm!: FormGroup;
  isSubmitted = false;
  userType!:AbstractControl;

  // readonly identityDocumentType = new FormControl();
  // readonly dateOfBirth = new FormControl();
  showSellerForm = signal(false);
  fileName = "";
  user : any;

  private readonly _adapter = inject<DateAdapter<unknown, unknown>>(DateAdapter);
  private readonly _intl = inject(MatDatepickerIntl);
  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));
  readonly dateFormatString = computed(() => {
    if (this._locale() === 'ja-JP') {
      return 'YYYY/MM/DD';
    } else if (this._locale() === 'fr') {
      return 'DD/MM/YYYY';
    }
    return '';
  });

  constructor(
    private formBuilder     : FormBuilder,
    private userService     : UserService,
    private router          : Router,
    private _snackBar        : MatSnackBar,
  ){
    
  }
  get formControl(){
    return this.userType as FormControl;
  }
  french() {
    this._locale.set('fr');
    this._adapter.setLocale(this._locale());
    this.updateCloseButtonLabel('Fermer le calendrier');
  }
  updateCloseButtonLabel(label: string) {
    this._intl.closeCalendarLabel = label;
    this._intl.changes.next();
  }
  customeEmailValidator(control:AbstractControl){
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
    const value = control.value;
    if (!pattern.test(value) && control.touched)
      return{
        emailError:true
      }
      else return null;
  }
  getError(control:any):string{
    if (control.errors?.required && control.touched)  
      return 'Ce champ est obligatoire';
    else if(control.errors?.emailError && control.touched)
      return 'Please enter valid email address!';
    else return '';
  }

  ngOnInit(): void {
    this.french();
    this.updateCloseButtonLabel('カレンダーを閉じる');

    const pattern:RegExp = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$');
    this.registerForm = this.formBuilder.group({
      userType :['',[Validators.required]],
      userName:['',Validators.required],
      userFirstname:['',Validators.required],
      userEmail:['',[Validators.required,Validators.email]],
      userPassword:['',Validators.required],
      confirmPassword:['',[Validators.required,PasswordMatchValidator]],
      userPhone:[''],
      refId:[''],
      // // userPhone:['',Validators.pattern("^[0-9]*$")],
      // userDateOfBirth:[],
      // userDescritpion:[''],
      // userManager:[''],
      // userStatut:[''],
      // userNif:[''],
      // userRC:[''],
      // identityCardNumber:[''],
      // userAddress:[''],     
    },{
      validators : PasswordMatchValidator("userPassword","confirmPassword"),
    }
  );
    // this.returnUrl= this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  toggleSellerForm(){
    this.showSellerForm.update(value =>!value)
  }
  get fc(){
    return this.registerForm.controls;
  }
  
  submit(){
    this.isSubmitted =true;
    if (!this.registerForm.valid){ 
        console.log(this.registerForm.getError);
        return;
    }
    
    const fv = this.registerForm.value;
    this.user = {
    userName            : fv.userName ,         
    userFirstname       : fv.userFirstname ,  
    userPassword        : fv.userPassword ,  
    userEmail           : fv.userEmail ,     
    userPhone           : fv.userPhone ,      
    userType            : fv.userType,  
    userTotalSolde      : 0 ,  
    userValidated       : false ,  
    userAccess          : "Utilisateur" ,
    userEmailVerified   :false,
    userParainId        :"",
    // userDescritpion     : fv.userDescritpion ,   
    // userImage           : fv.userImage ,  
    // userDateOfBirth     : this.dateOfBirth.value,  
    // userLogo            : fv.userLogo ,  
    // userStatut          : fv.userStatut ,  
    // userManager         : fv.userManager ,  
    // userNif             : fv.userNif ,  
    // userRC              : fv.userRC ,  
    // identityDocumentType: this.identityDocumentType.value,
    // identityCardNumber  : fv.identityCardNumber ,
    // userAddress         : fv.userAddress ,
    // userIdentityCode    : fv.userIdentityCode ,
    };
    this.userService.getUserByEmail(this.user.userEmail).subscribe(useralreadyexist =>{
      if (useralreadyexist) {
        this.simpleSb = this._snackBar.open("Déjà existant!","Se connecter")
        this.simpleSb.onAction().subscribe(() =>{
          this.router.navigateByUrl("login");
        })
        return;
      }else{
        this.simpleSb = this._snackBar.open("Inscritpion réussie","Se connecter")
        this.simpleSb.onAction().subscribe(() =>{
          this.router.navigateByUrl("login");
        })
        this.userService.registerUser(this.user).subscribe(_ =>{
        })
      }
    })
  }
  uploadClick(){

  }
  onFileSelected(event:Event) {
    let htmlInputElement = <HTMLInputElement>event.target!;
    const file = htmlInputElement.files ? htmlInputElement.files[0] :null;
    
    if (file) {

        this.fileName =file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        this.userService.uploadFile(formData).subscribe();
    }
  }
}
