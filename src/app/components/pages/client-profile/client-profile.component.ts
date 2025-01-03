import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProfileItemComponent } from '../../partials/profile-item/profile-item.component';
import { HeaderComponent } from '../../partials/header/header.component';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,ProfileItemComponent,
    HeaderComponent
  ],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css'
})
export class ClientProfileComponent implements OnInit{
  user !: User;
  constructor(
    private userService:UserService,
  ){
    
  }
  ngOnInit() : void {
    const userLocal = this.userService.getUserFromLocalStorage()
    // this.user = this.userService.getUserFromLocalStorage()

    this.userService.getUserByEmail(userLocal.userEmail).subscribe(reqUser=>{
      console.log(this.user);
      this.user = reqUser;
    })
  }
}
