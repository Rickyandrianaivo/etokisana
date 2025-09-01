import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProfileItemComponent } from '../../partials/profile-item/profile-item.component';
import { HeaderComponent } from '../../partials/header/header.component';
import { AvatarModule } from 'ngx-avatars';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../partials/text-input/text-input.component';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ProfileItemComponent,
    AvatarModule,
    HeaderComponent,
    ReactiveFormsModule,
    FormsModule,
    TextInputComponent,
  ],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css'
})
export class ClientProfileComponent implements OnInit{
  user !: User;
  profileImage!:string;
  userForm !: FormGroup;
  corporateForm !: FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
  ){
  }
  ngOnInit() : void {
    this.userForm = this.formBuilder.group({
      userName:[''],
      userFirstname:[''],
      userPhone:[''],
      userEmail:[''],
    })

    this.corporateForm = this.formBuilder.group({
      userName:[''],
      userFirstname:[''],
      userPhone:[''],
      userEmail:[''],
      userStatus : [''],
      userNif : [''],
      userRCS : [''],
      managerName : [''],
      managerEmail : [''],
      userType : [''],
    })

    

    const userLocal = this.userService.getUserFromLocalStorage()
    // this.user = this.userService.getUserFromLocalStorage()

    this.userService.getUserByEmail(userLocal.userEmail).subscribe(reqUser=>{
      console.log(this.user);
      this.user = reqUser;
      this.profileImage = this.user.userImage;
    })
  }
  get fc(){
    return this.corporateForm.controls;
  }
  get fu(){
    return this.userForm.controls;
  }
  submit(){
      
  }
  validateModif(){
    // this.validationButton.emit([this.control.value,this.label]);
    // console.log(this.label + ":" +this.control.value);
  }

  changeModifMode(){
    // this.modifmode = !this.modifmode;
  }
}
