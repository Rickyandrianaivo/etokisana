import { Component,OnInit,signal } from '@angular/core';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { PassworMatchValidator } from 'src/app/shared/validators/password_match_validator';


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
    TextareaComponent,
    MatCheckboxModule,
    MatFormFieldModule,
    TextInputComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    DefaultButtonComponent,
    PasswordInputComponent,
    HeaderComponent
  ],
  providers :[provideNativeDateAdapter()],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  userType = new FormControl('',Validators.required)
  readonly identityDocumentType = new FormControl();
  readonly dateOfBirth = new FormControl();
  showSellerForm = signal(false);
  fileName = "";
  registerForm!: FormGroup;
  isSubmitted = false;
  user : any;

  constructor(
    private userService     : UserService,
    private formBuilder     : FormBuilder,
    private router          : Router,
  ){

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
    const pattern:RegExp = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$');
    this.registerForm = this.formBuilder.group({
      userName:['',Validators.required],
      userFirstname:['',Validators.required],
      userPassword:['',Validators.required,],
      confirmPassword:['',Validators.required,],
      userEmail:['',Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')],
      userPhone:['',Validators.pattern("^[0-9]*$")],
      userDescritpion:[''],
      userStatut:[''],
      userManager:[''],
      userNif:[''],
      userRC:[''],
      identityCardNumber:[''],
      userAddress:[''],     
      //
    },{
      validators: PassworMatchValidator('password','confirmPassword')
    });
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
    if (this.registerForm.invalid){ 
        console.log(this.registerForm.getError);
        return;
    }
    if(this.userType.value == ""){
        alert("Veuillez renseigner si vous êtes particulier ou une entreprise")
        return;
    }
    
    const fv = this.registerForm.value;
    // console.log(fv.userName);
    this.user = {
    userName            : fv.userName ,         
    userFirstname       : fv.userFirstname ,  
    userPassword        : fv.userPassword ,  
    userEmail           : fv.userEmail ,     
    userPhone           : fv.userPhone ,      
    userType            : this.userType.value? this.userType.value : "particulier",  
    userTotalSolde      : 0 ,  
    userDescritpion     : fv.userDescritpion ,   
    userImage           : fv.userImage ,  
    userEnabled         : false ,  
    userDateOfBirth     : this.dateOfBirth.value,  
    userLogo            : fv.userLogo ,  
    userStatut          : fv.userStatut ,  
    userManager         : fv.userManager ,  
    userNif             : fv.userNif ,  
    userRC              : fv.userRC ,  
    identityDocumentType: this.identityDocumentType.value,
    identityCardNumber  : fv.identityCardNumber ,
    userAdmin           : false ,
    userAddress         : fv.userAddress ,
    userIdentityCode    : fv.userIdentityCode , // A voir comment le remplir
    };
    this.userService.getUserByEmail(this.user.userEmail).subscribe(useralreadyexist =>{
      if (useralreadyexist) {
        alert("Utilisateur déjà existant !")
        this.router.navigateByUrl("login");
        return;
      }else{
        this.userService.registerUser(this.user).subscribe(_ => {
          alert("Inscription réussie!");
          this.router.navigateByUrl("login");
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
