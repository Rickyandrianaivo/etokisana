import { Component } from '@angular/core';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../partials/header/header.component';
import { ProductService } from 'src/app/services/product.service';
// import { DepotItem } from 'src/app/shared/models/DepotItem';
import {MatCardModule} from '@angular/material/card';
import { DepotItemService } from 'src/app/services/depot-item.service';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Cart } from 'src/app/shared/models/Cart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    MatCardModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cart:Cart  = new Cart();
  depotItems:any[] = [];
  depotItemList : any [] = [];
  productList: any[]=[];
  constructor(
    private router:Router,
    private productservice:ProductService,
    private depotItemService: DepotItemService,
    private cartService : CartService,
    private notificationService : NotificationService,
  ){
    this.depotItemService.getAll().subscribe(allproduct=>{
      this.depotItemList = allproduct;
      console.log(this.productList);
      this.depotItemList.forEach(item => {
        this.productservice.getProductById(item.productId).subscribe(product => {
          let productItem ={
            itemId : item._id,
            productId : product._id,
            depotId : item.currentDepotId,
            productName : product.productName,
            productDescription : product.productDescription,
            codeCPC : product.codeCPC,
            prix : item.prix,
            productImage : product.productImage,
          }
          this.productList.push(productItem)
        })
      })
    })
  }
  registerbutton(){
      this.router.navigateByUrl('achat')
      console.log("hit the button")
  }
  voirProduit(productId : string,depotItemId : string){
    this.router.navigateByUrl('/product-details/'+ productId + "/" + depotItemId )
  }
  addToCart(depotItemId:string){
    this.cartService.addToCart(depotItemId)
    this.notificationService.openNotificationDialog(
      "Produit ajouté au panier",
      "Ce produit a été ajouté à votre panier.",
      "",
      false,
    )
  }
}
