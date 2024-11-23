import { Component,signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/User';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { MatIcon } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../partials/header/header.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatIcon,
    MatLabel,
    FormsModule,
    CommonModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    HeaderComponent,
    MatCheckboxModule,
    MatFormFieldModule,
    TextInputComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    DefaultButtonComponent,
  ],
  providers :[provideNativeDateAdapter()],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  readonly userGender = new FormControl();
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
      userPassword:['',Validators.required],
      userEmail:['',Validators.required,Validators.email],
      userPhone:[''],
      userDescritpion:[''],
      // userImage:['',[Validators.required]],
      // userEnabled:['',[Validators.required]],
      // userDateOfBirth:[''],
      // userTotalSolde:['',[Validators.required]],
      // userLogo:['',[Validators.required]],
      userStatut:[''],
      userManager:[''],
      userNif:[''],
      userRC:[''],
      // identityDocumentType:[''],
      identityCardNumber:[''],
      // userAdmin:['',[Validators.required]],
      userAddress:[''],
      // userIdentityCode:['',[Validators.required]],
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
    userName          : fv.userName ,         
    userFirstname     : fv.userFirstname ,  
    userPassword        : fv.userPassword ,     
    userEmail           : fv.userEmail ,     
    userPhone           : fv.userPhone ,      
    userDescritpion     : fv.userDescritpion ,   
    userGender          : this.userGender.value ,  
    userImage           : fv.userImage ,  
    userEnabled         : false ,  
    userDateOfBirth     : this.dateOfBirth.value,  
    userTotalSolde      : 0 ,  
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
    // console.log(this.user);
    this.userService.registerUser(this.user).subscribe(_ => {
      alert("registered successfully!");
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
  //   const transporter = nodemailer.createTransport({
  //     host: "smtp.gmail.email",
  //     port: 465,
  //     secure: true, // true for port 465, false for other ports
  //     auth: {
  //       user: "rickyandrianaivo@gmail.email",
  //       pass: "xtjmyjwqkgfnqlfd",
  //     },
  //   });
    
  //   // async..await is not allowed in global scope, must use a wrapper
  //   async function main(user: User) {
  //     // send mail with defined transport object
  //     const info = await transporter.sendMail({
  //       from: '"Etokisana" <rickyandrianaivo@gmail.com>', // sender address
  //       to: user.email, // list of receivers
  //       subject: "Hello ✔", // Subject line
  //       text: "Hello world?", // plain text body
  //       html: "<b>Hello world?</b>", // html body
  //     });
    
  //     console.log("Message sent: %s", info.messageId);
  //     // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  //   }
    
  //   main(this.user).catch(console.error);
  // }
}
