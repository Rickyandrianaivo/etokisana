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
        Montant:['',Validators.required],
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
    this.user = {
      userName            : this.user.userName,
      userFirstname       : this.user.userFirstname,
      userPassword        : this.user.userPassword,
      userEmail           : this.user.userEmail,
      userPhone           : this.user.userPhone,
      userTotalSolde      : this.user.userTotalSolde + parseInt(fv.Montant),
    };
    this.userService.update(this.user,this.user._id).subscribe(_ => {
      alert("Dépôt de fonds effectué");
      // this.router.navigateByUrl("user-products");
    })
  }
}
