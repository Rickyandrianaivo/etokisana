import { Component } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { HeaderComponent } from '../../partials/header/header.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [
    HeaderComponent,
    TextInputComponent,
    DefaultButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent {
  isSubmitted:boolean=false;
  addFundForm!: FormGroup;
  user!:any;
  entry!:any;
  constructor(
    private userService:UserService,
    private transactionservice:TransactionService,
    private formBuilder : FormBuilder, 
  ){
    this.user = this.userService.getUserFromLocalStorage()
    this.userService
  }

  ngOnInit() : void {
      this.addFundForm = this.formBuilder.group({
        libelle:['',Validators.required],
        codeProduit:['',Validators.required],
        destinataire:['',Validators.required],
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
      userId :          this.user._id,
    // tiersId !: string;
    // codeProduit !: string;
    // typeES!:string;
    // idProduit !: string;
    // unite !: string;
    // libelle !: string;
    // montant !: number;
    // Statut!:string;
    // depotId: string="";
      
      libelle            : this.user.userName,
      codeProduit       : this.user.userFirstname,
      productId        : this.user.userPassword,
      desitantaire           : this.user.userEmail,
      valeur           : this.user.userPhone,
      userTotalSolde      : this.user.userTotalSolde + parseInt(fv.Montant),
    };
    this.userService.update(this.user,this.user._id).subscribe(_ => {
      alert("Dépôt de fonds effectué");
      // this.router.navigateByUrl("user-products");
    })
  }
}
