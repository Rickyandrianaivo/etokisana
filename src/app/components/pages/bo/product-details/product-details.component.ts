import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultButtonComponent } from 'src/app/components/partials/default-button/default-button.component';
import { HeaderComponent } from 'src/app/components/partials/header/header.component';
import { NotificationDialogComponent } from 'src/app/components/partials/notification-dialog/notification-dialog.component';
import { DepotItemService } from 'src/app/services/depot-item.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { SiteService } from 'src/app/services/site.service';



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
  depotItemId : string  = "";
  theDepotItem : any;
  depotInfos:any;
  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private router : Router,
    private depotItemService : DepotItemService,
    private notificationService : NotificationService,
    private siteService:SiteService,
  ){
    this.activatedRoute.params.subscribe(params=>{
      this.productId = params['id'];
      this.depotItemId = params['depotItemId'];
      this.productService.getProductById(params['id']).subscribe(productDist =>{
        this.theProduct=productDist;
        this.productImage=productDist.productImage;
      })
      this.depotItemService.getById(this.depotItemId).subscribe(theDepotItem=>{
        if (theDepotItem) {
          this.theDepotItem = theDepotItem;
          this.siteService.getSiteById(this.theDepotItem.currentDepotId).subscribe(siteInfos=>{
            this.depotInfos = siteInfos;
          })
        }
      })
      
    })
  }

  ngOnInit(): void {
    
  }
  validateProduct(productId : string){
    this.productService.updateProduct(productId,{productValidation:true,productState:"Approuvé"}).subscribe(_=>{

    })
    this.notificationService.openNotificationDialog(
      "Produit approuvé !",
      "Le produit a été approuvé et sera disponible pour échange sur la plateforme",
      'products',
      false)
  }
  addToCart(depotItemId: string){
    
  }
}
