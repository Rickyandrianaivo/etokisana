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
import { NotificationService } from 'src/app/services/notification.service';

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
    private notificationService : NotificationService,
  ){
    this.logedUser = this.userService.getUserFromLocalStorage();
    this.userService.getUserByEmail(this.logedUser.userEmail).subscribe(userCurrent =>{
      if (userCurrent.userAccess != "Admin") {
        this.router.navigateByUrl('home')
      }
    });
    this.productService.getAll().subscribe(productAll=>{
      this.productsList = productAll;
      console.log(this.productsList[0])
    })
  }
  checkProduct(productId:string){
    this.router.navigateByUrl("product-page/"+productId);
  }
  validateProduct(productId:string){
    const updateData = {
      productState : "Approuvé",
      productValidation : true}
    this.productService.updateProduct(productId, updateData).subscribe(result =>{
    })
    this.notificationService.openNotificationDialog("Produit approuvé","Le produit a été créé avec succès !",null,true);
  }
  deleteProduct(productId:string){
    this.productService.deleteProduct(productId).subscribe(result =>{
    })
    this.notificationService.openNotificationDialog("Produit supprimé","La suppression du produit a été effectué",null,true);
  }
}
