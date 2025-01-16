import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent implements OnInit{
  userId : string ="";
  userToken : string ="";
  constructor( 
    private activatedRoute:ActivatedRoute,
    private userService: UserService,
  ){
    this.activatedRoute.params.subscribe(params=>{
      this.userToken = params['token'];
      this.userService.idByToken(this.userToken).subscribe(userId=>{
        this.userService.getUserById(this.userId).subscribe(user=>{
          const activatedUser :any = {
            userName: user.userName,
            userFirstname:user.userFirstname,
            userDateOfBirth:user.userDateOfBirth,
            userAddress:user.userAddress,
            userEmail:user.userEmail,
            userAdmin:user.userAdmin,
            userDescritpion:user.userDescritpion,
            userEnabled:true,
            userIdentityCode:user.userIdentityCode,
            userImage:user.userImage,
            userLogo:user.userLogo,
            userPassword:user.userPassword,
            userManager:user.userManager,
            userNif : user.userNif,
            userStatut: user.userStatut,
            userTotalSolde:user.userTotalSolde,
            userRC : user.userRC,
            userPhone:user.userPhone,
            userType:user.userType,
            identityDocumentType: user.identityDocumentType,
            identityCardNumber  : user.identityCardNumber
          }
          this.userService.activateUser(activatedUser,userId).subscribe(_=>{
            alert("Utilisateur vérifié ! ")
            this.userService.confirmationEmail(this.userToken).subscribe(_=>{})
          })
        })
      })
    })
  }
  ngOnInit(): void {
    
  }

}
