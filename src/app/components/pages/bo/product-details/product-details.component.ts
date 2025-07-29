import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultButtonComponent } from 'src/app/components/partials/default-button/default-button.component';
import { HeaderComponent } from 'src/app/components/partials/header/header.component';
import { NotificationDialogComponent } from 'src/app/components/partials/notification-dialog/notification-dialog.component';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    HeaderComponent,
    MatTabsModule,
    NgIf,
    DefaultButtonComponent,
    MatDialogModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  dialog = inject(MatDialog)
  theProduct:any;
  productId!:string;
  productImage:any[]=[];

  
  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private router : Router,
  ){
    this.activatedRoute.params.subscribe(params=>{
      this.productId = params['id'];
      this.productService.getProductById(params['id']).subscribe(productDist =>{
        this.theProduct=productDist;
        this.productImage=productDist.productImage;
      })
    })
  }

  ngOnInit(): void {
    
  }
  validateProduct(productId : string){
    this.productService.updateProduct(productId,{productValidation:true,productState:"Approuvé"}).subscribe(_=>{

    })
    this.openNotificationDialog("Produit approuvé !", "Le produit a été approuvé et sera disponible pour échange sur la plateforme",'products',false)
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
