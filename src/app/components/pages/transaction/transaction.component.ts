import { Component, OnInit } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatTableModule
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit{
  userCurrent :any;
  isDepot     !:boolean;
  isRetrait   !:boolean;
  isAchat     !:boolean;
  isVente     !:boolean;
  isHistorique!:boolean;
  achatList   :any[]=[];
  venteList   :any[]=[];
  depotList   :any[]=[];
  retraitList :any[]=[];
  displayedColumns: string[] = ['Date','Situation', 'Type', 'Montant','Methode'];
constructor(
  private userService:UserService,
  private router:Router
){
  
}
ngOnInit(): void {
  this.userCurrent = this.userService.getUserFromLocalStorage()
  if (!this.userCurrent) {
    this.router.navigateByUrl('/login')
  }  
}
affiche(titre:string){
  
}
}
