import { ChangeDetectionStrategy, Component,computed,inject,OnInit,signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../shared/models/User';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
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
import {DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material/core';
import { RadioInputComponent } from '../../partials/radio-input/radio-input.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { InputContainerComponent } from '../../partials/input-container/input-container.component';
import { SiteService } from 'src/app/services/site.service';
import { Site } from 'src/app/shared/models/Sites';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import 'moment/locale/fr';
import { AvatarModule } from 'ngx-avatars';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';

const MY_DATE_FORMAT = {
  parse : {
    dateInput : 'DD/MM/YYYY', //this is how your date will be parsed from Input
  },
  display :{
    dateInput: 'DD/MM/YYYY', // this is how yout date get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    AvatarModule,
    CommonModule,
    MatIconModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    HeaderComponent,
    MatButtonModule,
    GoogleMapsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    TextInputComponent,
    MatFormFieldModule, 
    // RadioInputComponent,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    NgxIntlTelInputModule,
    // DefaultButtonComponent,
    PasswordInputComponent,
    InputContainerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers :[// The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    // {provide: DateAdapter, useClass:MomentDateAdapter,deps:[MAT_DATE_LOCALE]},
    // {provide : MAT_DATE_FORMATS, useValue : MY_DATE_FORMAT},

    // Moment can be provided globally to your app by adding `provideMomentDateAdapter`
    // to your app config. We provide it at the component level here, due to limitations
    // of our example generation script.
    provideMomentDateAdapter(),
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  imageIsUploaded : boolean = false;
  display : any;
  center: google.maps.LatLngLiteral = {
    lat: -19.0000000,
    lng: 47.0000000
  };
  type : string = "";
  position:any;
  latitude:number = 0;
  longitude:number = 0;
  simpleSb !: MatSnackBarRef<SimpleSnackBar>;
  documentType : string = "cin"
  registerForm!: FormGroup;
  registerCorporateForm!: FormGroup;
  isSubmitted = false;
  userType!:AbstractControl;
  userPhone = new FormControl();
  // readonly identityDocumentType = new FormControl();
  readonly dateOfBirth = new FormControl();
  showSellerForm = signal(false);
  fileName = "";
  identityDocumentName = "";
  user : any;
  image : any = "default.jpg";
  identityDocument : any ;
  carteFiscale : any ;

  //Corporate User
  corporateCarteStat : string = "";
  corporateLogo : any = "default.jpg";
  corporateCarteFiscale : string = "";
  contactPhone = new FormControl();

  corporateUser : boolean = false;



  private readonly _adapter = inject<DateAdapter<unknown, unknown>>(DateAdapter);
  private readonly _intl = inject(MatDatepickerIntl);
  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));
  readonly dateFormatString = computed(() => {
    if (this._locale() === 'ja-JP') {
      return 'YYYY/MM/DD';
    } else if (this._locale() === 'fr-FR') {
      return 'DD/MM/YYYY';
    }
    return '';
  });

  constructor(
    private formBuilder     : FormBuilder,
    private userService     : UserService,
    private router          : Router,
    private _snackBar       : MatSnackBar,
    private siteService     : SiteService,
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
    // this.updateCloseButtonLabel('カレンダーを閉じる');

    const pattern:RegExp = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$');
    this.registerForm = this.formBuilder.group({
      userType :['',[Validators.required]],
      userName:['',Validators.required],
      userFirstname:['',Validators.required],
      userEmail:['',[Validators.required,Validators.email]],
      userPassword:['',Validators.required],
      confirmPassword:['',[Validators.required,PasswordMatchValidator]],
      userPhone:[''],
      userAddress : [''],
      userMainLat : [''],
      userMainLng : [''],
      userDateOfBirth:[''],
      identityCardNumber:[''],
    },{
      validators : PasswordMatchValidator("userPassword","confirmPassword"),
    }
  );
    // this.returnUrl= this.activatedRoute.snapshot.queryParams['returnUrl'];
    this.registerCorporateForm = this.formBuilder.group({
      raisonSocial : ['',[Validators.required]],
      type : [''],
      rcs : ['',[Validators.required]],
      nif : ['',[Validators.required]],
      managerName : [''],
      managerEmail : [''],
      contactName : ['',Validators.required],
      contactPhone : [''],
      contactEmail : ['',Validators.required],
      siegeAddress: [''],
      userPassword:['',Validators.required],
      confirmPassword:['',[Validators.required,PasswordMatchValidator]],
    },{
      validators : PasswordMatchValidator("userPassword","confirmPassword"),
    })

  }

  toggleSellerForm(){
    this.showSellerForm.update(value =>!value)
  }
  get fc(){
    return this.registerForm.controls;
  }
  get cfc(){
    return this.registerCorporateForm.controls;
  }
  
  submitUser(){
    this.isSubmitted =true;
    const generatedID = Math.random().toString(36).slice(2,10)
    // console.log(this.dateOfBirth.value._d);
    if(this.showSellerForm()){
      if (!this.registerCorporateForm.valid){ 
          console.log(this.registerForm.getError);
          return;
      }
      
      const fv = this.registerCorporateForm.value;
      this.user = {
        userName            : fv.contactName ,         
        userFirstname       : "" ,  
        userPassword        : fv.userPassword ,  
        userEmail           : fv.contactEmail,     
        userPhone           : fv.contactPhone.internationalNumber ,      
        userType            : "Entreprise",  
        userTotalSolde      : 0 ,  
        userValidated       : false ,  
        userAccess          : "Utilisateur" ,
        userEmailVerified   : false,
        userParainId        : "",
        userDateOfBirth     : "",  
        userMainLat         : this.latitude,
        userMainLng         : this.longitude,
        userAddress         : fv.siegeAddress ,
        userId              : generatedID,
        userImage           : this.corporateLogo,  
        identityCardNumber  : "",
        identityDocument    : "",
        documentType        : "",
        raisonSocial        : fv.raisonSocial,
        type                : fv.type,
        rcs                 : fv.rcs,
        carteStat           : "",
        nif                 : fv.nif,
        carteFiscal         : "",
        logo                : this.corporateLogo,
        managerName         : fv.managerName,
        managerEmail        : fv.managerEmail,
      }
    }else{
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
        userPhone           : fv.userPhone.internationalNumber ,      
        userType            : "Particulier",  
        userTotalSolde      : 0 ,  
        userValidated       : false ,  
        userAccess          : "Utilisateur" ,
        userEmailVerified   : false,
        userParainId        : "",
        userMainLat         : this.latitude,
        userMainLng         : this.longitude,
        userDateOfBirth     : this.dateOfBirth.value._d,  
        userAddress         : fv.userAddress ,
        userID              : generatedID,
        userImage           : this.image ,  
        identityCardNumber  : fv.identityCardNumber ,
        identityDocument    : this.identityDocument,
        documentType        : fv.docuementType,
        raisonSocial        : fv.raisonSocial,
        type                : fv.type,
        rcs                 : fv.rcs,
        carteStat           : "",
        nif                 : fv.nif,
        carteFiscal         : this.carteFiscale,
        logo                : this.corporateLogo,
        managerName         : fv.managerName,
        managerEmail        : fv.managerEmail,
      }
    }

    this.userService.getUserByEmail(this.user.userEmail).subscribe(useralreadyexist =>{
      if (useralreadyexist) {
        console.log(useralreadyexist)
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
        
      }
    })
    this.userService.registerUser(this.user).subscribe(_ =>{
      this.simpleSb = this._snackBar.open("Inscritpion réussie","Se connecter")
        this.simpleSb.onAction().subscribe(() =>{
          this.router.navigateByUrl("login");
        })
    })
    console.log(this.user.userPhone.internationalNumber)
    const mainSite :Site = {
      siteAddress     : this.user.userAddress,
      siteName        : "Domicile",
      siteLat         : this.latitude,
      siteLng         : this.longitude,
      siteUserID      : generatedID,
    };
    this.siteService.addSite(mainSite).subscribe(_=>{})
  }  
  /*------------------------------------------
   --------------------------------------------
   moveMap()
   --------------------------------------------
   --------------------------------------------*/
   moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) 
      {
        this.position = (event.latLng.toJSON());
        this.latitude = event.latLng.lat();
        this.longitude = event.latLng.lng();
      }
    }

  onCarteFiscalSelected(event:any) {
    const reader = new FileReader();
    if (event) {
      this.fileName = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () =>{
        console.log(reader.result);
        this.carteFiscale = reader.result;
      }
    }
    reader.onerror = error =>{
      console.log("Error: ",error);
    }
  }
  onFileImageSelected(event:any) {
    const reader = new FileReader();
    if (event) {
      this.fileName = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () =>{
        console.log(reader.result);
        this.image = reader.result;
      }
    }
    reader.onerror = error =>{
      console.log("Error: ",error);
    }
    
    // let htmlInputElement = <HTMLInputElement>event.target!;
    // const file = htmlInputElement.files ? htmlInputElement.files[0] :null;
    
    // if (file) {

    //     this.fileName =file.name;

    //     const formData = new FormData();

    //     formData.append("thumbnail", file);

    //     this.userService.uploadFile(formData).subscribe();
    // }
  }
  onFileLogoSelected(event:any) {
    const reader = new FileReader();
    if (event) {
      this.fileName = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () =>{
        // console.log(reader.result);
        this.corporateLogo = reader.result;
      }
    }
    reader.onerror = error =>{
      console.log("Error: ",error);
    }
  }
  onFileDocumentSelected(event:any) {
    console.log(event)
    const reader = new FileReader();
    if (event) {
      this.identityDocumentName = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () =>{
        console.log(reader.result);
        this.identityDocument = reader.result;
      }
    }
    reader.onerror = error =>{
      console.log("Error: ",error);
    }
    
    // let htmlInputElement = <HTMLInputElement>event.target!;
    // const file = htmlInputElement.files ? htmlInputElement.files[0] :null;
    
    // if (file) {

    //     this.fileName =file.name;

    //     const formData = new FormData();

    //     formData.append("thumbnail", file);

    //     this.userService.uploadFile(formData).subscribe();
    // }
  }
}
