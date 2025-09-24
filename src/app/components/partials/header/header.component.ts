import { CommonModule } from '@angular/common';
import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';
// import { SearchComponent } from '../search/search.component';
import { MatIconModule } from '@angular/material/icon';
import { AvatarModule } from 'ngx-avatars';
import { NotificationService } from 'src/app/services/notification.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule }  from '@angular/material/badge';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    AvatarModule,
    MatMenuModule,
    MatButtonModule,
    MatBadgeModule,
    TruncatePipe,

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit,OnChanges{
  readonly dialog = inject(MatDialog);
// subscriptions : Subscription[] = [];
  notifications : any[]=[];
  isLoged : boolean = false;
  isUser?:User;
  user : User = new User();
  notificaitonTotal : number = 0;
  constructor(
    private userService : UserService,
    private router:Router,
    private notificationService : NotificationService,
    ) { 
    this.isUser = this.userService.getUserFromLocalStorage();
    if (!this.userService.checkUserConnection()) {
      console.log("no user connected !")
      this.router.navigateByUrl("login");
    }
    if(this.isUser.userEmail != null){
      this.userService.getUserByEmail(this.isUser.userEmail).subscribe(userReq => {
        this.user = userReq;
        if (!this.user) {
          this.userService.checkUserDeleted();
        }

        this.notificationService.getNotificationByOwner(this.user.userId).subscribe(allNotif =>{
          console.log(allNotif)
          this.notifications = allNotif;
          this.notificaitonTotal = this.notifications.length;
        })
      })
      this.isLoged = true;
       if (this.isUser.userEmail!=null) {
      this.userService.getUserByEmail(this.user.userEmail).subscribe(user=>{
      if (this.user.userType=="admin") {
        this.router.navigateByUrl("/dashboard")
      }
    })
    }else{
      this.router.navigateByUrl('login')
    }
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
    this.router.navigateByUrl('login');
  }
  opendialog(notificationTitle : string,notificationMessage : string,notificationId:string ){
      
    this.notificationService.openNotificationDialog(
        notificationTitle,
        notificationMessage,
        null,
        false,
      )
    
      
  }

  openNotificationDialog(title:string , message:string, url : string | null,reload:boolean =false , notificationId:string){
      const dialogRef = this.dialog.open(NotificationDialogComponent,{
        data : {
          title,
          message
        }
      })
      dialogRef.afterClosed().subscribe(result=>{
        if (result == true && !url && reload == true) {
          this.notificationService.updateNotification(notificationId,{
          states: "read",
        }).subscribe(result=>{
          console.log(result)
        })
          // window.location.reload();
          return;
        }
        if(result == true && url && reload == false){
          this.router.navigateByUrl(url);
        }
      })
    }
}
