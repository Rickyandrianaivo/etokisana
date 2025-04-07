import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { UserService } from '../../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { MatTable, MatTableModule } from '@angular/material/table';
import { HeaderComponent } from '../../partials/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { TransactionService } from 'src/app/services/transaction.service';
import { SiteService } from 'src/app/services/site.service';
import { DatePipe } from '@angular/common';

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
    RouterModule,
    DatePipe
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit{
  @ViewChild(MatTable) table !: MatTable<any>
  userCurrent :any;
  isDepot         !:boolean;
  isRetrait       !:boolean;
  isAchat         !:boolean;
  isVente         !:boolean;
  isHistorique    !:boolean;
  achatList       :any[]=[];
  venteList       :any[]=[];
  retraitList     :any[]=[];
  transactionList :any[]=[];
  transactionListIsReady : boolean = false;
  displayedColumns: string[] = ['Date','Situation', 'Description','Type', 'Montant','Dépôt'];
  // displayedColumns: string[] = ['Date','Situation', 'Type', 'Montant','Methode','Dépôt'];
constructor(
  private userService:UserService,
  private router:Router,
  private transactionService : TransactionService,
  private siteService : SiteService,
){
  this.userCurrent = this.userService.getUserFromLocalStorage()
  if (!this.userCurrent) {
    this.router.navigateByUrl('/login')
  } 
  this.transactionService.getTransactionByUserId(this.userCurrent._id).subscribe((transactionListServer:any)=>{
    // this.transactionList = transactionListServer;
    transactionListServer.forEach((element:any) => {
      this.siteService.getSiteById(element.siteId).subscribe((site:any)=>{
        let elementItem = {
          createdAt: element.createdAt,
          statut : element.statut,
          libelle : element.libelle,
          typeES : element.typeES,
          montant : element.montant,
          depot : site.siteName + " - "+site.siteAddress
        }
        this.transactionList.push(elementItem);
        this.table.renderRows();
      })
    })
  });
  // console.log(this.transactionList)
}
ngOnInit(): void {
   
}
affiche(titre:string){
  
}
}
