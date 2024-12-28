import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,SearchComponent,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
// subscriptions : Subscription[] = [];
  isLoged : boolean = false;
  isUser?:User;
  user : User = new User();
  constructor(
    private userService : UserService,
    private router:Router
    ) { 
    this.isUser = this.userService.getUserFromLocalStorage()
    if(this.isUser.userName){
      this.userService.getUserByEmail(this.isUser.userEmail).subscribe(userReq => {
        this.user = userReq;
      })
      this.isLoged = true;
    }else{
      this.isLoged = false;
    }
  }

  ngOnInit(): void {
    if(this.isUser?.userName){
      this.isLoged = true;
    }else{
      this.isLoged = false;
    }
  }

  logOut(){
    this.isLoged = false;
    this.userService.logout();
  }
}
