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
    // DefaultButtonComponent,
    // RouterLink,
    HeaderComponent,
    MatCardModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cart:Cart  = new Cart();
  depotItems:any[] = [];
  productList: any[]=[];
  constructor(
    private router:Router,
    private productservice:ProductService,
    private depotItemService: DepotItemService,
    private cartService : CartService,
    private notificationService : NotificationService,
  ){
    // this.cart = this.cartService.getCartObservable();
    this.depotItemService.getAll().subscribe(allproduct=>{
      // this.productList =allproduct.filter(filteredProduct=> filteredProduct.productValidation == true && filteredProduct.isStocker == true )
      this.productList=allproduct;
      // console.log(this.productList);
      this.productList.forEach(item => {
        this.productservice.getProductById(item.productId).subscribe(product => {
          item.productName = product.productName;
          item.productDescription = product.productDescription;
          item.codeCPC = product.codeCPC;
          item.productImage = product.productImage;
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
    console.log(depotItemId)
    this.cartService.addToCart(depotItemId)
    this.notificationService.openNotificationDialog(
      "Produit ajouté au panier",
      "Ce produit a été ajouté à votre panier.",
      "",
      false,
    )
  }
}
