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
    })
  }
  choixProduit(productId : string){
    this.router.navigateByUrl("/deposit/"+this.depotId+"/"+productId)
  }
}
