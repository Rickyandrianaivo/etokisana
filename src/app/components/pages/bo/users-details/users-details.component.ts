import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileItemComponent } from 'src/app/components/partials/profile-item/profile-item.component';
import { UserService } from 'src/app/services/user.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { AvatarModule } from 'ngx-avatars';

@Component({
  selector: 'app-users-details',
  standalone: true,
  imports: [SideBarComponent,ProfileItemComponent,AvatarModule],
  templateUrl: './users-details.component.html',
  styleUrl: './users-details.component.css'
})
export class UsersDetailsComponent {
  profileImage!:string;
  theUser : any;
  documentFile:any;

  constructor(
    private userSerivce:UserService,
    private activatedRoute : ActivatedRoute
  ){
    this.activatedRoute.params.subscribe(req=>{
      this.userSerivce.getUserById(req['id']).subscribe(res =>{
        this.theUser = res;
        this.documentFile = res.identityDocument;
        this.profileImage = res.userImage
      })
    })
    // const blob = new Blob([atob(this.documentFile)])
    // const link = document.createElement("a");
    // link.href = window.URL.createObjectURL(blob)
    // link.download = "documentFile"

    // link.click();
  } 
}
