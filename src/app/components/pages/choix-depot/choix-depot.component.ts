import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HeaderComponent } from '../../partials/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AvatarModule } from 'ngx-avatars';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SiteService } from 'src/app/services/site.service';

export interface RevendeurElement{
  userId : string,
  name : string,
  image : string,
  reviews :number,
  depots : any[]
  transactions : number,
}

@Component({
  selector: 'app-choix-depot',
  standalone: true,
  imports: [
    // NgFor,
    HeaderComponent,
    AvatarModule,
    UpperCasePipe,
    MatTableModule,
    NgIf
  ],
  templateUrl: './choix-depot.component.html',
  styleUrl: './choix-depot.component.css'
})
export class ChoixDepotComponent  implements OnInit{

  // Paramètres du tableau de chaque revendeur  
  displayedColumns: string[] = ['infos', 'depots', 'actions'];
  dataSource= new MatTableDataSource<RevendeurElement>([])
  dataToTable : any[] = [];

  currentUser: any;
  usersList : any;
  typeES !: string;
  constructor(
    private userService : UserService,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private siteService : SiteService,
  ){
    this.currentUser = this.userService.getUserFromLocalStorage();
    
    this.activatedRoute.params.subscribe(params=>{
      this.typeES = params['typeES'];
      console.log(this.typeES)
    })

    
    
  }
  ngOnInit(): void {
    this.refresh();
  }
  choixPrestataire(prestataireId : string){
      this.router.navigateByUrl("/depot-sites/"+this.typeES+"/"+prestataireId)      
  }
  refresh() {
    this.userService.getAll().subscribe(userServer =>{
      this.usersList = userServer;
      this.usersList.forEach((revendeur:any)=> {
        this.siteService.getSiteByUserId(revendeur.userId).subscribe(siteUser =>{
          let revendeurSites:any[] = []
          siteUser.forEach(siteElement =>{
            const newRevendeur:RevendeurElement = {
              userId : revendeur.userId,
              name: revendeur.userName,
              image : revendeur.userImage,
              reviews :0,
              depots : siteUser,
              transactions : 0,
            }
            this.dataToTable.push(newRevendeur);
            this.dataSource.data = this.dataToTable;
          })         
        })
      })
    });
  }
}
