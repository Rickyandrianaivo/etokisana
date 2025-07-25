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
import {MatProgressBarModule} from '@angular/material/progress-bar';
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
import { InputValidationComponent } from '../../partials/input-validation/input-validation.component';
import { DateInputComponent } from '../../partials/date-input/date-input.component';
import { timestamp } from 'rxjs';
import { NotificationDialogComponent } from '../../partials/notification-dialog/notification-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

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
    // InputValidationComponent,
    DateInputComponent,
    MatProgressBarModule,
    MatDialogModule
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
  readonly dialog = inject(MatDialog);
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
  fileName:any;
  identityDocumentName1 = "";
  identityDocumentName2 = "";
  user : any;
  image : any = "default.jpg";
  identityDocument : any[] = ["placeholder_IDCard_Recto.png","placeholder_IDCard_Verso.png"] ;
  carteFiscale : any[] = ["placeholder_IDCard_Recto.png","placeholder_IDCard_Verso.png"] ;

  //Corporate User
  corporateCarteStat : string = "";
  corporateLogo : any = "default.jpg";
  corporateCarteFiscale : string = "";
  contactPhone = new FormControl();

  corporateUser : boolean = false;
  corporateType : string = "";
  SuccessRegister :boolean = false;
  // jour = new FormControl();
  // mois = new FormControl();
  // annee = new FormControl();
  // dateOfBithr = new Date(this.annee,this.mois,this.jour)


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
      userName:['',Validators.required],
      userFirstname:['',Validators.required],
      userEmail:['',[Validators.required,Validators.email]],
      userPassword:['',Validators.required],
      confirmPassword:['',[Validators.required,PasswordMatchValidator]],
      userPhone:[''],
      userAddress : [''],
      userMainLat : [''],
      userMainLng : [''],
      // userDateOfBirth:['',[Validators.required]],
      identityCardNumber:['',[Validators.required]],
    },{
      validators : PasswordMatchValidator("userPassword","confirmPassword"),
    }
  );
    // this.returnUrl= this.activatedRoute.snapshot.queryParams['returnUrl'];
    this.registerCorporateForm = this.formBuilder.group({
      raisonSocial : ['',[Validators.required]],
      type : [''],
      rcs : [''],
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
    // console.log("submit = " + this.isSubmitted)
    const generatedID = Math.random().toString(36).slice(2,10)
    // console.log(this.dateOfBirth.value._d);
    if(this.showSellerForm()){
      if (!this.registerCorporateForm.valid){ 
          console.log(this.registerCorporateForm.getError);
          this.openNotificationDialog(
            "Formulaire incomplet",
            "Veuillez vérifier si tous les champs obligatoires sont remplis",
            null,
            false);
          return;
      }
      if(!this.identityDocumentName1 || !this.identityDocumentName2){
        this.openNotificationDialog(
          "Formulaire incomplet",
          "Les photos du document d'identification sont obligatoire pour la validation de votre inscription",
          null,
          false);
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
        identityCardNumber  : fv.nif ,
        identityDocument    : this.identityDocument,
        documentType        : fv.documentType,
        raisonSocial        : fv.raisonSocial,
        type                : this.type,
        rcs                 : fv.rcs,
        carteStat           : "",
        nif                 : fv.nif,
        carteFiscal         : this.identityDocument,
        logo                : this.corporateLogo,
        managerName         : fv.managerName,
        managerEmail        : fv.managerEmail,
      }
    }
    if(!this.showSellerForm()){
      if (!this.registerForm.valid){ 
            console.log(this.registerForm.getError);
            this.openNotificationDialog(
              "Formulaire incomplet",
              "Veuillez vérifier si tous les champs obligatoires sont remplis",
              null,
              false);
            return;
      }
      if(!this.identityDocumentName1 || !this.identityDocumentName2){
        this.openNotificationDialog(
          "Formulaire incomplet",
          "Les photos du document d'identification sont obligatoire pour la validation de votre inscription",
          null,
          false);
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
        userId              : generatedID,
        userImage           : this.image ,  
        identityCardNumber  : fv.identityCardNumber ,
        identityDocument    : this.identityDocument,
        documentType        : this.documentType,
        raisonSocial        : "",
        type                : "",
        rcs                 : "",
        carteStat           : "",
        nif                 : "",
        carteFiscal         : "",
        logo                : "",
        managerName         : "",
        managerEmail        : "",
      }
    }
      console.log(this.user)

    this.userService.getUserByEmail(this.user.userEmail).subscribe(useralreadyexist =>{
      if (useralreadyexist) {
        console.log(useralreadyexist)
        this.simpleSb = this._snackBar.open("Un compte utilise déjà cet email","Se connecter",{duration : 10000})
        this.simpleSb.onAction().subscribe(() =>{
          this.router.navigateByUrl("login");
        })
        return;
      }else{
        // this.router.navigateByUrl('login');
        // this.simpleSb = this._snackBar.open("Inscritpion réussie","Se connecter",{duration : 10000})
        // this.simpleSb.onAction().subscribe(() =>{
        //   this.router.navigateByUrl("login");

        // })
        this.userService.registerUser(this.user).subscribe(_=>{
          this.simpleSb = this._snackBar.open("Inscritpion réussie","Se connecter",{duration : 10000})
          this.simpleSb.onAction().subscribe(() =>{
            this.SuccessRegister =true;
            // this.router.navigateByUrl("login");
          })
        })
        this.openNotificationDialog(
          "Inscription envoyer", 
          "Un email vous a été envoyé vous permettons la vérification de votre email. Une notification vous parviendra dès que votre compte sera opérationnel",
          "login",
          false)
      }
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

  onCarteFiscalRectoSelected(event:any) {
    const reader = new FileReader();
    if (event) {
      // this.fileName = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () =>{
        // console.log(reader.result);
        this.identityDocument[0] = reader.result;
        this.carteFiscale[0] = reader.result;
      }
    }
    reader.onerror = error =>{
      console.log("Error: ",error);
    }
  }
  onCarteFiscalVersoSelected(event:any) {
    const reader = new FileReader();
    if (event) {
      // this.fileName = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () =>{
        this.identityDocument[1] = reader.result;
        this.carteFiscale[1] = reader.result;
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
        this.image = reader.result;
        reader.readAsDataURL(this.image);
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
        this.corporateLogo = reader.result;
      }
    }
    reader.onerror = error =>{
      console.log("Error: ",error);
    }
  }
  onFileDocumentRectoSelected(event:any) {
    console.log(event)
    const reader = new FileReader();
    if (event) {
      this.identityDocumentName1 = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () =>{
        this.identityDocument[0] = reader.result;
      }
    }
    reader.onerror = error =>{
      console.log("Error: ",error);
    }
  }
  onFileDocumentVersoSelected(event:any) {
    console.log(event)
    const reader = new FileReader();
    if (event) {
      this.identityDocumentName2 = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () =>{
        this.identityDocument[1] = reader.result;
      }
    }
    reader.onerror = error =>{
      console.log("Error: ",error);
    }
  }
  openNotificationDialog(title:string , message:string, url : string | null,reload:boolean =false){
      const dialogRef = this.dialog.open(NotificationDialogComponent,{
        data : {
          title,
          message
        }
      })
      dialogRef.afterClosed().subscribe(result=>{
        if (result == true && !url && reload == true) {
          window.location.reload();
        }
        if(url){
          this.router.navigateByUrl(url);
        }
      })
    }
}
