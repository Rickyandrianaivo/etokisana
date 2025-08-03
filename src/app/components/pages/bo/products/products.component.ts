import { Component, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MatTableModule } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { NotificationDialogComponent } from 'src/app/components/partials/notification-dialog/notification-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgIf, UpperCasePipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    // RouterLink,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    SideBarComponent,
    // MatIconButton,
    MatTooltipModule,
    NgIf,
    UpperCasePipe,
],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  readonly dialog = inject(MatDialog);
  productsList:any[] = [];
  displayedColumns: string[] = ['Photo','CPC','Category','Nom', 'Description', 'Statut','Poids','Volume','Largeur','Longueur','Hauteur','Utilisateur','Action'];
  logedUser : any;
  constructor(
    private productService: ProductService,
    private userService : UserService,
    private router : Router,
  ){
    this.logedUser = this.userService.getUserFromLocalStorage();
    this.userService.getUserByEmail(this.logedUser.userEmail).subscribe(userCurrent =>{
      if (userCurrent.userAccess != "Admin") {
        this.router.navigateByUrl('home')
      }
    });
    this.productService.getAll().subscribe(productAll=>{
      this.productsList = productAll;
    })
  }
  checkProduct(productId:string){
    this.router.navigateByUrl("product-details/"+productId);
  }
  validateProduct(productId:string){
    this.openNotificationDialog("Produit approuvé","Le produit a été créé avec succès !",null,true);
  }
  deleteProduct(productId:string){
    this.productService.deleteProduct(productId).subscribe(result =>{
    })
    this.openNotificationDialog("Produit supprimé","La suppression du produit a été effectué",null,true);
  }
  openNotificationDialog(title:string , message:string, url : string | null,reload:boolean =false){
      const dialogRef = this.dialog.open(NotificationDialogComponent,{
        data : {
          title,
          message
        }
      })
      dialogRef.afterClosed().subscribe(result=>{
        if (result == true && !url && reload == true) {
          window.location.reload();
        }
        if(url){
          this.router.navigateByUrl(url);
        }
      })
    }
}
