import { Component } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProfileItemComponent } from '../../partials/profile-item/profile-item.component';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [HeaderComponent,MatFormFieldModule,MatInputModule,ProfileItemComponent],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css'
})
export class ClientProfileComponent {
  user !: User;
  constructor(
    private userService:UserService,
  ){
    
  }
  ngOnInit() : void {
    const userLocal = this.userService.getUserFromLocalStorage()
    // this.user = this.userService.getUserFromLocalStorage()

    this.userService.getUserByEmail(userLocal.userEmail).subscribe(reqUser=>{
      this.user = reqUser;
    })
  }
}
