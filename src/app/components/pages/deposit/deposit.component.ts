import { Component } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { HeaderComponent } from '../../partials/header/header.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Journal } from 'src/app/shared/models/Journal';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Product } from 'src/app/shared/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [
    HeaderComponent,
    TextInputComponent,
    DefaultButtonComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent {
  isSubmitted:boolean=false;
  addFundForm!: FormGroup;
  user!:any;
  entry!:Transaction;
  prestataireId!:string;
  productId !: string;
  product!:Product;
  prestataire:any;
  constructor(
    private userService:UserService,
    private transactionservice:TransactionService,
    private formBuilder : FormBuilder,
    private activatedRoute : ActivatedRoute, 
    private productService : ProductService,
  ){
    this.activatedRoute.params.subscribe(params=>{
      this.prestataireId = params["depotId"];
      this.productId = params["productId"];
    })    
    this.user = this.userService.getUserFromLocalStorage()
    this.userService.getUserById(this.prestataireId).subscribe((prestataire)=>{
      this.prestataire = prestataire;
    })
    this.productService.getProductById(this.productId).subscribe(productById=>{
      this.product = productById;
    })
  }

  ngOnInit() : void {
      this.addFundForm = this.formBuilder.group({
        libelle:['',Validators.required],
        valeur:['',Validators.required],
      })
    }
    
  get fc(){
    return this.addFundForm.controls;
  }
  submit(){
    this.isSubmitted =true;
    if (this.addFundForm.invalid){ 
        console.log(this.addFundForm.getError);
        alert("Veuillez remplir correctement les champs obligatoires!");
        return;
      }
    
    const fv = this.addFundForm.value;
    console.log(fv.Montant);
    this.entry = {
      userId          : this.user._id,      
      libelle         : fv.libelle,
      codeProduit     : this.product.codeProduct,
      produitId       : this.productId,
      tiersId         : this.prestataire._id,
      montant         : fv.montant,
      statut          : "encours de validation",
      siteId          : this.prestataireId,
      typeES          : "Dépôt",
    };
    this.transactionservice.addTransaction(this.entry).subscribe(_=>{

    })
    this.userService.update(this.user,this.user._id).subscribe(_ => {
      alert("Dépôt de fonds effectué");
      // this.router.navigateByUrl("user-products");
    })
  }
}
