import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HeaderComponent } from '../../partials/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';

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
  typeES !: string;
  constructor(
    private userService : UserService,
    private router : Router,
    private activatedRoute : ActivatedRoute,
  ){
    this.currentUser = this.userService.getUserFromLocalStorage();
    this.userService.getAll().subscribe(userServer =>{
      this.usersList = userServer;
    })
    this.activatedRoute.params.subscribe(params=>{
      this.typeES = params['typeES'];
    })
  }
  choixPrestataire(prestataireId : string){
      this.router.navigateByUrl("/depot-sites/"+this.typeES+"/"+prestataireId)      
  }
}
