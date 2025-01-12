import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

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
    this.activatedRoute.queryParams.subscribe(params=>{
      this.userId=params['id'];
      this.userToken=params['token'];
      this.userService.confirmationEmail(this.userToken,this.userId).subscribe(_=>{
        
      })
    })
  }
  ngOnInit(): void {
    
  }

}
