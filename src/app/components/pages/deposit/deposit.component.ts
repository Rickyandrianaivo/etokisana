import { Component } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { HeaderComponent } from '../../partials/header/header.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Journal } from 'src/app/shared/models/Journal';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Product } from 'src/app/shared/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { NgIf } from '@angular/common';
import { IUserRegister } from 'src/app/shared/Interfaces/IUserRegister';
import { SiteService } from 'src/app/services/site.service';

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
  siteId!:string;
  prestataireId!:string;
  theSite : any;
  productId !: string;
  product!:Product;
  prestataire:any;
  fullUser:any;
  constructor(
    private userService:UserService,
    private transactionservice:TransactionService,
    private formBuilder : FormBuilder,
    private activatedRoute : ActivatedRoute, 
    private productService : ProductService,
    private siteService : SiteService,
    private router : Router
  ){
    this.activatedRoute.params.subscribe(params=>{
      this.siteId = params["depotId"];
      this.productId = params["productId"];
    })    
    this.user = this.userService.getUserFromLocalStorage()
    this.userService.getUserById(this.user._id).subscribe(fullUser =>{
      this.fullUser = fullUser;
    })
    // this.userService.getUserById(this.siteId).subscribe((prestataire)=>{
    //   this.prestataire = prestataire;
    // })
    this.siteService.getSiteById(this.siteId).subscribe(site=>{
      this.theSite = site;
      this.prestataireId= site.siteUserId;
    })
    this.productService.getProductById(this.productId).subscribe(productById=>{
      this.product = productById;
    })
  }

  ngOnInit() : void {
      this.addFundForm = this.formBuilder.group({
        description:['',Validators.required],
        montant:['',Validators.required],
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
    this.entry = {
      userId          : this.user._id,      
      libelle         : fv.libelle,
      codeProduit     : this.product.codeProduct,
      produitId       : this.productId,
      tiersId         : this.prestataireId,
      montant         : fv.montant,
      statut          : "encours de validation",
      siteId          : this.siteId,
      typeES          : "Dépôt",
    };
    this.transactionservice.addTransaction(this.entry).subscribe(_=>{

    })
    let updatedUser : IUserRegister = {
      userName            : this.user.userName,
      userFirstname       : this.user.userFirstname,
      userPassword        : this.user.userPassword,
      userEmail           : this.user.userEmail,
      userPhone           : this.user.userPhone,
      userTotalSolde      : parseInt(this.fullUser.userTotalSolde) + parseInt(fv.montant),
      userType            : this.user.userType,
      userEnabled         : this.user.userEnabled,
    }
    // console.log(parseInt(this.fullUser.userTotalSolde) + parseInt(fv.montant));
    this.userService.update(updatedUser,this.user._id).subscribe(_ => {
      alert("Dépôt de fonds effectué");
      this.router.navigateByUrl("/transactions");
    })
  }
}
