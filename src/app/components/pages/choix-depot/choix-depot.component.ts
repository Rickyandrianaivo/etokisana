import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HeaderComponent } from '../../partials/header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choix-depot',
  standalone: true,
  imports: [NgFor,HeaderComponent],
  templateUrl: './choix-depot.component.html',
  styleUrl: './choix-depot.component.css'
})
export class ChoixDepotComponent {
  currentUser: any;
  usersList : any;
  constructor(
    private userService : UserService,
    private router : Router,
  ){
    this.currentUser = this.userService.getUserFromLocalStorage();
    this.userService.getAll().subscribe(userServer =>{
      this.usersList = userServer;
    })
  }
  choixPrestataire(prestataireId : string){
    this.router.navigateByUrl("/depot-sites/"+prestataireId)
  }
}
