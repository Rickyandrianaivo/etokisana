import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DefaultButtonComponent } from 'src/app/components/partials/default-button/default-button.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    SideBarComponent,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    RouterLink,
    DefaultButtonComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  userslist:any[]=[];
  displayedColumns: string[] = ['Photo','Nom', 'Prénoms', 'Type', 'Solde','Verifier','Action'];

  constructor(
    private userService:UserService,
  ){
    this.userService.getAll().subscribe(users=>{
      this.userslist = users;
    })
  }

  ngOnInit(): void {
    
  }
  deleteUser(userId:string){

  }
}
