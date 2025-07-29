import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../partials/header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-choix-produit',
  standalone: true,
  imports: [HeaderComponent,NgFor,NgIf],
  templateUrl: './choix-produit.component.html',
  styleUrl: './choix-produit.component.css'
})
export class ChoixProduitComponent {
  productList:any;
  depotId !: string;
  typeES !: string;
  isEmpty :boolean = true;
  produitsAdeposer : any[] = [];
  constructor(
    private router:Router,
    private productService : ProductService,
    private activatedRoute : ActivatedRoute,
  ){
    this.productService.getAll().subscribe(productAll =>{
      this. productList = productAll;
    });
    this.activatedRoute.params.subscribe(params =>{
      this.depotId=params['id'];
      this.typeES= params['typeES'];
      console.log(this.typeES)
    })
  }
  choixProduit(productId : string){
    this.isEmpty=false;
    this.productService.getProductById(productId).subscribe(product=>{
      this.produitsAdeposer.push(product)
      this.productService.addDepositItem(product)
    })
    // this.router.navigateByUrl("/"+this.typeES+"/"+this.depotId+"/"+productId)
  }
  RemoveProduct(productId : string){
    const removedProductIndex = this.produitsAdeposer.findIndex(product => product._id === productId);
    this.produitsAdeposer.splice(removedProductIndex,1);
  }
  NouveauProduit(){
    this.router.navigateByUrl("/user-products/add")
  }
  FaireDepot(){
    this.produitsAdeposer.forEach(productAdeposer =>{
      const stockelement = {
        productId : productAdeposer._id,
        depotId : this.depotId,
        prix : productAdeposer.prix,
        quantite : productAdeposer.quantite
      }
      this.productService.depositProduct(stockelement).subscribe(_=>{
        console.log(stockelement)
      })
    })
  }
}
