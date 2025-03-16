import { Component, OnInit } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { UserService } from '../../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { HeaderComponent } from '../../partials/header/header.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatTableModule,
    HeaderComponent,
    MatIconModule,
    RouterModule
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
  displayedColumns: string[] = ['Date','Situation', 'Type', 'Montant','Methode','Dépôt'];
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
