import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DefaultButtonComponent } from 'src/app/components/partials/default-button/default-button.component';
import { AvatarModule } from 'ngx-avatars';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    SideBarComponent,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    // RouterLink,
    AvatarModule,
    NgIf,
    // DefaultButtonComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  userslist:any[]=[];
  displayedColumns: string[] = ['Photo','ID','Nom', 'Prénoms', 'Type', 'Solde','Approuvé','Email','EmailVerified','Action'];
  logedUser : any;

  constructor(
    private userService:UserService,
    private router : Router
  ){
    this.logedUser = this.userService.getUserFromLocalStorage();
    this.userService.getUserByEmail(this.logedUser.userEmail).subscribe(userCurrent =>{
      if (userCurrent.userAccess != "Admin") {
        this.router.navigateByUrl('home')
      }
    });

    this.userService.getAll().subscribe(users=>{
      this.userslist = users;
    })
  }

  ngOnInit(): void {
    
  }
  deleteUser(userId:string){
    this.userService.deleteUser(userId).subscribe(_=>{})
  }
  userToAmdin(userId : string){
    this.userService.userToAdmin(userId).subscribe(_=>{})
  }
  adminToUser(userId : string){
    this.userService.adminToUser(userId).subscribe(_=>{})
  }
}
