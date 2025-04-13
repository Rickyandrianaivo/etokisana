import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { ClientAreaItemsComponent } from '../../partials/client-area-items/client-area-items.component';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-client-area',
  standalone: true,
  imports: [
    ClientAreaItemsComponent,
    HeaderComponent,
    NgIf
  ],
  templateUrl: './client-area.component.html',
  styleUrl: './client-area.component.css'
})
export class ClientAreaComponent implements OnInit{
  user:any;
  link!:string;
  verifiedUser:boolean = false;
  constructor(
    private userService:UserService,
    private router: Router,
  ){
    this.user = this.userService.getUserFromLocalStorage();
    this.userService.getUserByEmail(this.user.userEmail).subscribe(user=>{
      this.verifiedUser = user.userValidated;
      if (user.userType=="admin") {
        this.router.navigateByUrl("/dashboard")
      }
    })
  }
  ngOnInit():void{
  }
}
