import { Component,OnInit,signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    // MatIcon,
    // MatLabel,
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
    PasswordInputComponent
  ],
  providers :[provideNativeDateAdapter()],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  readonly userType = new FormControl();
  readonly identityDocumentType = new FormControl();
  readonly dateOfBirth = new FormControl();
  showSellerForm = signal(false);
  fileName = "";
  registerForm!: FormGroup;
  isSubmitted = false;
  user : User = new User();

  constructor(
    private userService     : UserService,
    private formBuilder     : FormBuilder,
    private router          : Router
  ){

  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName:['',Validators.required],
      userFirstname:['',Validators.required],
      userPassword:['',Validators.required,],
      userEmail:['',Validators.required,Validators.email],
      userPhone:[''],
      // userDescritpion:[''],
      // userStatut:[''],
      // userManager:[''],
      // userNif:[''],
      // userRC:[''],
      // identityCardNumber:[''],
      // userAddress:[''],
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
    
    const fv = this.registerForm.value;
    console.log(fv.userName);
    this.user = {
    userName            : fv.userName ,         
    userFirstname       : fv.userFirstname ,  
    userPassword        : fv.userPassword ,     
    userEmail           : fv.userEmail ,     
    userPhone           : fv.userPhone ,      
    userType            : this.userType.value ,  
    userTotalSolde      : 0 ,  
    // userDescritpion     : fv.userDescritpion ,   
    // userImage           : fv.userImage ,  
    // userEnabled         : false ,  
    // userDateOfBirth     : this.dateOfBirth.value,  
    // userLogo            : fv.userLogo ,  
    // userStatut          : fv.userStatut ,  
    // userManager         : fv.userManager ,  
    // userNif             : fv.userNif ,  
    // userRC              : fv.userRC ,  
    // identityDocumentType: this.identityDocumentType.value,
    // identityCardNumber  : fv.identityCardNumber ,
    // userAdmin           : false ,
    // userAddress         : fv.userAddress ,
    // userIdentityCode    : fv.userIdentityCode , // A voir comment le remplir
    };
    // console.log(this.user);
    this.userService.registerUser(this.user).subscribe(_ => {
      alert("registered successfully!");
      // this.sendEmail();
      this.router.navigateByUrl("login");
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

  // public sendEmail(e: Event) {
  //   // public sendEmail() {
  //   const transporter = nodemailer.createTransport({
  //     host: "smtp.gmail.email",
  //     port: 465,
  //     secure: true, // true for port 465, false for other ports
  //     auth: {
  //       user: "rickyandrianaivo@gmail.email",
  //       pass: "xtjmyjwqkgfnqlfd",
  //     },
  //   });
  // //   const html = `<h1>Bonjour</h1>
  // //   <p>"Pour finaliser vote inscription veuillez cliquer sur le lien suivant"</p>`
      

  // //   // async..await is not allowed in global scope, must use a wrapper
  //   async function main(user: User) {
  //     // send mail with defined transport object
  //     const info = await transporter.sendMail({
  //       from: '"Etokisana" <rickyandrianaivo@gmail.com>', // sender address
  //       // to: user.userEmail, // list of receivers
  //       to: "randrianaivo.dominique@gmail.com", // list of receivers
  //       subject: "Bienvenue sur Etokisana", // Subject line
  //       text: "Hello world?", // plain text body
  //       html: "<h1>Bonjour" + user.userName+"</h1>", // html body
  //       // html:html,
  //     });
    
  //     console.log("Message sent: %s", info.messageId);
  //     // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  //   }
    
  //   main(this.user).catch(console.error);
  // }
}
