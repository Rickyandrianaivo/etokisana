import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';
// import { SearchComponent } from '../search/search.component';
import { MatIconModule } from '@angular/material/icon';
import { AvatarModule } from 'ngx-avatars';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,
    // SearchComponent,
    RouterLink,
    MatIconModule,
    AvatarModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit,OnChanges{
// subscriptions : Subscription[] = [];
  notifications : any[]=[];
  isLoged : boolean = false;
  isUser?:User;
  user : User = new User();
  constructor(
    private userService : UserService,
    private router:Router,
    private notificationService : NotificationService,
    ) { 
    this.isUser = this.userService.getUserFromLocalStorage()
    if(this.isUser.userName){
      this.userService.getUserByEmail(this.isUser.userEmail).subscribe(userReq => {
        this.user = userReq;
        console.log(this.user)

        this.notificationService.getNotificationByOwner(this.user.userId).subscribe(allNotif =>{
          this.notifications = allNotif;
        })
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
  ngOnChanges(changes: SimpleChanges): void {
    this.isUser = this.userService.getUserFromLocalStorage()
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
