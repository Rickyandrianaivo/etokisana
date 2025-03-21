import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/app/shared/models/Product';
import { HeaderComponent } from '../../partials/header/header.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { NgIf } from '@angular/common';
import { IUserRegister } from 'src/app/shared/Interfaces/IUserRegister';
import { Transaction } from 'src/app/shared/models/Transaction';

@Component({
  selector: 'app-retrait',
  standalone: true,
  imports: [
    HeaderComponent,
    TextInputComponent,
    DefaultButtonComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './retrait.component.html',
  styleUrl: './retrait.component.css'
})
export class RetraitComponent {
  isSubmitted:boolean=false;
  withdrawFundForm!: FormGroup;
  prestataireId!:string;
  productId !: string;
  entry!:Transaction;
  product!:Product;
  prestataire:any;
  user!:any;
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
        this.withdrawFundForm = this.formBuilder.group({
          libelle:['',Validators.required],
          montant:['',Validators.required],
        })
      }
  get fc(){
      return this.withdrawFundForm.controls;
    }
    submit(){
      this.isSubmitted =true;
      if (this.withdrawFundForm.invalid){ 
          console.log(this.withdrawFundForm.getError);
          alert("Veuillez remplir correctement les champs obligatoires!");
          return;
        }
      
      const fv = this.withdrawFundForm.value;
      console.log(fv.montant);
      this.entry = {
        userId          : this.user._id,      
        libelle         : fv.libelle,
        codeProduit     : this.product.codeProduct,
        produitId       : this.productId,
        tiersId         : this.prestataire._id,
        montant         : fv.montant,
        statut          : "encours de validation",
        siteId          : this.prestataireId,
        typeES          : "Retrait",
      };
      this.transactionservice.addTransaction(this.entry).subscribe(_=>{
      })
  
      let updatedUser : IUserRegister = {
        userName            : this.user.userName,
        userFirstname       : this.user.userFirstname,
        userPassword        : this.user.userPassword,
        userEmail           : this.user.userEmail,
        userPhone           : this.user.userPhone,
        userTotalSolde      : this.user.userTotalSolde - fv.montant,
        userType            : this.user.userType,
        userEnabled         : this.user.userEnabled,
      }
      this.userService.update(updatedUser,this.user._id).subscribe(_ => {
        alert("Retrait effectué");
        // this.router.navigateByUrl("user-products");
      })
    }
}
