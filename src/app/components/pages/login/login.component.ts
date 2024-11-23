import { Component } from '@angular/core';

import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IUserLogin } from '../../../shared/Interfaces/IUserLogin';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TextInputComponent,DefaultButtonComponent,FormsModule,ReactiveFormsModule],
  providers : [HttpClient],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  subscriptions : Subscription[] =[];
  loginForm!: FormGroup;
  isSubmitted : boolean = false;
  isLoged : boolean = false;
  url : string = 'menu';
  user ?: User;

  constructor(
    private userService     : UserService,
    private formBuilder     : FormBuilder,
    private router          : Router,
  ){
    this.user = userService.getUserFromLocalStorage()
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    },{
      
    });
    if (this.user?.userEmail) {
      // console.log(this.user)
      this.router.navigateByUrl('vente')
    }
    // this.returnUrl= this.activatedRoute.snapshot.queryParams['returnUrl'];
  }
  get fc(){
    return this.loginForm.controls;
  }
  
  submit(){
    this.isSubmitted =true;
    if (this.loginForm.invalid) return;
    
    const fv = this.loginForm.value;
    const user : IUserLogin = {
      userEmail      : fv.email,
      userPassword  : fv.password
    };
    this.userService.login(user).subscribe(_=>{
      this.router.navigateByUrl(this.url) ;
      
    })
  }
}
