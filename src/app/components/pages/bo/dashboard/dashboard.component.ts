import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SideBarComponent,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    DatePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  usersNewList : any[] = [] ;
  usersTableColumns: string[] = ['Nom', 'Prenom', 'Type', 'Date','Email','Document','Action'];
  constructor(
    private userService : UserService,
    private router :Router,
  ){
    this.userService.getNewUsers().subscribe(users =>{
      this.usersNewList = users;
      console.log(this.usersNewList)
    })
    
  }
  ValidateUser(userId : string){
    this.userService.validateUser(userId,{userValidate : true}).subscribe(_=>{});
  }
  deleteUser(userId:string){
    this.userService.delete(userId).subscribe(_=>{

    })
  }
}
