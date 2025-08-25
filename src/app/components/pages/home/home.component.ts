import { Component } from '@angular/core';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../partials/header/header.component';
import { ProductService } from 'src/app/services/product.service';
// import { DepotItem } from 'src/app/shared/models/DepotItem';
import {MatCardModule} from '@angular/material/card';
import { DepotItemService } from 'src/app/services/depot-item.service';

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
  depotItems:any[] = [];
  productList: any[]=[];
  constructor(
    private router:Router,
    private productservice:ProductService,
    private depotItemService: DepotItemService,
  ){
    this.depotItemService.getAll().subscribe(allproduct=>{
      // this.productList =allproduct.filter(filteredProduct=> filteredProduct.productValidation == true && filteredProduct.isStocker == true )
      this.productList=allproduct;
      // console.log(this.productList);
      this.productList.forEach(item => {
        this.productservice.getProductById(item.productId).subscribe(product => {
          console.log(item.productId);
          console.log(product);
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
}
