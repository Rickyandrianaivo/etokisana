import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog,MatDialogActions,MatDialogContent,MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DefaultButtonComponent } from 'src/app/components/partials/default-button/default-button.component';
import { AvatarModule } from 'ngx-avatars';
import { ValidationDialogComponent } from 'src/app/components/partials/validation-dialog/validation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { NotificationDialogComponent } from 'src/app/components/partials/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    SideBarComponent,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    // RouterLink,
    AvatarModule,
    NgIf,
    UpperCasePipe,
    // DefaultButtonComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  readonly dialog = inject(MatDialog);

  userslist:any[]=[];
  displayedColumns: string[] = ['Photo','ID','Nom', 'Prénoms', 'Type', 'Solde','Approuvé','Email','EmailVerified','Role','Action'];
  logedUser : any;
  selectedUser : any ;

  constructor(
    private userService:UserService,
    private router : Router
  ){
    this.logedUser = this.userService.getUserFromLocalStorage();
    this.userService.getUserByEmail(this.logedUser.userEmail).subscribe(userCurrent =>{
      if (userCurrent.userAccess != "Admin") {
        this.router.navigateByUrl('home');
      }
    });

    this.userService.getAll().subscribe(users=>{
      this.userslist = users;
    })
  }

  ngOnInit(): void {
    
  }
  openNotificationDialog(title:string , message:string, url:string|null = null,reload:boolean=false){
    const dialogRef = this.dialog.open(NotificationDialogComponent,{
      data : {
        title,
        message
      }
    })
    dialogRef.afterClosed().subscribe(result=>{
      if (result == true && url == null && reload == true) {
        window.location.reload();
      }
      if(url){
        this.router.navigateByUrl(url);
      }
    })
  }
  onCheckBoxValidationChange(dbId:string){
    this.userService.getUserById(dbId).subscribe(_=>{
      this.userService.validateUser(dbId).subscribe(_=>{
        this.openNotificationDialog("Validation réussie","L'utilisateur est approuvé. Un email lui a été envoyé")
      })
    })
  }
  onCheckBoxEmailVerificationChange(){
    this.openNotificationDialog("Vérification d'email","Un email est envoyé à l'utilisateur dès son inscription pour qu'il puisse vérifier son email",null,true)
  }
  deleteUser(userId:string){
    this.userService.deleteUser(userId).subscribe(_=>{});
    this.openNotificationDialog("Suppression d'un utilisateur","L'utilisateur a été supprimé !")
  }
  userToAdmin(userId : string){
    const adminProperty ={
      userAccess : "Admin"
    }
    this.userService.update(adminProperty,userId).subscribe(_=>{});
    // this.userService.userToAdmin(userId);
    this.openNotificationDialog("Promotion d'un utilisateur","L'utilisateur a été promu au rôle d'administrateur !",null,true)
  }
  adminToUser(userId : string){
    const userAccessProperty = {
      userAccess : "Utilisateur"
    }
    this.userService.update(userAccessProperty,userId).subscribe(_=>{});
    this.openNotificationDialog("Retrogradation d'un utilisateur","Cet utilisateur n'a plus les privilèges d'administrateur !",null,true)
  }
  CheckUser(userId : string){
    this.router.navigateByUrl('/userDetails/'+userId);
  }
}
// @Component({
//   standalone:true,
//   selector : 'approval-dialog',
//   templateUrl : 'approval-dialog.component.html',
//   imports :[
//     MatButtonModule,
//     MatDialogContent,
//     MatDialogTitle,
//     MatDialogActions
//   ],
// })
// export class ApprovalDialog{
//   dialog = inject(MatDialog);
//   openDialog(){
//     this.dialog.open(ApprovalDialog)
//   }
// }
