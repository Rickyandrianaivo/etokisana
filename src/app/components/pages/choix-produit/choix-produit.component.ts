import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../partials/header/header.component';
import { NgFor } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-choix-produit',
  standalone: true,
  imports: [HeaderComponent,NgFor],
  templateUrl: './choix-produit.component.html',
  styleUrl: './choix-produit.component.css'
})
export class ChoixProduitComponent {
  productList:any;
  depotId !: string;
  typeES !: string;
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
    this.router.navigateByUrl("/"+this.typeES+"/"+this.depotId+"/"+productId)
  }
  NouveauProduit(){
    this.router.navigateByUrl("/user-products/add")
  }
}
